import React, { Component } from 'react';
import Game from './Game.container';
// import LifecycleExample from './LifecycleExample';
// import HigherOrderComponentExample from './HigherOrderComponentExample';
// import RenderPropsExample from './RenderPropsExample';
// import ContextExample from './ContextExample';
import UseStateExample from './UseStateExample';
import ErrorBoundary from './ErrorBoundary';
import DealCards from './DealCards';
import DarkMode from './DarkMode';

import './App.css';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      darkMode: false,
    };
  }

  toggleDarkMode = () => {
    this.setState((prevState) => ({ darkMode: !prevState.darkMode }));
  };

  render() {
    const { darkMode } = this.state;

    return (
      <>
        <ErrorBoundary>
          <DarkMode.Provider value={darkMode}>
            <button type="button" onClick={this.toggleDarkMode}>
              Toggle Dark Mode
            </button>
            <DealCards>
              {(player, computer) => (
                <Game title="Supertrumpf" player={player} computer={computer} />
              )}
            </DealCards>
          </DarkMode.Provider>
        </ErrorBoundary>

        {/* <LifecycleExample /> */}
        {/* <HigherOrderComponentExample /> */}
        {/* <RenderPropsExample /> */}
        {/* <ContextExample /> */}
        <UseStateExample />
      </>
    );
  }
}
