import { Popover, Button } from 'antd'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class TreeModel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      treeData: {},
      loading: true
    }
    this.deletePlot = this.deletePlot.bind(this)
  }

  componentWillMount () {
    firebase.database().ref(`/tree/data/${this.props.tree}`).on('value', (snap) => {
      this.setState({treeData: snap.val(), loading: false})
    })
  }

  deletePlot () {
    firebase.database().ref(`/tree/location/${this.props.id}`).remove()
  }

  render () {
    const { loading, treeData } = this.state
    const { posX, posY, tree } = this.props
    if (loading) {
      return null
    }
    return (
      <Popover
        visible={this.state.open}
        title={treeData.name}
        onVisibleChange={(open) => this.setState({open})}
        placement='right'
        content={
          <div style={{ width: 300, maxHeight: 500, overflow: 'auto', padding: 3, margin: 0 }} >
            <p><img alt='' width='100%' src={treeData.image} /></p><br />
            <p><b>ชื่อวิทยาศาสตร์</b> : <i>{treeData.scienceName}</i></p><br />
            <p><b>ลักษณะ</b> : {treeData.detail}</p><br />
            <p><b>ประวัติ</b> : {treeData.history}</p><br />
            <p><b>สรรพคุณ</b> : {treeData.property}</p><br />
            <p><Button type='danger' onClick={this.deletePlot} >ลบ</Button></p>
          </div>
        }
      >
        <div onClick={() => this.props.history.push(`/tree/${tree}`)} style={{position: 'absolute', left: posX, top: posY + 48, padding: 4, backgroundColor: treeData.legendColor, cursor: 'pointer'}} />
      </Popover>
    )
  }
}

TreeModel.propTypes = {
  tree: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  posX: PropTypes.number,
  posY: PropTypes.number,
  history: PropTypes.object
}
