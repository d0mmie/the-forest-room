import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDvf82RVmyi8V8GJIC8UVkCsNJ9Isrigak',
  authDomain: 'the-forest-room.firebaseapp.com',
  databaseURL: 'https://the-forest-room.firebaseio.com',
  projectId: 'the-forest-room',
  storageBucket: 'the-forest-room.appspot.com',
  messagingSenderId: '1039388374848'
}

firebase.initializeApp(config)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
