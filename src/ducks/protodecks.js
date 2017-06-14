import R from 'ramda'

const types = {
  ADD_PROTODECK: 'protodecks/ADD_PROTODECK',
  REMOVE_PROTODECK: 'protodecks/REMOVE_PROTODECK',
}

export const addProtodeck = deck => ({
  type: types.ADD_PROTODECK,
  payload: { [deck.name]: deck },
})

// const protoDeck = (state = {}, action) => {
//   return state
// }

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
