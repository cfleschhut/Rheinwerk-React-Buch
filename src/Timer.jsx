import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Timer extends Component {
  interval = null;

  constructor(props) {
    super(props);
    console.log('Constructor', props);

    this.state = {
      initial: 0,
      time: 0,
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps', props, state);

    if (props.time !== state.initial) {
      return {
        initial: props.time,
        time: props.time,
      };
    }

    return null;
  }

  componentDidMount() {
    console.log('componentDidMount');

    this.interval = setInterval(
      () =>
        this.setState((state) => ({
          time: state.time + 1,
        })),
      1000
    );
  }

  shouldComponentUpdate(newProps, newState) {
    console.log('shouldComponentUpdate', newProps, newState);

    return newState.time % 2 === 0;
  }

  getSnapshotBeforeUpdate(oldProps, oldState) {
    console.log('getSnapshotBeforeUpdate', oldProps, oldState);

    return Date.now();
  }

  componentDidUpdate(oldProps, oldState, snapshot) {
    console.log('componentDidUpdate', oldProps, oldState, snapshot);
    const { initial } = this.state;

    if (oldState.initial !== initial) {
      console.log(`${snapshot}: Zeit wurde zurückgesetzt`);
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');

    clearInterval(this.interval);
  }

  render() {
    console.log('render');

    const { time } = this.state;
    // const { time } = this.props;

    return <div>{time}</div>;
  }
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
};
