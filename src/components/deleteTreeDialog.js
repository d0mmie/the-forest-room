import { Modal } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import connect from '../store/action'

class DeleteTreeDialog extends React.Component {

  render () {
    const { store, deleteTree } = this.props
    return (
      <Modal title='ลบต้นไม้' visible={store.tree.dialog.delete} onCancel={this.props.closeTreeDialog} onOk={() => deleteTree(store.tree.dialog.selected)} >
        คุณต้องการลบต้น {store.tree.dialog.selected !== '' && store.tree.data[store.tree.dialog.selected].name}
      </Modal>
    )
  }
}

DeleteTreeDialog.propTypes = {
  store: PropTypes.object.isRequired,
  closeTreeDialog: PropTypes.func.isRequired,
  deleteTree: PropTypes.func.isRequired
}

export default connect(DeleteTreeDialog)
