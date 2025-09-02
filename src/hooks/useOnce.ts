import { useRef } from 'react';

const useOnce = <T>(factory: () => T) => {
  const ref = useRef<T | null>(null);
  if (ref.current === null) {
    ref.current = factory();
  }
  return ref.current;
};

export { useOnce };
