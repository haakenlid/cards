import data from './'

test('card data to have Norwegian and English decks', () => {
  expect(data).toMatchObject({ sjansekort: { language: 'nb' } })
  expect(data).toMatchObject({ chancecards: { language: 'en' } })
})
