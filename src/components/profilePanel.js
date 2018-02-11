import { Button, Tag } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import styles from 'styled-components'
import connect from '../store/action'

const UserPanel = styles.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 768px) {
    flex-direction: column
  }
`

const UserImgBox = styles.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
`

class ProfilePanel extends React.Component {
  render () {
    const { store } = this.props
    return (
      <div style={{flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: 25}} >
        <UserPanel>
          <div style={{flex: 1}} >
            <p><b>รหัสผู้ใช้งาน:</b> {store.user.data.uid}</p>
            <p><b>ชื่อ:</b> {store.user.data.displayName} </p>
            <p><b>อีเมล:</b> {store.user.data.email}</p>
            <p><b>ระดับ:</b> {store.user.data.isAdmin ? <Tag color='orange'>{'ผู้ดูแล'}</Tag> : <Tag color='green'>{'ผู้ใช้'}</Tag>}</p>
            <p>
              <Button size='small' type='danger' onClick={this.props.logout} >ออกจากระบบ</Button>
            </p>
          </div>
          <UserImgBox>
            <img style={{width: 200, height: 200, borderRadius: 100}} src={store.user.data.photoURL} alt={store.user.data.displayName} />
          </UserImgBox>
        </UserPanel>
      </div>
    )
  }
}

ProfilePanel.propTypes = {
  logout: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired
}

export default connect(ProfilePanel)
