import { decksArt } from './styles'
import protodecks from '../card-data'

test('makes decks art stylesheet', () => {
  const stylesheet = decksArt(protodecks)
  expect(stylesheet).toContain('sjanse-CardFront.jpg')
  expect(stylesheet).toContain('.sjansekort .CardFront')
})
