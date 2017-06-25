import React from 'react'
import { connect } from 'react-redux'
import * as Icons from '../icons'
import { getShowMenu, toggleMenu } from '../ducks/ui'

const MenuItem = ({ icon, collapsedIcon, onClick, expanded }) => {
  const Icon = expanded ? Icons[icon] : Icons[collapsedIcon]
  if (Icon === undefined) return null
  return <div className="MenuItem" onClick={onClick}><Icon title={icon} /></div>
}

const AppMenu = ({ expanded, toggleMenu }) => {
  const buttons = [
    {
      icon: 'Decks',
      onClick: e => console.log('decks'),
    },
    {
      icon: 'Moon',
      onClick: e => console.log('moon'),
    },
    {
      icon: 'X',
      collapsedIcon: 'Menu',
      onClick: toggleMenu,
    },
    {
      icon: 'Cog',
      onClick: e => console.log('cog'),
    },
    {
      icon: 'Book',
      onClick: e => console.log('books'),
    },
  ]
  return (
    <nav className="AppMenu">
      {buttons.map((button, key) => (
        <MenuItem {...{ expanded, key, ...button }} />
      ))}
    </nav>
  )
}

export default connect(state => ({ expanded: getShowMenu(state) }), {
  toggleMenu,
})(AppMenu)
