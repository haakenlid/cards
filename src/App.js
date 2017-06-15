import React from 'react'
import { Provider } from 'react-redux'
import './css/style.css'
import store from './store'
import DeckContainer from './containers/DeckContainer'
import AppMenu from './containers/AppMenu'

class AppShell extends React.Component {
  render() {
    return (
      <section className="App">
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
