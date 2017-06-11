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
export const RESIZE = 'RESIZE'
export const resize = screenSize => ({
  type: RESIZE,
  meta: {
    debounce: { time: 200 },
  },
  payload: { screenSize },
})
