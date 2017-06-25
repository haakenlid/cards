import { getProtodecksByLanguage } from './protodecks'
import { shuffleDeck, addDeck } from './decks'
import R from 'ramda'

const actions = {
  RESIZE: 'ui/RESIZE',
  TOGGLE_MENU: 'TOGGLE_MENU',
  SET_LANGUAGE: 'ui/SET_LANGUAGE',
  CHOOSE_LANGUAGE: 'ui/CHOOSE_LANGUAGE',
}

// action creators
const setLanguage = language => ({
  type: actions.SET_LANGUAGE,
  payload: { language },
})
export const toggleMenu = () => ({
  type: actions.TOGGLE_MENU,
  payload: {},
})

const addDecks = R.pipe(
  R.mapObjIndexed((data, deckName) => [
    addDeck(deckName, data),
    shuffleDeck(deckName),
  ]),
  R.values,
  R.flatten
)

export const chooseLanguage = language => (dispatch, getState) => {
  const decks = getProtodecksByLanguage(getState(), language)
  const actions = addDecks(decks)
  R.map(dispatch, [...actions, setLanguage(language)])
}

// // Initialize decks if needed
//   const { ui, protodecks, decks } = store.getState()
//   if (decks.length > 0) return
// }

export const resize = (width, height) => ({
  type: actions.RESIZE,
  meta: { debounce: { time: 50 } },
  payload: { screenSize: [width, height] },
})

// selectors
export const getScreenSize = state => state.ui.screenSize
export const getShowMenu = state => state.ui.showMenu
export const getLanguage = state => state.ui.language

// reducer
export const reducer = (state = { showMenu: false }, action) => {
  switch (action.type) {
    case actions.RESIZE:
    case actions.SET_LANGUAGE:
      return { ...state, ...action.payload }
    case actions.TOGGLE_MENU:
      return { ...state, showMenu: !state.showMenu }
    default:
      return state
  }
}
