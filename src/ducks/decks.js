const types = {
  FLIP_CARD: 'decks/FLIP_CARD',
  DISCARD_CARD: 'decks/DISCARD_CARD',
  SHUFFLE_DECK: 'decks/SHUFFLE_DECK',
  ADD_DECK: 'decks/ADD_DECK',
}

export const flipCard = (deckId, topCard) => ({
  type: types.FLIP_CARD,
  payload: { deckId, topCard },
})
export const discardCard = (deckId, topCard) => ({
  type: types.DISCARD_CARD,
  payload: { deckId, topCard },
})
export const shuffleDeck = deckId => ({
  type: types.SHUFFLE_DECK,
  payload: { deckId },
})
export const addDeck = ({ name, cards }) => ({
  foo: console.log(name, cards),
  type: types.ADD_DECK,
  payload: { id: name, name, cards },
})

const newCard = (card, deckName) => ({ status: 0, deckName, ...card })

const shuffle = arr => {
  const a = arr.slice()
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i)
    ;[a[i - 1], a[j]] = [a[j], a[i - 1]]
  }
  return a
}

const card = (state, action) => {
  switch (action.type) {
    case types.SHUFFLE_DECK:
      return { ...state, status: 0 }
    case types.FLIP_CARD:
      return { ...state, status: [1, 0, 2][state.status] }
    default:
      return state
  }
}

const deck = (state, action) => {
  switch (action.type) {
    case types.ADD_DECK:
      return {
        topCard: 0,
        id: action.payload.id,
        cards: action.payload.cards.map(c => newCard(c, action.payload.name)),
      }
    case types.FLIP_CARD:
      return {
        ...state,
        cards: state.cards.map(
          (c, index) => (index === state.topCard ? card(c, action) : c)
        ),
      }
    case types.DISCARD_CARD:
      return { ...state, topCard: state.topCard + 1 }
    case types.SHUFFLE_DECK:
      return {
        ...state,
        topCard: 0,
        cards: shuffle(state.cards.map(c => card(c, action))),
      }
    default:
      return state
  }
}

export const reducer = (state = [], action) => {
  if (action.type === types.ADD_DECK) {
    action.payload.id = state.length + 1
    return [...state, deck(null, action)]
  }
  if (action.payload) {
    return state.map(
      d => (action.payload.deckId === d.id ? deck(d, action) : d)
    )
  }
  return state
}
