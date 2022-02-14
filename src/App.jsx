import React from 'react';
import Game from './Game.container';
// import LifecycleExample from './LifecycleExample';
import HigherOrderComponentExample from './HigherOrderComponentExample';
import './App.css';

export default function App() {
  return (
    <>
      <Game title="Supertrumpf" />

      {/* <LifecycleExample /> */}
      <HigherOrderComponentExample />
    </>
  );
}
