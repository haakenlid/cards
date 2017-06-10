import React, { Component } from 'react'
import './App.css'
import './css/cards.css'
import './css/style.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <div className="deck sjansekort">
            <div className="card">
              <div className="front">
                <div className="pad">
                  <h2 className="card-title">
                    Sjansekort
                  </h2>
                  <div className="card-text" />
                </div>
              </div>
              <div className="back" />
            </div>
            <svg className="spacer" viewBox="0 0 1000 710" />
          </div>
        </div>
      </div>
    )
  }
}

export default App
