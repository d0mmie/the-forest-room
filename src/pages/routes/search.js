import React from 'react'
import { Input, List, Card } from 'antd'
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
      searched: [],
      currentPage: 1
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
    if (keyword !== '') {
      const searched = _.filter(this.state.allTree, (o) => { return this.props.store.tree.data[o.tree].name.toUpperCase().indexOf(keyword.toUpperCase()) !== -1 || this.props.store.tree.data[o.tree].scienceName.toUpperCase().indexOf(keyword.toUpperCase()) !== -1 })
      this.setState({searched})
    }
  }
  render () {
    const { store } = this.props
    return (
      <Card
        style={{margin: 10}}
        title={<h3 style={{marginBottom: 0}} >ค้นหา</h3>}
        extra={
          <Search
            placeholder='ค้นหาต้นไม้'
            onSearch={this.search}
            style={{ width: 500 }}
          />
        }>
        <List
          itemLayout='vertical'
          size='large'
          dataSource={this.state.searched}
          renderItem={item => (
            <List.Item
              key={item.id}
              extra={<img src={store.tree.data[item.tree].image} alt={item.name} width={272} />}
            >
              <List.Item.Meta
                title={<Link to={`/map/${item.primary}/${item.secondary}`}>{store.tree.data[item.tree].name}</Link>}
                description={store.tree.data[item.tree].scienceName}
              />
              <p>แผนที่ระดับกลางที่ {item.primary}</p>
              <p>แผนที่ระดับเล็กที่ {item.secondary}</p>
            </List.Item>
          )}
        />
        {/* <Table pagination={false} columns={TableColumn} dataSource={this.state.searched} /> */}
      </Card>
    )
  }
}

SearchBox.propTypes = {
  store: PropTypes.object.isRequired,
  loadTree: PropTypes.func.isRequired
}

export default connect(SearchBox)
