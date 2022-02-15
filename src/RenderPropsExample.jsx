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

const log = (...params) => console.log(...params);

function Logger({ children }) {
  return children(log);
}

export default function RenderPropsExample() {
  const handleClick = () => console.log('Click handler in parent component');

  return (
    <Logger>
      {(logFn) => <Button log={logFn} onClick={handleClick} title="Click me" />}
    </Logger>
  );
}

Button.propTypes = {
  log: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
