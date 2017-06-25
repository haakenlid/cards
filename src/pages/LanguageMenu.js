import React from 'react'
import { connect } from 'react-redux'
import { getLanguage, chooseLanguage } from '../ducks/ui'
import { getAvailableLanguages } from '../ducks/protodecks'
import classNames from 'classnames'

const Option = ({ onClick, active = false, children }) => (
  <div onClick={onClick} className={classNames('Option', { active })}>
    {children}
  </div>
)

const LanguageMenu = ({ activeLanguage, languages, chooseLanguage }) => (
  <div className="LanguageMenu">
    <nav>
      {languages.map(lang => (
        <Option
          key={lang}
          active={lang === activeLanguage}
          onClick={e => chooseLanguage(lang)}
        >
          {lang}
        </Option>
      ))}
    </nav>
  </div>
)

export default connect(
  state => ({
    activeLanguage: getLanguage(state),
    languages: getAvailableLanguages(state),
  }),
  { chooseLanguage }
)(LanguageMenu)
