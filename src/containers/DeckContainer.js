import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Card from '../components/Card'
import { flipCard, discardCard, addDeck, shuffleDeck } from '../ducks/decks'

const getScreenSize = () => [window.innerWidth, window.innerHeight]

let Deck = ({
  name,
  cards,
  topCard = 0,
  shuffleDeck,
  discardTop,
  flipTop,
  ...props
}) => {
  if (topCard == cards.length) {
    return <div {...props} className="Deck reshuffle" onClick={shuffleDeck} />
  }
  const renderCard = (props, index) =>
    props.status
      ? <Card flip={true} key={index} onClick={discardTop} {...props} />
      : <Card flip={false} key={index} onClick={flipTop} {...props} />
  return (
    <div className={classNames('Deck', name)} {...props}>
      {cards.map(renderCard).slice(topCard)}
    </div>
  )
}
Deck = connect(null, (dispatch, { name, topCard }) => ({
  flipTop: () => dispatch(flipCard(name, topCard)),
  discardTop: () => dispatch(discardCard(name, topCard)),
  shuffleDeck: () => dispatch(shuffleDeck(name)),
}))(Deck)

const DeckContainer = ({
  screenSize,
  decks = [],
  protodecks = [],
  dispatch,
}) => {
  const [screenWidth, screenHeight] = screenSize ? screenSize : getScreenSize()
  const ratio = 0.71
  const vertical = decks.length * ratio
  const horizontal = 1
  const width = screenWidth / horizontal
  const height = screenHeight / vertical
  const fontSize = width < height ? `10vw` : `${10 / vertical}vh`
  const deckStyle = { width: '9em', height: `${9 * ratio}em` }
  const addProtoDecs = () =>
    protodecks.forEach(protodeck => dispatch(addDeck(protodeck)))
  if (decks.length === 0) return <div onClick={addProtoDecs}> click me </div>
  return (
    <div className="DeckContainer" style={{ fontSize }}>
      {decks.map(props => (
        <Deck key={props.name} style={deckStyle} {...props} />
      ))}
    </div>
  )
}

export default connect(({ decks, ui, protodecks }) => ({
  decks,
  protodecks,
  screenSize: ui.screenSize || null,
}))(DeckContainer)
