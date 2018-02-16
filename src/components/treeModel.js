import { Popover, Button } from 'antd'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import connect from '../store/action'

class TreeModel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
    this.deletePlot = this.deletePlot.bind(this)
  }

  deletePlot () {
    firebase.database().ref(`/tree/location/${this.props.id}`).remove() // ลบจุดทิ้ง
  }

  render () {
    const { id, tree, store } = this.props
    if (store.tree.loading) {
      return null
    }
    return (
      <Popover
        visible={store.tree.location[id] ? this.state.open : false}
        title={store.tree.data[tree].name}
        onVisibleChange={(open) => this.setState({open})}
        placement='right'
        content={
          <div style={{ width: 300, maxHeight: 500, overflow: 'auto', padding: 3, margin: 0 }} >
            <p><img alt='' width='100%' src={store.tree.data[tree].image} /></p><br />
            <p><b>ชื่อวิทยาศาสตร์</b> : <i>{store.tree.data[tree].scienceName}</i></p><br />
            <p><b>ลักษณะ</b> : {store.tree.data[tree].detail}</p><br />
            <p><b>ประวัติ</b> : {store.tree.data[tree].history}</p><br />
            <p><b>สรรพคุณ</b> : {store.tree.data[tree].property}</p><br />
            <p><Button type='danger' onClick={this.deletePlot} >ลบ</Button></p>
          </div>
        }
      >
        { store.tree.location[id] &&
          <div
            onClick={() => this.props.push(`/tree/${tree}`)}
            style={{
              position: 'absolute',
              left: store.tree.location[id].posX + 2,
              top: store.tree.location[id].posY + 50,
              padding: 4,
              backgroundColor: store.tree.data[tree].legendColor,
              cursor: 'pointer'
            }}
          />
        }
      </Popover>
    )
  }
}

TreeModel.propTypes = {
  id: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
  tree: PropTypes.string.isRequired
}

export default connect(TreeModel)
