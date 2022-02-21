import React from 'react';
import useCounter from './useCounter';

export default function UseCounterExample() {
  const counter = useCounter();

  return <div>{counter}</div>;
}
