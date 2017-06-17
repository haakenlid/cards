import { makeStyleSheet } from './Head'
import protodecks from '../card-data'

test('makes stylesheet', () => {
  const stylesheet = makeStyleSheet(protodecks)
  expect(stylesheet).toContain('sjanse-CardFront.jpg')
  expect(stylesheet).toContain('.sjansekort .CardFront')
})
