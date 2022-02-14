import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './Game.css';

export default function Game({
  title,
  playersTurn,
  player,
  computer,
  computerUncovered,
  selectedProperty,
  getSelectPropertyHandler,
}) {
  return (
    <div>
      <h1>{title}</h1>
      <div className="info">
        {playersTurn ? 'Du bist' : 'Der Computer ist'}
        &nbsp;an der Reihe
      </div>
      <div className="cards">
        {player[0] && (
          <Card
            animal={player[0]}
            uncovered
            selectedProperty={selectedProperty}
            onSelectProperty={getSelectPropertyHandler}
          />
        )}
        {computer[0] && (
          <Card
            animal={computer[0]}
            uncovered={computerUncovered}
            selectedProperty={selectedProperty}
          />
        )}
      </div>
    </div>
  );
}

Game.propTypes = {
  title: PropTypes.string.isRequired,
  playersTurn: PropTypes.bool.isRequired,
  player: PropTypes.arrayOf(PropTypes.object).isRequired,
  computer: PropTypes.arrayOf(PropTypes.object).isRequired,
  computerUncovered: PropTypes.bool.isRequired,
  selectedProperty: PropTypes.string.isRequired,
  getSelectPropertyHandler: PropTypes.func.isRequired,
};
