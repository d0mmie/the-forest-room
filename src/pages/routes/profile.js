import { Button, Card } from 'antd'
import firebase from 'firebase'
import React from 'react'

import ProfilePanel from '../../components/profilePanel'
import connect from '../../store/action'
import PropTypes from 'prop-types'

class Profile extends React.Component {
  loginWithGmail () { // เข้าสู่ระบบด้วย popup gmail
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  render () {
    if (this.props.store.user.loading) { // ถ้ากำลังโหลดให้ใช้ component loading
      return <Card style={{margin: 10}} loading title='กำลังโหลด...' >...</Card>
    }
    return (
      <Card title='โปรไฟล์' style={{margin: 10}} >
        {this.props.store.user.isLogin // เช็กว่า login หรือยัง
          ? <ProfilePanel user={this.props.store.user.data} admin={this.props.store.user.data.isAdmin} signout={this.props.logout} /> // ถ้า login แล้วให้แสดงอันนี้
          : <div>
            <Button style={{margin: 4}} icon='google' size='large' onClick={this.loginWithGmail} >เข้าสู่ระบบด้วย Gmail</Button> {/*  ถ้ายังให้แสดงอันนี้ */}
          </div>
        }
      </Card>
    )
  }
}

Profile.propTypes = {
  store: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

export default connect(Profile)
