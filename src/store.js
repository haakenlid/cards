import data from './data.json'
import loggerMiddleware from 'redux-logger'
import debounceMiddleware from 'redux-debounced'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import { reducer as ui } from './ducks/ui'
import { reducer as decks } from './ducks/decks'
import { reducer as protodecks } from './ducks/decks'

export default createStore(
  combineReducers({ decks, ui, protodecks }),
  { protodecks: [data.sjansekort, data.handlingskort] },
  applyMiddleware(debounceMiddleware(), loggerMiddleware)
)
