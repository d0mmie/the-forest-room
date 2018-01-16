import { Button } from 'antd'
import firebase from 'firebase'
import React from 'react'

import ProfilePanel from '../../components/profilePanel'

export default class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLogin: false,
      user: {},
      isAdmin: false
    }
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database().ref(`/users/${user.uid}`).on('value', (snap) => {
          if (snap.val()) {
            this.setState({isLogin: true, user, isAdmin: snap.val().isAdmin})
          }
        })
      } else {
        this.setState({isLogin: false, user: {}, isAdmin: false})
      }
    })
  }

  loginWithGmail () {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  signout () {
    firebase.auth().signOut()
  }

  render () {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }} >
        {
          this.state.isLogin
            ? <ProfilePanel user={this.state.user} admin={this.state.isAdmin} signout={this.signout} />
            : <div>
              <Button style={{margin: 4}} icon='google' size='large' onClick={this.loginWithGmail} >เข้าสู่ระบบด้วย Gmail</Button>
            </div>
        }
      </div>
    )
  }
}
