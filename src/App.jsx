import React, { Component } from 'react';
import Game from './Game.container';
// import LifecycleExample from './LifecycleExample';
// import HigherOrderComponentExample from './HigherOrderComponentExample';
// import RenderPropsExample from './RenderPropsExample';
import DealCards from './DealCards';
import './App.css';

class ErrorBoundary extends Component {
  constructor() {
    super();

    this.state = {
      error: null,
    };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  static getDerivedStateFromError(error) {
    return {
      error: error.message,
    };
  }

  render() {
    const { error } = this.state;

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <DealCards>
        {(player, computer) => (
          <Game title="Supertrumpf" player={player} computer={computer} />
        )}
      </DealCards>
    );
  }
}

export default function App() {
  return (
    <>
      <ErrorBoundary />

      {/* <LifecycleExample /> */}
      {/* <HigherOrderComponentExample /> */}
      {/* <RenderPropsExample /> */}
    </>
  );
}
