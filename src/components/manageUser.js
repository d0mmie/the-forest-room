import { Card, List, Switch } from 'antd'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import React from 'react'

import connect from '../store/action'

class ManageUser extends React.Component {

  manageAdmin (checked, uid) {
    firebase.database().ref(`/users/${uid}`).update({ // เปลี่ยนสถานะของ user เป็นตามตัวเช็ค
      isAdmin: checked
    })
  }

  render () {
    return (
      <Card style={{margin: 10}} title='ผู้ใช้'>
        <List
          itemLayout='vertical'
          size='large'
          dataSource={Object.values(this.props.store.users.data)}
          renderItem={item => (
            <List.Item
              key={item.uid}
            >
              <List.Item.Meta
                title={this.props.store.user.data.uid === item.uid ? item.name + '(ฉัน)' : item.name}
                description={item.uid}
              />
              <Switch disabled={this.props.store.user.data.uid === item.uid} checkedChildren='ใช่' unCheckedChildren='ไม่ใช่' defaultChecked={item.isAdmin} onChange={(e) => this.manageAdmin(e, item.uid)} />{' เป็น Admin'}
            </List.Item>
          )}
        />
      </Card>
    )
  }
}

ManageUser.propTypes = {
  store: PropTypes.object.isRequired
}

export default connect(ManageUser)
