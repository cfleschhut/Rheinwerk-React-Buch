import React from 'react';
import Game from './Game.container';
// import LifecycleExample from './LifecycleExample';
// import HigherOrderComponentExample from './HigherOrderComponentExample';
import RenderPropsExample from './RenderPropsExample';
import withCards from './withCards';
import './App.css';

const GameWithCards = withCards(Game);

export default function App() {
  return (
    <>
      <GameWithCards title="Supertrumpf" />

      {/* <LifecycleExample /> */}
      {/* <HigherOrderComponentExample /> */}
      <RenderPropsExample />
    </>
  );
}
