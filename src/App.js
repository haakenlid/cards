import React from 'react'
import { Provider } from 'react-redux'
import './css/style.css'
import MainPage from './pages/MainPage'
import Head from './containers/Head'
import { reducer as ui } from './ducks/ui'
import { reducer as decks } from './ducks/decks'
import { reducer as protodecks } from './ducks/protodecks'
import createStore from './store'

const AppShell = () => (
  <section className="App">
    <Head />
    <MainPage />
  </section>
)

export default () => (
  <Provider store={createStore({ ui, decks, protodecks })}>
    <AppShell />
  </Provider>
)
