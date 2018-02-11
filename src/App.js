import React, { Component } from 'react'
import RouterSwitch from './pages/router'
import History from './history'
import { Router } from 'react-router-dom'
import NavMenu from './components/navMenu'
import connect from './store/action'
import PropTypes from 'prop-types'

class App extends Component {
  componentWillMount () {
    this.props.triggerAuth()
  }
  render () {
    return (
      <Router history={History}>
        <div>
          <NavMenu history={History} />
          <article style={{padding: 4}} >
            <RouterSwitch />
          </article>
        </div>
      </Router>
    )
  }
}

App.propTypes = {
  triggerAuth: PropTypes.func.isRequired
}

export default connect(App)
