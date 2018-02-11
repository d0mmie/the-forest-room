import { Link } from 'react-router-dom'
import { Table, Button } from 'antd'
import firebase from 'firebase'
import React from 'react'
import PropTypes from 'prop-types'

import connect from '../../store/action'
import CreateTreeDialog from '../../components/createTreeDialog'
import UpdateTreeDialog from '../../components/editTreeDialog'

class Tree extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      allTree: [],
      selectedRowKeys: [],
      createTreeDialog: false,
      editTreeDialog: false,
      selectedKey: ''
    }
    this.deleteTree = this.deleteTree.bind(this)
    this.toggleDialog = this.toggleDialog.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
  }

  componentWillMount () {
    this.props.loadTree()
  }
  componentWillReceiveProps (nextProps) {
    const tree = Object.keys(nextProps.store.tree.data).map((key) => ({...nextProps.store.tree.data[key], key}))
    this.setState({allTree: tree})
  }

  toggleDialog ({type, key}) {
    if (type === 'CREATE') {
      this.setState({createTreeDialog: !this.state.createTreeDialog})
    } else if (type === 'EDIT') {
      if (this.props.store.user.data.isAdmin) {
        this.setState({editTreeDialog: !this.state.editTreeDialog, selectedKey: key})
      }
    }
  }

  closeDialog () {
    this.setState({createTreeDialog: false, editTreeDialog: false})
  }

  deleteTree () {
    this.state.selectedRowKeys.map((val) => {
      return firebase.database().ref(`/tree/data/${val}`).remove()
    })
  }

  render () {
    const TableColumn = [
      {
        title: 'รูป',
        dataIndex: 'image',
        render: (text, record) => <img src={text} alt={record.name} height={100} />
      },
      {
        title: 'ชื่อ',
        dataIndex: 'name',
        render: (text, record) => <Link to={`/tree/${record.key}`} >{text}</Link>
      },
      {
        title: 'ชื่อวิทยาศาสตร์',
        dataIndex: 'scienceName',
        render: (text) => <i>{text}</i>
      },
      {
        title: 'ลักษณะ',
        dataIndex: 'detail',
        render: (text) => text.substr(0, 30) + '..'
      },
      {
        title: 'ประวัติ',
        dataIndex: 'history',
        render: (text) => text.substr(0, 30) + '..'
      },
      {
        title: 'สรรพคุณ',
        dataIndex: 'property',
        render: (text) => text.substr(0, 30) + '..'
      },
      {
        title: 'รหัสสี',
        dataIndex: 'legendColor'
      },
      {
        title: 'แก้ไข',
        render: (text, record) => <Button disabled={!this.props.store.user.data.isAdmin} onClick={() => this.toggleDialog({type: 'EDIT', key: record.key})} >แก้ไข</Button>
      }
    ]

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRow) => {
        this.setState({ selectedRowKeys })
      }
    }
    return (
      <div>
        <div style={{display: 'flex', flexDirection: 'row', margin: 15}} >
          <span style={{fontSize: '1.75em'}} >ต้นไม้</span>
          <span style={{flex: 'auto'}} />
          { this.props.store.user.data.isAdmin &&
          <span>
            <Button style={{margin: 3}} type='primary' onClick={() => this.toggleDialog({type: 'CREATE'})} >สร้างต้นไม้</Button>
            <Button style={{margin: 3}} type='danger' onClick={this.deleteTree} >ลบ</Button>
          </span>
          }
        </div>
        <Table pagination={false} rowSelection={rowSelection} dataSource={this.state.allTree} columns={TableColumn} />
        <CreateTreeDialog visible={this.state.createTreeDialog} closeDialog={this.closeDialog} />
        <UpdateTreeDialog visible={this.state.editTreeDialog} id={this.state.selectedKey} closeDialog={this.closeDialog} />
      </div>
    )
  }
}

Tree.propTypes = {
  loadTree: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired
}

export default connect(Tree)
