import React, { useState } from 'react';

export default function UseStateExample() {
  const [counter, setCounter] = useState(0);
  const incrementCounter = () => setCounter(counter + 1);

  return (
    <>
      <div>{counter}</div>
      <button type="button" onClick={incrementCounter}>
        increment
      </button>
    </>
  );
}
