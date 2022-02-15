import React from 'react';
import Game from './Game.container';
// import LifecycleExample from './LifecycleExample';
// import HigherOrderComponentExample from './HigherOrderComponentExample';
// import RenderPropsExample from './RenderPropsExample';
import DealCards from './DealCards';
import './App.css';

export default function App() {
  return (
    <>
      <DealCards>
        {(player, computer) => (
          <Game title="Supertrumpf" player={player} computer={computer} />
        )}
      </DealCards>

      {/* <LifecycleExample /> */}
      {/* <HigherOrderComponentExample /> */}
      {/* <RenderPropsExample /> */}
    </>
  );
}
