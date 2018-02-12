import { Switch, Route } from 'react-router-dom'
import React from 'react'

import { Routes } from './route'

export default class RouterSwitch extends Switch { // ทำ Route เป็น component
  render () {
    return (
      <div>
        { Routes.map((data) => <Route key={data.path} {...data} />) }
      </div>
    )
  }
}
