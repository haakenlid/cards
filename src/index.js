import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

const rootElement = document.getElementById('root')
const renderApp = A => ReactDOM.render(<A />, rootElement)

if (module.hot) {
  module.hot.accept('./App.js', () => {
    console.log('hot reload')
    const NextApp = require('./App').default
    renderApp(NextApp)
  })
}

renderApp(App)
registerServiceWorker()
