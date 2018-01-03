import { Button } from 'antd'
import firebase from 'firebase'
import React from 'react'

export default class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLogin: false,
      user: {}
    }
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({isLogin: true, user})
      } else {
        this.setState({isLogin: false, user: {}})
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
            ? <div>
              <Button style={{margin: 4}} size='large' type='danger' onClick={this.signout} >ออกจากระบบ</Button>
            </div>
            : <div>
              <Button style={{margin: 4}} icon='google' size='large' onClick={this.loginWithGmail} >เข้าสู่ระบบด้วย Gmail</Button>
            </div>
        }
      </div>
    )
  }
}
