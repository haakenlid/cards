const types = {
  FLIP_CARD: 'decks/FLIP_CARD',
  DISCARD_CARD: 'decks/DISCARD_CARD',
  SHUFFLE_DECK: 'decks/SHUFFLE_DECK',
  ADD_DECK: 'decks/ADD_DECK',
  REMOVE_DECK: 'decks/REMOVE_DECK',
}

// action creators
export const flipCard = (deckName, topCard) => ({
  type: types.FLIP_CARD,
  payload: { deckName, topCard },
})
export const discardCard = (deckName, topCard) => ({
  type: types.DISCARD_CARD,
  payload: { deckName, topCard },
})
export const shuffleDeck = deckName => ({
  type: types.SHUFFLE_DECK,
  payload: { deckName },
})
export const addDeck = (deckName, props) => ({
  type: types.ADD_DECK,
  payload: { deckName, ...props },
})
export const RemoveDeck = deckName => ({
  type: types.REMOVE_DECK,
  payload: { deckName },
})

// selectors
export const getDecks = state => state.decks

export const getDeck = (state, deckName) =>
  getDecks(state).find(deck => deck.deckName === deckName)

export const getCard = (state, deckName, cardIndex) =>
  getDeck(state, deckName).cards[cardIndex]

export const getTopCard = (state, deckName) => {
  const deck = getDeck(state, deckName)
  return deck.cards[deck.topCard]
}

// utility functions
const shuffle = arr => {
  const a = arr.slice()
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i)
    ;[a[i - 1], a[j]] = [a[j], a[i - 1]]
  }
  return a
}

// reducers
const card = (state, action) => {
  switch (action.type) {
    case types.ADD_DECK:
      return { ...state, status: 0, ...action.payload }
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
    case types.ADD_DECK: {
      const { cards, deckName, ...props } = action.payload
      return {
        topCard: 0,
        deckName,
        cards: cards.map(payload => card({ deckName }, { ...action, payload })),
        ...props,
      }
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

// root reducer

const decks = (state = [], action) => {
  switch (action.type) {
    case types.ADD_DECK:
      //if (state.filter(d => d.deckName === action.payload.deckName))
      //  return state
      return [...state, deck(undefined, action)]
    case types.REMOVE_DECK:
      return state.filter(d => d.deckName !== action.payload.deckName)
    case types.FLIP_CARD:
    case types.DISCARD_CARD:
    case types.SHUFFLE_DECK:
      return state.map(
        d => (action.payload.deckName === d.deckName ? deck(d, action) : d)
      )
    default:
      return state
  }
}
export { decks as reducer }
