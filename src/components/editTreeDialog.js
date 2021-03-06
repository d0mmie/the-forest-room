import { Modal, Input } from 'antd'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import React from 'react'
import connect from '../store/action'

const { TextArea } = Input

class EditTreeDialog extends React.Component {
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
    this.updateTreeModel = this.updateTreeModel.bind(this)
  }

  updateTreeModel () { // อัพเดทข้อมูล
    firebase.database().ref(`/tree/data/${this.props.store.tree.dialog.selected}`).set(this.state).then(() => {
      this.props.closeTreeDialog() // ถ้าอัพเดทเสร็จก็ปิด Dialog
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.store.tree.dialog.selected !== '') { // ถ้าข้อมูลที่สนใจไม่ว่างเปล่า จึงโหลดข้อมูล
      firebase.database().ref(`/tree/data/${nextProps.store.tree.dialog.selected}`).once('value').then((snap) => {
        this.setState(snap.val())
      })
    }
  }

  render () {
    const { name, scienceName, detail, history, image, property, legendColor } = this.state
    const { store, closeTreeDialog } = this.props
    return (
      <Modal title='สร้างต้นไม้' visible={store.tree.dialog.edit} onCancel={closeTreeDialog} onOk={this.updateTreeModel} >
        <p>ชื่อต้นไม้</p>
        <p><Input placeholder='ชื่อ' value={name} onChange={(e) => this.setState({name: e.target.value})} /></p>
        <p>ชื่อวิทยาศาสตร์</p>
        <p><Input placeholder='ชื่อวิทยาศาสตร์' value={scienceName} onChange={(e) => this.setState({scienceName: e.target.value})} /></p>
        <p>ลักษณะ</p>
        <p><TextArea placeholder='ลักษณะ' autosize={{minRows: 3}} value={detail} onChange={(e) => this.setState({detail: e.target.value})} /></p>
        <p>ประวัติ</p>
        <p><TextArea placeholder='ประวัติ' autosize={{minRows: 3}} value={history} onChange={(e) => this.setState({history: e.target.value})} /></p>
        <p>สรรพคุณ</p>
        <p><TextArea placeholder='สรรพคุณ' autosize={{minRows: 3}} value={property} onChange={(e) => this.setState({property: e.target.value})} /></p>
        <p>ลิ้งรูปภาพ</p>
        <p><Input placeholder='รูปภาพ' value={image} onChange={(e) => this.setState({image: e.target.value})} /></p>
        <p>รหัสสี</p>
        <p><Input placeholder='รหัสสี' value={legendColor} onChange={(e) => this.setState({legendColor: e.target.value})} /></p>
        <div style={{ backgroundColor: legendColor, padding: 5 }} />
      </Modal>
    )
  }
}

EditTreeDialog.propTypes = {
  closeTreeDialog: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired
}

export default connect(EditTreeDialog)
