import { Modal, Select, message } from 'antd'
import firebase from 'firebase'
import React from 'react'
import PropTypes from 'prop-types'
import connect from '../store/action'

const { Option } = Select

class PlotTreeDialog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedKey: '',
      selected: false
    }
    this.plot = this.plot.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({selectedKey: ''})
  }

  plot () {
    if (this.state.selected) {
      firebase.database().ref('/tree/location').push({
        tree: this.state.selectedKey,
        primary: this.props.store.maps.current.primary,
        secondary: this.props.store.maps.current.secondary,
        posX: this.props.store.maps.dialog.posX,
        posY: this.props.store.maps.dialog.posY
      }).then(() => {
        this.props.closePlotDialog()
      })
    } else {
      message.error('กรุณาเลือกต้นไม้')
    }
  }

  render () {
    const { store } = this.props
    return (
      <Modal
        onCancel={this.props.closePlotDialog}
        onOk={this.plot}
        visible={store.maps.dialog.plot}
      >
        <p>ตำแหน่งแกน X : {store.maps.dialog.posX}</p>
        <p>ตำแหน่งแกน Y : {store.maps.dialog.posY}</p>
        <div>ต้นไม้ &nbsp;
          <Select
            onSelect={(e) => this.setState({ selectedKey: e, selected: true })}
            defaultValue='เลือก...'
          >
            { Object.keys(store.tree.data).map((key) => <Option key={key} value={key}>{store.tree.data[key].name}</Option>) }
          </Select>
        </div>
      </Modal>
    )
  }
}

PlotTreeDialog.propTypes = {
  closePlotDialog: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired
}

export default connect(PlotTreeDialog)
