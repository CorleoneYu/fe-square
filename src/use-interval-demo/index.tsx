import { useInterval } from '@/use-interval-demo/use-interval';
import React, { useState } from 'react';

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  useInterval(() => setCount(count + 1), 1000);

  return <h1>{count}</h1>;
};
