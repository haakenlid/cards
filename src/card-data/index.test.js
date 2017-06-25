import data from './'

test('card data to have Norwegian and English decks', () => {
  expect(data).toMatchObject({ sjansekort: { language: 'Norsk' } })
  expect(data).toMatchObject({ chancecards: { language: 'English' } })
})
