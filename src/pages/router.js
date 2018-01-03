import { Switch, Route } from 'react-router-dom'
import React from 'react'

import { Routes } from './route'

export default class RouterSwitch extends Switch {
  render () {
    return (
      <div>
        { Routes.map((data) => <Route key={data.path} {...data} />) }
      </div>
    )
  }
}
