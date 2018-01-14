import firebase from 'firebase'
import PropTypes from 'prop-types'
import qr from 'qrcode'
import React from 'react'

export default class TreeDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tree: {
        name: 'Loading...',
        scienceName: 'Loading...',
        detail: 'Loading...',
        history: 'Loading...',
        property: 'Loading...'
      },
      qrcode: ''
    }
  }
  componentWillMount () {
    firebase.database().ref(`/tree/data/${this.props.match.params.treeId}`).on('value', (snap) => {
      if (snap.val()) {
        console.log(snap.val())
        this.setState({tree: snap.val()})
      }
    })
    qr.toDataURL(`https://theforestroom.xyz${this.props.match.url}`).then((url) => {
      this.setState({qrcode: url})
    })
  }

  render () {
    const { tree } = this.state
    return (
      <div style={{margin: 20}} >
        <h1>{tree.name}</h1>
        <p>&nbsp;</p>
        <div style={{display: 'flex', justifyContent: 'center'}} ><img src={tree.image} style={{height: '400'}} alt={tree.name} /></div>
        <p>&nbsp;</p>
        <p><b>ชื่อวิทยาศาสตร์:</b> <i>{tree.scienceName}</i></p>
        <p><b>ลักษณะ:</b> {tree.detail}</p>
        <p><b>ประวัติ:</b> {tree.history}</p>
        <p><b>สรรพคุณ:</b> {tree.property}</p>
        <p><b>QRCODE</b> {'(เพื่อเข้าสู่หน้านี้)'}</p>
        <div>
          <img src={this.state.qrcode} alt='QRCODE' />
        </div>
      </div>
    )
  }
}

TreeDetail.propTypes = {
  match: PropTypes.object.isRequired
}
