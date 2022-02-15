/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import axios from 'axios';
import Animal from './Animal';

export default function withCards(Component) {
  return class extends React.Component {
    static propTypes = {
      title: PropTypes.string.isRequired,
    };

    constructor(props) {
      super(props);

      this.state = {
        player: [],
        computer: [],
      };
    }

    async componentDidMount() {
      const { data } = await axios.get('http://localhost:3001/card');
      this.dealCards(data);
    }

    dealCards(cards) {
      const computer = [];
      const player = [];

      cards.forEach((card, index) => {
        const animal = new Animal(
          card.name,
          card.image,
          card.size,
          card.weight,
          card.age,
          card.offspring,
          card.speed
        );

        if (index % 2 === 0) {
          computer.push(animal);
        } else {
          player.push(animal);
        }
      });

      this.setState((state) =>
        update(state, {
          player: { $set: player },
          computer: { $set: computer },
        })
      );
    }

    render() {
      const { title } = this.props;
      const { player, computer } = this.state;

      return <Component title={title} player={player} computer={computer} />;
    }
  };
}
