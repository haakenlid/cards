import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Card from '../components/Card'
import { getDecks, flipCard, discardCard, shuffleDeck } from '../ducks/decks'
import { getLanguage } from '../ducks/ui'
import LanguageMenu from './LanguageMenu'

let Deck = ({ deckName, cards, topCard, onClick, ...props }) => {
  const renderCard = ({ status, deckName, ...props }, index) => {
    const top = index === topCard
    const flip = top && status === 1
    const discarded = index < topCard
    return <Card {...{ key: index, top, flip, discarded, ...props }} />
  }
  return (
    <div className={classNames('Deck', deckName)} onClick={onClick}>
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

const MainPage = ({ decks, language }) => (
  <section className="MainPage">
    {language && decks.length
      ? <div className="wrapper">
          {decks.map(d => <Deck key={d.deckName} {...d} />)}
        </div>
      : <LanguageMenu />}
  </section>
)

export default connect(state => ({
  decks: getDecks(state),
  language: getLanguage(state),
}))(MainPage)
