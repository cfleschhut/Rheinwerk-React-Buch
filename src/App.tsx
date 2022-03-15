import React, { Component } from 'react';
import Game from './Game';
// import LifecycleExample from './LifecycleExample';
// import HigherOrderComponentExample from './HigherOrderComponentExample';
// import RenderPropsExample from './RenderPropsExample';
// import ContextExample from './ContextExample';
// import UseStateExample from './UseStateExample';
// import UseEffectExample from './UseEffectExample';
// import UseCounterExample from './UseCounterExample';
import ErrorBoundary from './ErrorBoundary';
import DarkMode from './DarkMode';
import './App.css';

interface State {
  darkMode: boolean;
}

export default class App extends Component<unknown, State> {
  state = {
    darkMode: false,
  };

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
            <Game title="Supertrumpf" />
          </DarkMode.Provider>
        </ErrorBoundary>

        {/* <LifecycleExample /> */}
        {/* <HigherOrderComponentExample /> */}
        {/* <RenderPropsExample /> */}
        {/* <ContextExample /> */}
        {/* <UseStateExample /> */}
        {/* <UseEffectExample /> */}
        {/* <UseCounterExample /> */}
      </>
    );
  }
}
