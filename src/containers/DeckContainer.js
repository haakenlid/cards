import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Card from '../components/Card'
import { flipCard, discardCard, addDeck, shuffleDeck } from '../ducks/decks'

const getScreenSize = () => [window.innerWidth, window.innerHeight]

let Deck = ({ id, cards, topCard, shuffle, discard, flip, ...props }) => {
  const renderCard = ({ status, deckName, ...props }, index) => (
    <Card
      discarded={index < topCard}
      flip={status === 1}
      className={deckName || 'blank'}
      onClick={[flip, discard, null][status]}
      key={index}
      {...props}
    />
  )
  if (topCard === cards.length) {
    return <div {...props} className="Deck reshuffle" onClick={shuffle} />
  } else {
    return (
      <div className={classNames('Deck', id)} {...props}>
        {cards
          .map(renderCard)
          .slice(Math.max(0, topCard - 3), topCard + 2)
          .reverse()}
      </div>
    )
  }
}
Deck = connect(null, (dispatch, { id, topCard }) => ({
  flip: eventHandler(dispatch, flipCard, [id, topCard]),
  discard: eventHandler(dispatch, discardCard, [id, topCard]),
  shuffle: eventHandler(dispatch, shuffleDeck, [id]),
}))(Deck)

const eventHandler = (dispatch, action, args) => e => {
  e.preventDefault()
  e.stopPropagation()
  dispatch(action(...args))
}

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
  const addProtoDecks = () =>
    protodecks.forEach(protodeck => dispatch(addDeck(protodeck)))
  if (decks.length === 0) {
    addProtoDecks()
    return null
  }
  return (
    <div className="DeckContainer" style={{ fontSize }}>
      {decks.map(props => <Deck key={props.id} style={deckStyle} {...props} />)}
    </div>
  )
}

export default connect(({ decks, ui, protodecks }) => ({
  decks,
  protodecks,
  screenSize: ui.screenSize || null,
}))(DeckContainer)
