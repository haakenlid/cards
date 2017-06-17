import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import R from 'ramda'

const deckStyle = ({ front, back }, deck, _) => [
  `.${deck} .CardFront { background-image: url("assets/${front}");}`,
  `.${deck} .CardBack { background-image: url("assets/${back}");}`,
]

export const makeStyleSheet = R.pipe(
  R.mapObjIndexed(deckStyle),
  R.values,
  R.flatten,
  R.join('\n')
)

const Head = ({ protodecks }) => (
  <Helmet>
    <title>Trekk et kort!</title>
    <style>{makeStyleSheet(protodecks)}</style>
  </Helmet>
)
const mapStateToProps = ({ protodecks }) => ({ protodecks })

export default connect(mapStateToProps)(Head)
