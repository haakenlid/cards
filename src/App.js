import React from 'react'
import { Provider, connect } from 'react-redux'
import './css/style.css'
import store from './store'
import DeckContainer from './containers/DeckContainer'
import { resize } from './ducks/ui'

class AppShell extends React.Component {
  componentWillMount() {
    this.props.resizeHandler()
    window.addEventListener('resize', this.props.resizeHandler)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.props.resizeHandler)
  }
  render() {
    return (
      <section className="App">
        <DeckContainer />
      </section>
    )
  }
}

const resizeHandler = e => resize([window.innerWidth, window.innerHeight])
const ConnectedAppShell = connect(null, { resizeHandler })(AppShell)

export default () => (
  <Provider store={store}>
    <ConnectedAppShell />
  </Provider>
)
