import React from 'react';
import Card from './Card';
import './Game.css';
import useCards from './useCards';

interface Props {
  title: string;
}

export default function Game({ title }: Props) {
  const [state, play] = useCards();

  return (
    <>
      <h1>{title}</h1>
      <div className="info">
        {state.playersTurn ? 'Du bist' : 'Der Computer ist'}
        &nbsp;an der Reihe
      </div>

      <div className="cards">
        {state.player[0] && (
          <Card
            animal={state.player[0]}
            uncovered
            selectedProperty={state.selectedProperty}
            onSelectProperty={play}
          />
        )}
        {state.computer[0] && (
          <Card
            animal={state.computer[0]}
            uncovered={state.computerUncovered}
            selectedProperty={state.selectedProperty}
            onSelectProperty={() => {}}
          />
        )}
      </div>
    </>
  );
}
