import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import Card from './Card';
import Animal from './Animal';
import './Game.css';

export default class Game extends Component {
  static selectRandomProperty() {
    const properties = Object.keys(Animal.properties);
    const index = Math.floor(Math.random() * properties.length);
    return properties[index];
  }

  constructor(props) {
    super(props);

    this.state = {
      computerUncovered: false,
      selectedProperty: '',
      playersTurn: true,
      player: [
        new Animal('Elefant', 'placeholder.png', 3.3, 6000, 70, 1, 40),
        new Animal('Flusspferd', 'placeholder.png', 1.5, 1800, 50, 1, 30),
      ],
      computer: [
        new Animal('Nashorn', 'placeholder.png', 1.9, 2300, 50, 1, 50),
        new Animal('Krokodil', 'placeholder.png', 5.2, 1000, 70, 60, 29),
      ],
    };
  }

  getSelectPropertyHandler() {
    return (property) => this.play(property);
  }

  compare(property) {
    let { playersTurn } = this.state;
    const { player, computer } = this.state;

    const firstPlayer = player[0];
    let playerCards = update(player, { $splice: [[0, 1]] });

    const firstComputer = computer[0];
    let computerCards = update(computer, { $splice: [[0, 1]] });

    if (firstPlayer[property] > firstComputer[property]) {
      playersTurn = true;
      playerCards = update(playerCards, {
        $push: [firstPlayer, firstComputer],
      });

      if (computerCards.length === 0) {
        alert('Player wins');
        return;
      }
    } else if (firstPlayer[property] < firstComputer[property]) {
      playersTurn = false;
      computerCards = update(computerCards, {
        $push: [firstPlayer, firstComputer],
      });

      if (playerCards.length === 0) {
        alert('Computer wins');
        return;
      }
    } else {
      playerCards = update(playerCards, { $push: [firstPlayer] });
      computerCards = update(computerCards, { $push: [firstComputer] });
    }

    this.setState(
      (state) =>
        update(state, {
          $set: {
            computerUncovered: false,
            selectedProperty: '',
            playersTurn,
            player: playerCards,
            computer: computerCards,
          },
        }),
      () => {
        if (!playersTurn) {
          setTimeout(() => {
            const randomProperty = Game.selectRandomProperty();
            this.play(randomProperty);
          }, 2000);
        }
      }
    );
  }

  play(property) {
    this.setState(
      (state) =>
        update(state, {
          selectedProperty: { $set: property },
          computerUncovered: { $set: true },
        }),
      () => {
        setTimeout(() => {
          this.compare(property);
        }, 2000);
      }
    );
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
