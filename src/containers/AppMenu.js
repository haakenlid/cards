import React from 'react'

const MenuItem = ({ children }) => <div className="MenuItem">{children}</div>

const AppMenu = ({}) => (
  <nav className="AppMenu">
    <MenuItem>A</MenuItem>
    <MenuItem>B</MenuItem>
    <MenuItem>C</MenuItem>
    <MenuItem>D</MenuItem>
    <MenuItem>E</MenuItem>
  </nav>
)

export default AppMenu
