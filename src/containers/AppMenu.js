import React from 'react'
import { connect } from 'react-redux'
import * as Icon from '../icons'
import { getShowMenu, toggleMenu } from '../ducks/ui'

const MenuItem = ({ children, ...props }) => (
  <div className="MenuItem" {...props}>{children}</div>
)

const AppMenu = ({ expanded, toggleMenu }) =>
  expanded
    ? <nav className="AppMenu">
        <MenuItem><Icon.Decks /></MenuItem>
        <MenuItem><Icon.Globe /></MenuItem>
        <MenuItem onClick={toggleMenu}><Icon.X /></MenuItem>
        <MenuItem><Icon.Edit /></MenuItem>
        <MenuItem><Icon.Book /></MenuItem>
      </nav>
    : <nav className="AppMenu">
        <MenuItem onClick={toggleMenu}><Icon.Menu /></MenuItem>
      </nav>

export default connect(state => ({ expanded: getShowMenu(state) }), {
  toggleMenu,
})(AppMenu)
