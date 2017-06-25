import {
  getProtodecks,
  getAvailableLanguages,
  getProtodecksByLanguage,
} from './protodecks'
import protodecks from '../card-data'
import R from 'ramda'

const state = { protodecks }

test('four decks', () => {
  const decks = getProtodecks(state)
  expect(Object.keys(decks)).toHaveLength(4)
})

test('languages', () => {
  const languages = getAvailableLanguages(state)
  expect(languages).toEqual(['English', 'Norsk'])
})

test('languages', () => {
  const lang = 'Norsk'
  const decks = getProtodecksByLanguage(state, lang)
  const languages = R.pipe(R.pluck('language'), R.values)(decks)
  expect(Object.keys(decks)).toHaveLength(2)
  expect(languages).toEqual([lang, lang])
})
