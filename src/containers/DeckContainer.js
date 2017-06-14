import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Card from '../components/Card'
import { flipCard, discardCard, shuffleDeck } from '../ducks/decks'

const getScreenSize = () => [window.innerWidth, window.innerHeight]

let Deck = ({ deckName, cards, topCard, shuffle, discard, flip, ...props }) => {
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
      <div className={classNames('Deck', deckName)} {...props}>
        {cards
          .map(renderCard)
          .slice(Math.max(0, topCard - 3), topCard + 2)
          .reverse()}
      </div>
    )
  }
}
Deck = connect(null, (dispatch, { deckName, topCard }) => ({
  flip: eventHandler(dispatch, flipCard, [deckName, topCard]),
  discard: eventHandler(dispatch, discardCard, [deckName, topCard]),
  shuffle: eventHandler(dispatch, shuffleDeck, [deckName]),
}))(Deck)

const eventHandler = (dispatch, action, args) => e => {
  e.preventDefault()
  e.stopPropagation()
  dispatch(action(...args))
}

const DeckContainer = ({ screenSize, decks = [], dispatch }) => {
  const [screenWidth, screenHeight] = screenSize ? screenSize : getScreenSize()
  const ratio = 0.71
  const vertical = decks.length * ratio
  const horizontal = 1
  const width = screenWidth / horizontal
  const height = screenHeight / vertical
  const fontSize = width < height ? `10vw` : `${10 / vertical}vh`
  const deckStyle = { width: '9em', height: `${9 * ratio}em` }
  if (decks.length === 0) {
    return <div> No decks found </div>
  }
  return (
    <div className="DeckContainer" style={{ fontSize }}>
      {decks.map(props => (
        <Deck key={props.deckName} style={deckStyle} {...props} />
      ))}
    </div>
  )
}

export default connect(({ decks, ui }) => ({
  decks,
  screenSize: ui.screenSize || null,
}))(DeckContainer)
