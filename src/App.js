import React, { Component } from 'react'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import classNames from 'classnames'
import logger from 'redux-logger'
import './css/cards.css'
import './css/style.css'
import data from './data.json'

export const FLIP_CARD = 'FLIP_CARD'
export const flipCard = deck => ({
  type: FLIP_CARD,
  payload: { deck },
})
export const DISCARD_CARD = 'DISCARD_CARD'
export const discardCard = deck => ({
  type: DISCARD_CARD,
  payload: { deck },
})
export const SHUFFLE_DECK = 'SHUFFLE_DECK'
export const shuffleDeck = deck => ({
  type: SHUFFLE_DECK,
  payload: { deck },
})
export const ADD_DECK = 'ADD_DECK'
export const addDeck = deck => ({
  type: ADD_DECK,
  payload: deck,
})

const card = (state, action) => {
  const { flip = true, status = 0 } = state
  switch (action.type) {
    case SHUFFLE_DECK:
      return { ...state, status: 0 }
    case FLIP_CARD:
      return { ...state, flip: !flip }
    case DISCARD_CARD:
      return { ...state, status: 2 }
    default:
      return state
  }
}

const deck = (state = { name: '', cards: [] }, action) => {
  switch (action.type) {
    case ADD_DECK: {
      return {
        ...state,
        ...action.payload,
        cards: action.payload.cards.map(c => card(c, action)),
      }
    }
    case FLIP_CARD:
    case DISCARD_CARD:
      return {
        ...state,
        cards: [card(state.cards[0], action), ...state.cards.splice(1)],
      }
    case SHUFFLE_DECK:
      return { ...state, cards: state.cards.map(c => card(c, action)) }
    default:
      return state
  }
}

const decks = (state = [], action) => {
  if (action.type === ADD_DECK) {
    return [...state, deck(action)]
  }
  if (action.payload) {
    return state.map(
      d => (action.payload.deck === d.name ? deck(d, action) : d)
    )
  }
  return state
}

const initialState = { decks: [data.sjansekort, data.handlingskort] }

const store = createStore(
  combineReducers({ decks }),
  initialState,
  applyMiddleware(logger)
)

const Card = ({ title, text, flip = true, ...props }) => (
  <div className={classNames('card', { flip })} {...props}>
    <div className="front">
      <div className="pad">
        <h2 className="card-title">
          {title}
        </h2>
        <div className="card-text">
          {text}
        </div>
      </div>
    </div>
    <div className="back" />
  </div>
)

const Deck = ({ name, cards, flipCard }) => (
  <div className={classNames('deck', name)}>
    <svg className="spacer" viewBox="0 0 1000 710" />
    <Card onClick={e => flipCard(name)} {...cards[0]} />
  </div>
)
const DeckContainer = connect(null, { flipCard })(Deck)

let Root = ({ decks = [] }) => (
  <div className="App">
    <div className="wrapper">
      {decks.map(props => <DeckContainer key={props.name} {...props} />)}
    </div>
  </div>
)
Root = connect(state => state)(Root)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    )
  }
}

export default App
