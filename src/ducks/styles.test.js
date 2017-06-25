import { decksArt } from './styles'
import protodecks from '../card-data'

test('makes decks art stylesheet', () => {
  const stylesheet = decksArt(protodecks).join('\n')
  expect(stylesheet).toContain('sjanse-CardFront.jpg')
  expect(stylesheet).toContain('.sjansekort .CardFront')
})
