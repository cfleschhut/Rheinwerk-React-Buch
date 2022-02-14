/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */

import React from 'react';
import PropTypes from 'prop-types';

function createClickHandler(log, onClick) {
  return () => {
    log('Logger');
    onClick();
  };
}

function Button({ log, onClick, title }) {
  return (
    <button type="button" onClick={createClickHandler(log, onClick)}>
      {title}
    </button>
  );
}

function withLogger(Comp) {
  const log = (...params) => console.log(...params);

  return (props) => <Comp log={log} {...props} />;
}

const ButtonWithLogger = withLogger(Button);

export default function HigherOrderComponentExample() {
  const handleClick = () => console.log('Click handler in parent component');

  return <ButtonWithLogger onClick={handleClick} title="Click me" />;
}

Button.propTypes = {
  log: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
