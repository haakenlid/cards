import data from './card-data/'
import loggerMiddleware from 'redux-logger'
import debounceMiddleware from 'redux-debounced'
import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { reducer as ui } from './ducks/ui'
import { reducer as decks, addDeck, shuffleDeck } from './ducks/decks'
import { reducer as protodecks } from './ducks/protodecks'

// middlewares
const middlewares = [debounceMiddleware()]
if (process.env.NODE_ENV === 'development') {
  middlewares.push(loggerMiddleware)
}
// Use this state unless hydrated
const defaultData = {
  protodecks: data,
  ui: { activeDecks: ['sjansekort', 'handlingskort'] },
}

// Initialize decks if needed
const initializeRootStore = store => {
  const { ui, protodecks, decks } = store.getState()
  if (decks.length > 0) return
  ui.activeDecks.forEach((deckName, index) => {
    store.dispatch(addDeck(deckName, protodecks[deckName]))
    store.dispatch(shuffleDeck(deckName))
  })
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  combineReducers({ decks, ui, protodecks }),
  defaultData,
  composeEnhancers(applyMiddleware(...middlewares), autoRehydrate())
)

initializeRootStore(store)
persistStore(store)

export default store
