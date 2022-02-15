/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import GameComponent from './Game';
import Animal from './Animal';

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
      player: [],
      computer: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { player: playerCards, computer: computerCards } = this.props;

    if (
      prevProps.player.length === 0 &&
      playerCards.length > 0 &&
      prevProps.computer.length === 0 &&
      computerCards.length > 0
    ) {
      this.setState((state) =>
        update(state, {
          player: { $set: playerCards },
          computer: { $set: computerCards },
        })
      );
    }
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
      player,
      computer,
      playersTurn,
      selectedProperty,
      computerUncovered,
    } = this.state;

    return (
      <GameComponent
        title={title}
        playersTurn={playersTurn}
        player={player}
        computer={computer}
        selectedProperty={selectedProperty}
        computerUncovered={computerUncovered}
        getSelectPropertyHandler={this.getSelectPropertyHandler()}
      />
    );
  }
}

Game.defaultProps = {
  title: 'Supertrumpf',
};

Game.propTypes = {
  title: PropTypes.string,
  player: PropTypes.arrayOf(PropTypes.object).isRequired,
  computer: PropTypes.arrayOf(PropTypes.object).isRequired,
};
