import React, { Component } from 'react'
import RouterSwitch from './pages/router'
import History from './history'
import { Router } from 'react-router-dom'
import NavMenu from './components/navMenu'

class App extends Component {
  render() {
    return (
      <Router history={History}>
        <div>
          <NavMenu history={History} />
          <article style={{padding:4}} >
            <RouterSwitch />
          </article>
        </div>
      </Router>
    );
  }
}

export default App;
