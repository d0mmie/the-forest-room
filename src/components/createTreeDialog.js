import { Modal, Input } from 'antd'
import firebase from 'firebase'
import React from 'react'
import PropTypes from 'prop-types'

const { TextArea } = Input

export default class CreateTreeDialog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      scienceName: '',
      detail: '',
      history: '',
      property: '',
      image: '',
      legendColor: ''
    }
    this.createTreeModel = this.createTreeModel.bind(this)
  }

  createTreeModel () {
    firebase.database().ref('/tree/data').push(this.state).then(() => {
      this.props.closeDialog()
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      name: '',
      scienceName: '',
      detail: '',
      history: '',
      property: '',
      image: '',
      legendColor: ''
    })
  }

  render () {
    const { name, scienceName, detail, history, image, property, legendColor } = this.state
    return (
      <Modal title='สร้างต้นไม้' visible={this.props.visible} onCancel={this.props.closeDialog} onOk={this.createTreeModel} >
        <p><Input placeholder='ชื่อ' value={name} onChange={(e) => this.setState({name: e.target.value})} /></p>
        <p><Input placeholder='ชื่อวิทยาศาสตร์' value={scienceName} onChange={(e) => this.setState({scienceName: e.target.value})} /></p>
        <p><TextArea placeholder='ลักษณะ' autosize={{minRows: 3}} value={detail} onChange={(e) => this.setState({detail: e.target.value})} /></p>
        <p><TextArea placeholder='ประวัติ' autosize={{minRows: 3}} value={history} onChange={(e) => this.setState({history: e.target.value})} /></p>
        <p><TextArea placeholder='สรรพคุณ' autosize={{minRows: 3}} value={property} onChange={(e) => this.setState({property: e.target.value})} /></p>
        <p><Input placeholder='รูปภาพ' value={image} onChange={(e) => this.setState({image: e.target.value})} /></p>
        <p><Input placeholder='รหัสสี' value={legendColor} onChange={(e) => this.setState({legendColor: e.target.value})} /></p>
      </Modal>
    )
  }
}

CreateTreeDialog.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
}
