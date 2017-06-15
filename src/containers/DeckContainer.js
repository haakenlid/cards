import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Card from '../components/Card'
import { flipCard, discardCard, shuffleDeck } from '../ducks/decks'
import { resize } from '../ducks/ui'

let Deck = ({ style, deckName, cards, topCard, onClick, ...props }) => {
  const renderCard = ({ status, deckName, ...props }, index) => (
    <Card
      top={index === topCard}
      flip={index === topCard && status === 1}
      discarded={index < topCard}
      key={index}
      style={style}
      {...props}
    />
  )
  return (
    <div className={classNames('Deck', deckName)} onClick={onClick} {...props}>
      <div className="Card reshuffle" style={style} />
      {cards
        .map(renderCard)
        .slice(Math.max(0, topCard - 1), topCard + 2)
        .reverse()}
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

const calculateDeckStyles = (len = 1, size = 1, column = false) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    const scale = 0.8 * Math.min(1, size)
    const offset = (i - (len - 1) / 2) * size
    let translate = ['0', `${offset * 100}%`]
    if (!column) translate = translate.reverse()
    arr.push({ transform: `translate(${translate}) scale(${scale})` })
  }
  return arr
}

const layout = (screenSize, decksLen = 1, cardRatio = 0.71) => {
  const [screenWidth, screenHeight] = screenSize || [100, 100]
  const fontSize = screenWidth < screenHeight / cardRatio
    ? `${screenWidth / 10}px`
    : `${screenHeight / 10 / cardRatio}px`
  let deckStyles = []
  if (screenWidth < screenHeight * decksLen * cardRatio) {
    // column
    deckStyles = calculateDeckStyles(
      decksLen,
      screenHeight / (screenWidth * cardRatio * decksLen),
      true
    )
  } else {
    // row
    deckStyles = calculateDeckStyles(
      decksLen,
      screenWidth * cardRatio / (screenHeight * decksLen),
      false
    )
  }
  return {
    wrapperStyle: { width: '9.5em', height: `${9.5 * cardRatio}em` },
    containerStyle: { fontSize },
    deckStyles,
  }
}

const NoDecks = () => <h1> No decks found </h1>

class DeckContainer extends React.Component {
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }
  componentDidMount() {
    this.resize()
    window.addEventListener('resize', this.resize)
  }
  resize = () => {
    this.props.resize([this.element.clientWidth, this.element.clientHeight])
  }
  render() {
    const { decks, screenSize } = this.props
    if (decks.length === 0) return <NoDecks />
    const styles = layout(screenSize, decks.length)
    return (
      <section
        ref={el => (this.element = el)}
        className="DeckContainer"
        style={styles.containerStyle}
      >
        <div className="wrapper" style={styles.wrapperStyle}>
          {decks.map((props, i) => (
            <Deck
              key={props.deckName}
              style={styles.deckStyles[i]}
              {...props}
            />
          ))}
        </div>
      </section>
    )
  }
}

export default connect(
  ({ decks, ui }) => ({
    decks,
    screenSize: ui.screenSize,
  }),
  { resize }
)(DeckContainer)
