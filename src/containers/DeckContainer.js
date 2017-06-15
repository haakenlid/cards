import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Card from '../components/Card'
import { flipCard, discardCard, shuffleDeck } from '../ducks/decks'
import { resize } from '../ducks/ui'

let Deck = ({
  style,
  deckName,
  cards,
  topCard,
  shuffle,
  discard,
  flip,
  ...props
}) => {
  const renderCard = ({ status, deckName, ...props }, index) => (
    <Card
      discarded={index < topCard}
      top={index == topCard}
      flip={status === 1}
      onClick={[flip, discard, null][status]}
      key={index}
      style={style}
      {...props}
    />
  )
  return (
    <div className={classNames('Deck', deckName)} {...props}>
      <div className="Card reshuffle" style={style} onClick={shuffle} />
      {cards
        .map(renderCard)
        .slice(Math.max(0, topCard - 1), topCard + 2)
        .reverse()}
    </div>
  )
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

const layout = (screenSize, decksLen = 1, cardRatio = 0.71) => {
  const [screenWidth, screenHeight] = screenSize || [100, 100]
  const fontSize = screenWidth < screenHeight / cardRatio
    ? `${screenWidth / 10}px`
    : `${screenHeight / 10 / cardRatio}px`
  const deckStyles = []
  if (screenWidth < screenHeight * decksLen * cardRatio) {
    // column
    const scale = screenHeight / (screenWidth * cardRatio * decksLen)
    for (let i = 0; i < decksLen; i++) {
      const offset = (i - (decksLen - 1) / 2) * scale * 100
      deckStyles.push({
        transform: `translate(0, ${offset}%) scale(${Math.min(0.8, scale)}`,
      })
    }
  } else {
    // row
    const scale = screenWidth * cardRatio / (screenHeight * decksLen)
    for (let i = 0; i < decksLen; i++) {
      const offset = (i - (decksLen - 1) / 2) * scale * 100
      deckStyles.push({
        transform: `translate(${offset}%, 0) scale(${Math.min(0.8, scale)}`,
      })
    }
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
    console.log(this.element)
    this.props.resize([this.element.clientWidth, this.element.clientHeight])
  }
  render() {
    console.log('render', this.props)
    const { decks, screenSize } = this.props
    if (decks.length === 0) return <NoDecks />
    const styles = layout(screenSize, decks.length)
    console.log(styles)
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
