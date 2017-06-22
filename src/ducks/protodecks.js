import R from 'ramda'

const types = {
  ADD_PROTODECK: 'protodecks/ADD_PROTODECK',
  REMOVE_PROTODECK: 'protodecks/REMOVE_PROTODECK',
}

// action creators
export const addProtodeck = deck => ({
  type: types.ADD_PROTODECK,
  payload: { [deck.name]: deck },
})

// selectors
export const getProtodecks = state => state.protodecks
export const getProtodeck = (state, name) => {
  const deck = state.protodecks[name]
  if (deck === undefined) throw new Error(`no protodeck "${name}"`)
  return deck
}

// reducer
export const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_PROTODECK:
      return R.merge(state, action.payload)
    case types.REMOVE_PROTODECK:
      return R.omit([action.payload], state)
    default:
      return state
  }
}
