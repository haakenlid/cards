import React from 'react'
import { Provider } from 'react-redux'
import './css/style.css'
import store from './store'
import DeckContainer from './containers/DeckContainer'
import AppMenu from './containers/AppMenu'
import Head from './containers/Head'

class AppShell extends React.Component {
  render() {
    return (
      <section className="App">
        <Head />
        <DeckContainer />
        <AppMenu />
      </section>
    )
  }
}

export default () => (
  <Provider store={store}>
    <AppShell />
  </Provider>
)
