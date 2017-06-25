import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Card from '../components/Card'
import { flipCard, discardCard, shuffleDeck } from '../ducks/decks'

let Deck = ({ deckName, cards, topCard, onClick, ...props }) => {
  const renderCard = ({ status, deckName, ...props }, index) => (
    <Card
      top={index === topCard}
      flip={status === 1}
      discarded={index < topCard}
      key={index}
      {...props}
    />
  )
  return (
    <div className={classNames('Deck', deckName)} onClick={onClick} {...props}>
      <div className="Card reshuffle" />
      {cards.map(renderCard).reverse()}
    </div>
  )
}

Deck = connect(null, (dispatch, { deckName, topCard, cards }) => {
  const handler = cards.length <= topCard
    ? shuffleDeck
    : cards[topCard].status === 0 ? flipCard : discardCard
  return {
    onClick: e => {
      e.preventDefault()
      e.stopPropagation()
      dispatch(handler(deckName, topCard))
    },
  }
})(Deck)

const NoDecks = () => <h1> No decks found </h1>

const MainPage = ({ decks }) => (
  <section className="MainPage">
    {decks.length === 0
      ? <NoDecks />
      : <div className="wrapper">
          {decks.map(d => <Deck key={d.deckName} {...d} />)}
        </div>}
  </section>
)

export default connect(({ decks }) => ({ decks }))(MainPage)
