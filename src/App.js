import React from 'react'
import { Provider } from 'react-redux'
import './css/style.css'
import store from './store'
import MainPage from './pages/MainPage'
import Head from './containers/Head'

class AppShell extends React.Component {
  render() {
    return (
      <section className="App">
        <Head />
        <MainPage />
      </section>
    )
  }
}

export default () => (
  <Provider store={store}>
    <AppShell />
  </Provider>
)
