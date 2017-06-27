import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { resize } from '../ducks/ui'
import { getStyleSheet } from '../ducks/styles'

class Head extends React.Component {
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }
  componentWillMount() {
    window.addEventListener('resize', this.resize)
    this.resize()
  }
  resize = () => {
    this.props.resize(window.innerWidth, window.innerHeight)
  }
  render() {
    return (
      <Helmet>
        <title>Draw A Card</title>
        <style>{this.props.styles}</style>
      </Helmet>
    )
  }
}
const mapStateToProps = state => ({
  styles: getStyleSheet(state),
})
const mapDispatchToProps = { resize }

export default connect(mapStateToProps, mapDispatchToProps)(Head)
