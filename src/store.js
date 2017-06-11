import rootReducer from './reducers'
import data from './data.json'
import loggerMiddleware from 'redux-logger'
import debounceMiddleware from 'redux-debounced'
import { applyMiddleware, createStore } from 'redux'

export default createStore(
  rootReducer,
  { decks: [data.sjansekort, data.handlingskort] },
  applyMiddleware(debounceMiddleware(), loggerMiddleware)
)
