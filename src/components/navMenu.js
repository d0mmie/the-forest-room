import React from 'react'
import { Menu, Icon } from 'antd'
import PropTypes from 'prop-types'

export default class NavMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      current: ''
    }
    this.changeRoute = this.changeRoute.bind(this)
  }

  changeRoute (e) { // เปลี่ยนหน้า
    this.props.history.push(e.key)
  }
  render () {
    return (
      <Menu
        onClick={this.changeRoute}
        selectedKeys={[this.props.history.location.pathname]}
        mode='horizontal'
      >
        <Menu.Item key='/'>
          <Icon type='home' />{'หน้าหลัก'}
        </Menu.Item>
        <Menu.Item key='/search'>
          <Icon type='search' />{'ค้นหา'}
        </Menu.Item>
        <Menu.Item key='/tree'>
          <Icon type='file-text' />{'รายชื่อต้นไม้'}
        </Menu.Item>
        <Menu.Item key='/profile'>
          <Icon type='user' />{'โปรไฟล์'}
        </Menu.Item>
      </Menu>
    )
  }
}

NavMenu.propTypes = {
  history: PropTypes.object.isRequired
}
