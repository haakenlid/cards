const actions = {
  RESIZE: 'ui/RESIZE',
}

export const resize = screenSize => ({
  type: actions.RESIZE,
  meta: {
    debounce: { time: 200 },
  },
  payload: { screenSize },
})

export const reducer = (
  state = { screenSize: [100, 100] },
  { type, payload, error }
) => {
  switch (type) {
    case actions.RESIZE:
      return { ...state, ...payload }
    default:
      return state
  }
}
