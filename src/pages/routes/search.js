import React from 'react'
import { Input, Table } from 'antd'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import connect from '../../store/action'
import PropTypes from 'prop-types'

const { Search } = Input

class SearchBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      allTree: [],
      searched: []
    }
    this.search = this.search.bind(this)
  }

  componentWillMount () {
    this.props.loadTree()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.store.tree.loading === false) {
      const allTree = Object.keys(nextProps.store.tree.location).map((key) => ({ ...nextProps.store.tree.location[key], id: key }))
      this.setState({allTree})
    }
  }

  search (keyword) {
    const searched = _.filter(this.state.allTree, (o) => { return _.startsWith(this.props.store.tree.data[o.tree].name, keyword) })
    this.setState({searched})
  }
  render () {
    const { store } = this.props
    const TableColumn = [
      {
        title: 'รูป',
        key: 'img',
        render: (text, record) => <img src={store.tree.data[record.tree].image} alt='' height={100} />
      },
      {
        title: 'ชื่อ',
        key: 'name',
        render: (text, record) => <span>{store.tree.data[record.tree].name}</span>
      },
      {
        title: 'แผนที่ระดับกลาง',
        key: 'primary',
        dataIndex: 'primary'
      },
      {
        title: 'แผนที่ระดับเล็ก',
        key: 'secondary',
        dataIndex: 'secondary'
      },
      {
        title: 'ไป',
        key: 'go',
        render: (text, record) => <Link to={`/map/${record.primary}/${record.secondary}`} >ไป</Link>
      }
    ]

    return (
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}} >
        <div style={{display: 'flex', justifyContent: 'center'}} >
          <Search
            placeholder='ค้นหาต้นไม้'
            onSearch={this.search}
            style={{ width: 500 }}
          />
        </div>
        <Table pagination={false} columns={TableColumn} dataSource={this.state.searched} />
      </div>
    )
  }
}

SearchBox.propTypes = {
  store: PropTypes.object.isRequired,
  loadTree: PropTypes.func.isRequired
}

export default connect(SearchBox)
