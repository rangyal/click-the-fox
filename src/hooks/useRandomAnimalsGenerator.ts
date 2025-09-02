import { useCallback, useEffect, useState } from 'react';
import { getAnimals } from '../api/animals';
import type { Animal } from '../api/types';
import { BufferedAsyncGenerator } from '../utils/buffered-async-generator';
import { useOnce } from './useOnce';

type RandomAnimalsGenerator = ReturnType<typeof useRandomAnimalsGenerator>;

const useRandomAnimalsGenerator = () => {
  const animalsGenerator = useOnce(
    () => new BufferedAsyncGenerator(getRandomAnimals, 10)
  );
  const [animals, setAnimals] = useState<Animal[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const loadAnimals = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setAnimals(await animalsGenerator.next());
    } catch (error) {
      setError(error as Error);
    }
    setIsLoading(false);
  }, [animalsGenerator]);

  useEffect(() => {
    const init = async () => {
      try {
        await animalsGenerator.waitForBuffer();
        loadAnimals();
      } catch (error) {
        setError(error as Error);
      }
      setIsInitializing(false);
    };
    init();
  }, [animalsGenerator, loadAnimals]);

  return { animals, isInitializing, isLoading, loadAnimals, error };
};

const getRandomAnimals = async () => {
  const animals = await getAnimals({ cat: 4, dog: 4, fox: 1 });
  return animals.sort(() => Math.random() - 0.5);
};

export { useRandomAnimalsGenerator };
export type { RandomAnimalsGenerator };
