import React, { Component } from 'react';
import Timer from './Timer';

export default class LifecycleExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 0,
      show: true,
    };
  }

  getClickHandler() {
    return () => {
      this.setState({
        time: Math.floor(Math.random() * 10),
      });
    };
  }

  getToggleShowHandler() {
    return () =>
      this.setState((state) => ({
        ...state,
        show: !state.show,
      }));
  }

  render() {
    const { time, show } = this.state;

    return (
      <div>
        {show && <Timer time={time} />}

        <button type="button" onClick={this.getClickHandler()}>
          set
        </button>
        <button type="button" onClick={this.getToggleShowHandler()}>
          toggle
        </button>
      </div>
    );
  }
}
