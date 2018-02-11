import { Link } from 'react-router-dom'
import { Card, Button, List } from 'antd'
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
    return (
      <Card
        title={<h3 style={{marginBottom: 0}} >ต้นไม้</h3>}
        style={{margin: 10}}
        extra={this.props.store.user.data.isAdmin &&
          <span>
            <Button size='small' style={{margin: 3}} type='primary' onClick={() => this.toggleDialog({type: 'CREATE'})} >สร้างต้นไม้</Button>
            <Button size='small' style={{margin: 3}} type='danger' onClick={this.deleteTree} >ลบ</Button>
          </span>
        }
      >
        <div style={{display: 'flex', flexDirection: 'row', margin: 15}} >
          <span style={{flex: 'auto'}} />
        </div>
        <List
          itemLayout='vertical'
          size='large'
          dataSource={this.state.allTree}
          renderItem={item => (
            <List.Item
              key={item.key}
              extra={<img src={item.image} alt={item.name} width={272} />}
            >
              <List.Item.Meta
                title={<Link to={`/tree/${item.key}`}>{item.name}</Link>}
                description={item.scienceName}
              />
              {item.detail}
            </List.Item>
          )}
        />
        <CreateTreeDialog visible={this.state.createTreeDialog} closeDialog={this.closeDialog} />
        <UpdateTreeDialog visible={this.state.editTreeDialog} id={this.state.selectedKey} closeDialog={this.closeDialog} />
      </Card>
    )
  }
}

Tree.propTypes = {
  loadTree: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired
}

export default connect(Tree)
