import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { flipCard } from '../ducks/decks'
import Card from './Card'

const Deck = ({ name, cards, flipCard, ...props }) => (
  <div
    className={classNames('Deck', name)}
    {...props}
    onClick={e => flipCard(name)}
  >
    {cards.map((c, i) => <Card key={i} {...c} />)}
  </div>
)
export default connect(null, { flipCard })(Deck)
