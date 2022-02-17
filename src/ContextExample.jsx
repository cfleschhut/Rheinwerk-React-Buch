import React, { Component, createContext } from 'react';

const Context = createContext(0);

function Counter() {
  return (
    <Context.Consumer>
      {(value) => <div>Counter: {value}</div>}
    </Context.Consumer>
  );
}

export default class ContextExample extends Component {
  constructor() {
    super();

    this.state = {
      counter: 0,
    };
  }

  incrementCounter = () => {
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
    }));
  };

  render() {
    const { counter } = this.state;

    return (
      <Context.Provider value={counter}>
        <Counter />
        <button type="button" onClick={this.incrementCounter}>
          increment
        </button>
      </Context.Provider>
    );
  }
}
