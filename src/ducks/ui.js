const actions = {
  RESIZE: 'ui/RESIZE',
  TOGGLE_MENU: 'TOGGLE_MENU',
}

// action creators
export const toggleMenu = () => ({
  type: actions.TOGGLE_MENU,
  payload: {},
})
export const resize = screenSize => ({
  type: actions.RESIZE,
  meta: { debounce: { time: 100 } },
  payload: { screenSize },
})

// selectors
export const getScreenSize = state => state.ui.screenSize
export const getShowMenu = state => state.ui.showMenu

// reducer
export const reducer = (
  state = { screenSize: [300, 300], showMenu: false },
  { type, payload, error }
) => {
  switch (type) {
    case actions.RESIZE:
      return { ...state, ...payload }
    case actions.TOGGLE_MENU:
      return { ...state, showMenu: !state.showMenu }
    default:
      return state
  }
}
