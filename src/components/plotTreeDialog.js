import { Modal, Select } from 'antd'
import firebase from 'firebase'
import React from 'react'
import PropTypes from 'prop-types'

const { Option } = Select

export default class PlotTreeDialog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tree: [],
      selectedKey: ''
    }
    this.plot = this.plot.bind(this)
  }

  componentWillMount () {
    firebase.database().ref('/tree/data').on('value', (snap) => {
      if (snap.val()) {
        this.setState({tree: snap.val()})
      } else {
        this.setState({tree: []})
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({selectedKey: ''})
  }

  plot () {
    firebase.database().ref('/tree/location').push({
      tree: this.state.selectedKey,
      primary: this.props.primary,
      secondary: this.props.secondary,
      posX: this.props.posX,
      posY: this.props.posY
    }).then(() => {
      this.props.closeDialog()
    })
  }

  render () {
    const { posX, posY, visible, closeDialog } = this.props
    return (
      <Modal
        onCancel={closeDialog}
        onOk={this.plot}
        visible={visible}
      >
        <p>ตำแหน่งแกน X : {posX}</p>
        <p>ตำแหน่งแกน Y : {posY}</p>
        <div>ต้นไม่ &nbsp;<Select onSelect={(e) => this.setState({ selectedKey: e })} value={this.state.selectedKey} defaultValue={Object.keys(this.state.tree)[0]} >{Object.keys(this.state.tree).map((key) => <Option key={key} value={key}>{this.state.tree[key].name}</Option>)}</Select> </div>
      </Modal>
    )
  }
}

PlotTreeDialog.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  posX: PropTypes.any,
  posY: PropTypes.any,
  closeDialog: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
}
