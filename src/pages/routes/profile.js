import { Button, Card } from 'antd'
import firebase from 'firebase'
import React from 'react'

import ProfilePanel from '../../components/profilePanel'
import connect from '../../store/action'
import PropTypes from 'prop-types'
import ManageUser from '../../components/manageUser'

class Profile extends React.Component {
  loginWithGmail () { // เข้าสู่ระบบด้วย popup gmail
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  componentWillMount () {
    this.props.loadUsers()
  }

  render () {
    const { store, logout } = this.props
    if (store.user.loading) { // ถ้ากำลังโหลดให้ใช้ component loading
      return <Card style={{margin: 10}} loading title='กำลังโหลด...' >...</Card>
    }
    return (
      <div>
        <Card title='โปรไฟล์' style={{margin: 10}} >
          {store.user.isLogin // เช็กว่า login หรือยัง
            ? <ProfilePanel user={store.user.data} admin={store.user.data.isAdmin} signout={logout} /> // ถ้า login แล้วให้แสดงอันนี้
            : <div>
              <Button style={{margin: 4}} icon='google' size='large' onClick={this.loginWithGmail} >เข้าสู่ระบบด้วย Gmail</Button> {/*  ถ้ายังให้แสดงอันนี้ */}
            </div>
          }
        </Card>
        {store.user.data.isAdmin && <ManageUser />}
      </div>
    )
  }
}

Profile.propTypes = {
  store: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired
}

export default connect(Profile)
