import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import R from 'ramda'

const cardArt = ({ front = 'front.jpg', back = 'back.jpg' }, deck) => [
  `.${deck} .CardFront { background-image: url("assets/${front}");}`,
  `.${deck} .CardBack { background-image: url("assets/${back}");}`,
]

export const makeStyleSheet = R.pipe(
  R.mapObjIndexed(cardArt), // build styles
  R.values, // object -> array
  R.flatten, // nested array -> array
  R.join('\n') // array -> string
)

class Head extends React.Component {
  render() {
    const style = makeStyleSheet(this.props.protodecks)
    return (
      <Helmet>
        <title>Trekk et kort!</title>
        <style>{style}</style>
      </Helmet>
    )
  }
}
const mapStateToProps = ({ protodecks }) => ({ protodecks })

export default connect(mapStateToProps)(Head)
