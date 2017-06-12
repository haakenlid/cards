import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import classNames from 'classnames'
import './css/style.css'
import { flipCard, resize } from './actions'
import store from './store'

const CardFront = ({ title, text }) => (
  <div className="CardFront">
    <div className="card-content">
      <h2 className="card-title">
        {title}
      </h2>
      <div className="card-text">
        {text}
      </div>
    </div>
  </div>
)

const CardBack = () => <div className="CardBack" />

const Card = ({ title, text, flip = false, ...props }) => (
  <div className={classNames('Card', { flip })} {...props}>
    <CardFront title={title} text={text} />
    <CardBack />
  </div>
)

const Deck = ({ name, cards, flipCard, ...props }) => (
  <div className={classNames('Deck', name)} {...props}>
    <Card onClick={e => flipCard(name)} {...cards[0]} />
  </div>
)
const DeckContainer = connect(null, { flipCard })(Deck)

class Root extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.props.resizeHandler)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.props.resizeHandler)
  }
  componentWillMount() {
    this.props.resizeHandler()
  }
  render() {
    const { decks = [], ui } = this.props
    const ratio = 0.71
    const vertical = decks.length * ratio
    const horizontal = 1
    const width = ui.screenSize[0] / horizontal
    const height = ui.screenSize[1] / vertical
    const fontSize = width < height ? `0.95vw` : `${0.95 / vertical}vh`
    const deckStyle = { width: '100em', height: `${100 * ratio}em` }
    console.log(width, height)
    return (
      <div className="App">
        <div className="deck-wrapper" style={{ fontSize }}>
          {decks.map(props => (
            <DeckContainer key={props.name} style={deckStyle} {...props} />
          ))}
        </div>
      </div>
    )
  }
}
Root = connect(
  state => state,
  dispatch => ({
    resizeHandler: e => {
      console.log(e)
      dispatch(resize([window.innerWidth, window.innerHeight]))
    },
  })
)(Root)

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
)

export default App
