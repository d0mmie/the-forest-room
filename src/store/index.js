import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import * as Reducers from './reducers'

export default createStore(combineReducers(Reducers), composeWithDevTools(applyMiddleware()))
