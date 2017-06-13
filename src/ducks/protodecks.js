const actions = {
  FLIP_CARD: 'decks/FLIP_CARD',
  DISCARD_CARD: 'decks/DISCARD_CARD',
  SHUFFLE_DECK: 'decks/SHUFFLE_DECK',
  ADD_DECK: 'decks/ADD_DECK',
}

export const flipCard = deck => ({
  type: actions.FLIP_CARD,
  payload: { deck },
})
export const discardCard = deck => ({
  type: actions.DISCARD_CARD,
  payload: { deck },
})
export const shuffleDeck = deck => ({
  type: actions.SHUFFLE_DECK,
  payload: { deck },
})
export const addDeck = deck => ({
  type: actions.ADD_DECK,
  payload: deck,
})

const card = (state, action) => {
  const { status = 0 } = state
  switch (action.type) {
    case actions.SHUFFLE_DECK:
      return { ...state, status: 0 }
    case actions.FLIP_CARD:
      return { ...state, status: [1, 0, 2][status] }
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

export const reducer = (state = [], action) => {
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
