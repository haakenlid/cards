import React from 'react'
import * as Icon from '../icons'

const MenuItem = ({ children }) => <div className="MenuItem">{children}</div>

const AppMenu = ({}) => (
  <nav className="AppMenu">
    <MenuItem><Icon.Decks /></MenuItem>
    <MenuItem><Icon.Globe /></MenuItem>
    <MenuItem><Icon.X /></MenuItem>
    <MenuItem><Icon.Edit /></MenuItem>
    <MenuItem><Icon.Book /></MenuItem>
  </nav>
)

export default AppMenu
