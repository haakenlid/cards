import { getProtodecks } from './protodecks'
import { getDecks } from './decks'
import { getScreenSize } from './ui'
import R from 'ramda'

const SHRINK = 0.8
const CARDRATIO = 0.71
const SCREENSIZE = [360, 640]

// protodeck -> [stylesheet]
const cardArt = ({ front = 'front.jpg', back = 'back.jpg' }, deck) => [
  `.${deck} .CardFront { background-image: url("assets/${front}");}`,
  `.${deck} .CardBack { background-image: url("assets/${back}");}`,
]

// protodecks -> stylesheet
export const decksArt = R.pipe(
  R.mapObjIndexed(cardArt), // build styles
  R.values // object -> array
)

const getFontSize = (screenWidth, screenHeight, cardRatio) =>
  screenWidth < screenHeight / cardRatio
    ? screenWidth / 10
    : screenHeight / 10 / cardRatio

export const decksPosition = (screenSize = SCREENSIZE, decksLen, cardRatio) => {
  const [screenWidth, screenHeight] = screenSize
  const columnLayout =
    screenWidth / decksLen < screenHeight / decksLen / cardRatio
  const initialSize = columnLayout
    ? screenHeight / (screenWidth * cardRatio * decksLen)
    : screenWidth * cardRatio / (screenHeight * decksLen)
  const deckStyles = calculateCardStyles(decksLen, initialSize, columnLayout)
  const fontSize = getFontSize(screenWidth, screenHeight, cardRatio)
  return [
    ...deckStyles,
    `.wrapper { font-size: ${fontSize}px; }`,
    `.wrapper { width: 9.5em; height: ${9.5 * cardRatio}em; }`,
  ]
}

const calculateCardStyles = (
  decksLen,
  baseSize,
  columnLayout,
  shrink = SHRINK
) => {
  const arr = []
  //if (decksLen === 0) arr[0] = `.Deck { transform: translate(0, -200%) }`
  const scale = shrink * Math.min(1, baseSize)
  for (let i = 0; i < decksLen; i++) {
    const offset = (i - (decksLen - 1) / 2) * baseSize
    let translate = ['0', `${offset * 100}%`]
    if (!columnLayout) translate = translate.reverse()
    arr.push(
      `.Deck:nth-of-type(${i + 1}) .Card{ transform: translate(${translate.join(', ')}) scale(${scale}) }`
    )
  }
  return arr
}

const joinStyles = R.pipe(R.flatten, R.join('\n'))

export const getStyleSheet = state => {
  const protodecks = getProtodecks(state)
  const deckLength = getDecks(state).length
  const screenSize = getScreenSize(state)
  return joinStyles([
    decksArt(protodecks),
    decksPosition(screenSize, deckLength, CARDRATIO),
  ])
}
