import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import Card from './Card';
import Animal from './Animal';
import './Game.css';

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      computerUncovered: false,
      selectedProperty: '',
      playersTurn: true,
      player: [new Animal('Elefant', 'placeholder.png', 3.3, 6000, 70, 1, 40)],
      computer: [
        new Animal('Nashorn', 'placeholder.png', 1, 9, 2300, 50, 1, 50),
      ],
    };
  }

  getSelectPropertyHandler() {
    return (property) => {
      this.setState((state) =>
        update(state, {
          selectedProperty: { $set: property },
          computerUncovered: { $set: true },
        }),
      );
    };
  }

  render() {
    const { title } = this.props;
    const {
      playersTurn,
      player,
      computer,
      selectedProperty,
      computerUncovered,
    } = this.state;

    return (
      <div>
        <h1>{title}</h1>
        <div className="info">
          {playersTurn ? 'Du bist' : 'Der Computer ist'}
          &nbsp;an der Reihe
        </div>
        <div className="cards">
          <Card
            animal={player[0]}
            uncovered
            selectedProperty={selectedProperty}
            onSelectProperty={this.getSelectPropertyHandler()}
          />
          <Card
            animal={computer[0]}
            uncovered={computerUncovered}
            selectedProperty={selectedProperty}
          />
        </div>
      </div>
    );
  }
}

Game.defaultProps = {
  title: 'Supertrumpf',
};

Game.propTypes = {
  title: PropTypes.string,
};
