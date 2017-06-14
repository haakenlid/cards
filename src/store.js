import data from './data.json'
import loggerMiddleware from 'redux-logger'
import debounceMiddleware from 'redux-debounced'
import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { reducer as ui } from './ducks/ui'
import { reducer as decks, addDeck, shuffleDeck } from './ducks/decks'
import { reducer as protodecks } from './ducks/protodecks'

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
    const cards = protodecks[deckName].cards
    store.dispatch(addDeck(deckName, cards))
    store.dispatch(shuffleDeck(deckName))
  })
}

const store = createStore(
  combineReducers({ decks, ui, protodecks }),
  defaultData,
  compose(
    applyMiddleware(debounceMiddleware(), loggerMiddleware),
    autoRehydrate()
  )
)

initializeRootStore(store)
persistStore(store)

export default store
