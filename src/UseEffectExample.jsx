import React, { useState, useEffect } from 'react';

export default function UseEffectExample() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevState) => prevState + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>{counter}</div>;
}
