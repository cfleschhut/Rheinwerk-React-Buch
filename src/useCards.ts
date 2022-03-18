/* eslint no-use-before-define: ["error", { "variables": false }] */
import { useState, useEffect, useCallback } from 'react';
import update from 'immutability-helper';
import axios from 'axios';
import selectRandomProperty from './selectRandomProperty';
import Animal from './Animal';

interface Card {
  name: string;
  image: string;
  size: number;
  weight: number;
  age: number;
  offspring: number;
  speed: number;
}

interface State {
  computerUncovered: boolean;
  selectedProperty: keyof Animal | '';
  playersTurn: boolean;
  player: Animal[];
  computer: Animal[];
}

export default function useCards(): [State, (property: keyof Animal) => void] {
  const [state, setState] = useState<State>({
    computerUncovered: false,
    selectedProperty: '',
    playersTurn: true,
    player: [],
    computer: [],
  });

  const compare = (property: keyof Animal) => {
    let { playersTurn } = state;
    const { player, computer } = state;

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

    setState((prevState) =>
      update(prevState, {
        $set: {
          computerUncovered: false,
          selectedProperty: '',
          playersTurn,
          player: playerCards,
          computer: computerCards,
        },
      })
    );
  };

  const play = useCallback(
    (property: keyof Animal) => {
      setState((prevState) =>
        update(prevState, {
          selectedProperty: { $set: property },
          computerUncovered: { $set: true },
        })
      );
    },
    [setState]
  );

  const dealCards = (cards: Card[]) => {
    const computer: Animal[] = [];
    const player: Animal[] = [];

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

    setState((prevState) =>
      update(prevState, {
        player: { $set: player },
        computer: { $set: computer },
      })
    );
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('http://localhost:3001/card');
      dealCards(data);
    })();
  }, []);

  useEffect(() => {
    if (state.selectedProperty !== '') {
      setTimeout(() => {
        compare(state.selectedProperty as keyof Animal);
      }, 2000);
    }
  }, [state.selectedProperty]);

  useEffect(() => {
    if (
      state.selectedProperty === '' &&
      !state.computerUncovered &&
      !state.playersTurn
    ) {
      setTimeout(() => {
        const randomProperty = selectRandomProperty();
        play(randomProperty);
      }, 2000);
    }
  }, [state.selectedProperty, state.computerUncovered, state.playersTurn]);

  return [state, play];
}
