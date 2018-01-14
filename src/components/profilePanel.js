import { Button } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

export default class ProfilePanel extends React.Component {
  render () {
    const { user, admin } = this.props
    return (
      <div style={{flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: 25}} >
        <div style={{display: 'flex', flexDirection: 'row'}} >
          <div style={{flex: 1}} >
            <h2>โปรไฟล์</h2>
            <p><b>รหัสผู้ใช้งาน:</b> {user.uid}</p>
            <p><b>ชื่อ:</b> {user.displayName} </p>
            <p><b>อีเมล:</b> {user.email}</p>
            <p><b>ระดับ:</b> {admin ? 'ผู้ดูแล' : 'ผู้ใช้'}</p>
          </div>
          <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}} >
            <img style={{width: 200, height: 200, borderRadius: 100}} src={user.photoURL} alt={user.displayName} />
          </div>
        </div>
        <div style={{textAlign: 'left'}} >
          <Button size='small' type='danger' onClick={this.props.signout} >ออกจากระบบ</Button>
        </div>
      </div>
    )
  }
}

ProfilePanel.propTypes = {
  signout: PropTypes.func.isRequired,
  user: PropTypes.object,
  admin: PropTypes.bool
}
