const actions = {
  FLIP_CARD: 'decks/FLIP_CARD',
  DISCARD_CARD: 'decks/DISCARD_CARD',
  SHUFFLE_DECK: 'decks/SHUFFLE_DECK',
  ADD_DECK: 'decks/ADD_DECK',
}

export const flipCard = (deck, topCard) => ({
  type: actions.FLIP_CARD,
  payload: { deck, topCard },
})
export const discardCard = (deck, topCard) => ({
  type: actions.DISCARD_CARD,
  payload: { deck, topCard },
})
export const shuffleDeck = deck => ({
  type: actions.SHUFFLE_DECK,
  payload: { deck },
})
export const addDeck = ({ name, cards }) => ({
  type: actions.ADD_DECK,
  payload: { name, cards },
})

const newCard = (card, deck) => ({ status: 0, deck, ...card })

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
    case actions.SHUFFLE_DECK:
      return { ...state, status: 0 }
    case actions.FLIP_CARD:
      return { ...state, status: !state.status }
    default:
      return state
  }
}

const deck = (state, action) => {
  switch (action.type) {
    case actions.ADD_DECK:
      return {
        topCard: 0,
        name: action.payload.name,
        cards: action.payload.cards.map(c => newCard(c, action.payload.name)),
      }
    case actions.FLIP_CARD:
      return {
        ...state,
        cards: state.cards.map(
          (c, index) => (index == state.topCard ? card(c, action) : c)
        ),
      }
    case actions.DISCARD_CARD:
      return { ...state, topCard: state.topCard + 1 }
    case actions.SHUFFLE_DECK:
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
  if (action.type === actions.ADD_DECK) {
    return [...state, deck(null, action)]
  }
  if (action.payload) {
    return state.map(
      d => (action.payload.deck === d.name ? deck(d, action) : d)
    )
  }
  return state
}
