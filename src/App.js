import React, { Component } from 'react'
import RouterSwitch from './pages/router'
import History from './history'
import { Router } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router history={History}>
        <div>
          <RouterSwitch />
        </div>
      </Router>
    );
  }
}

export default App;
