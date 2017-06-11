import * as actions from './actions'
import { combineReducers } from 'redux'

const card = (state, action) => {
  const { flip = true } = state
  switch (action.type) {
    case actions.SHUFFLE_DECK:
      return { ...state, status: 0 }
    case actions.FLIP_CARD:
      return { ...state, flip: !flip }
    case actions.DISCARD_CARD:
      return { ...state, status: 2 }
    default:
      return state
  }
}

const deck = (state = { name: '', cards: [] }, action) => {
  switch (action.type) {
    case actions.ADD_DECK: {
      return {
        ...state,
        ...action.payload,
        cards: action.payload.cards.map(c => card(c, action)),
      }
    }
    case actions.FLIP_CARD:
    case actions.DISCARD_CARD:
      return {
        ...state,
        cards: [card(state.cards[0], action), ...state.cards.splice(1)],
      }
    case actions.SHUFFLE_DECK:
      return { ...state, cards: state.cards.map(c => card(c, action)) }
    default:
      return state
  }
}

const decks = (state = [], action) => {
  if (action.type === actions.ADD_DECK) {
    return [...state, deck(action)]
  }
  if (action.payload) {
    return state.map(
      d => (action.payload.deck === d.name ? deck(d, action) : d)
    )
  }
  return state
}

const ui = (state = { screenSize: [100, 100] }, action) => {
  switch (action.type) {
    case actions.RESIZE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default combineReducers({ decks, ui })
