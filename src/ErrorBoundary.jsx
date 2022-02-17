import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component {
  constructor() {
    super();

    this.state = {
      error: null,
    };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  static getDerivedStateFromError(error) {
    return {
      error: error.message,
    };
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    if (error) {
      return <div>{error}</div>;
    }

    return <div>{children}</div>;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
};
