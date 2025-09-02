import { useEffect, useRef, useState } from 'react';
import { getAnimals } from '../api/animals';
import type { Animal } from '../api/types';
import { BufferedAsyncGenerator } from '../utils/buffered-async-generator';

type RandomAnimalsGenerator = ReturnType<typeof useRandomAnimalsGenerator>;

const useRandomAnimalsGenerator = () => {
  const animalsGeneratorRef = useRef<BufferedAsyncGenerator<Animal[]> | null>(
    null
  );
  if (!animalsGeneratorRef.current)
    animalsGeneratorRef.current = new BufferedAsyncGenerator(
      getRandomAnimals,
      10
    );
  const [animals, setAnimals] = useState<Animal[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const getAnimalsGenerator = () => {
    if (!animalsGeneratorRef.current)
      throw new Error('Animals generator not initialized');
    return animalsGeneratorRef.current;
  };

  const loadAnimals = async () => {
    setIsLoading(true);
    setError(null);
    try {
      setAnimals(await getAnimalsGenerator().next());
    } catch (error) {
      setError(error as Error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      try {
        await getAnimalsGenerator().waitForBuffer();
        loadAnimals();
      } catch (error) {
        setError(error as Error);
      }
      setIsInitializing(false);
    };
    init();
  }, []);

  return { animals, isInitializing, isLoading, loadAnimals, error };
};

const getRandomAnimals = async () => {
  const animals = await getAnimals({ cat: 4, dog: 4, fox: 1 });
  return animals.sort(() => Math.random() - 0.5);
};

export { useRandomAnimalsGenerator };
export type { RandomAnimalsGenerator };
