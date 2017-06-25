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
export const getProtodecks = R.prop('protodecks')
export const getProtodecksByLanguage = (state, lang) =>
  R.pipe(getProtodecks, R.filter(R.propEq('language', lang)))(state)
export const getProtodeck = (state, name) =>
  R.compose(R.prop(name), getProtodecks)(state)

export const getAvailableLanguages = R.pipe(
  getProtodecks,
  R.pluck('language'),
  R.values,
  R.uniq,
  R.sort(R.gt)
)

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
