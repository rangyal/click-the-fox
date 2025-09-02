import { useEffect, useState } from 'react';
import { useCountdown, useTimeout } from 'usehooks-ts';
import { AnimalPicker } from './AnimalPicker';
import type { Animal } from '../../api/types';
import type { RandomAnimalsGenerator } from '../../hooks/useRandomAnimalsGenerator';

const TIME_LIMIT_IN_SECONDS = 30;
const TIME_LIMIT_IN_MS = TIME_LIMIT_IN_SECONDS * 1000;

type Props = {
  randomAnimalsGenerator: Pick<
    RandomAnimalsGenerator,
    'animals' | 'isLoading' | 'loadAnimals'
  >;
  onEnd?: (score: number) => void;
};

export const Play = ({ randomAnimalsGenerator, onEnd = () => {} }: Props) => {
  const [score, setScore] = useState(0);
  const [isEnded, setIsEnded] = useState<boolean>(false);

  const handleTimeout = () => {
    setIsEnded(true);
    onEnd(score);
  };

  useTimeout(handleTimeout, TIME_LIMIT_IN_MS);

  const handleAnimalClick = (animal: Animal) => {
    if (isEnded || randomAnimalsGenerator.isLoading) {
      return;
    }

    randomAnimalsGenerator.loadAnimals();

    const delta = animal.type === 'fox' ? 1 : -1;
    setScore(score + delta);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-evenly text-3xl">
        <div>Score: {score}</div>
        <div>
          Time left: <CountdownSeconds countStart={TIME_LIMIT_IN_SECONDS} />
        </div>
      </div>
      <div className="grow flex items-center justify-center">
        {randomAnimalsGenerator.isLoading || !randomAnimalsGenerator.animals ? (
          <>Loading&hellip;</>
        ) : (
          <AnimalPicker
            animals={randomAnimalsGenerator.animals}
            onAnimalClick={handleAnimalClick}
          />
        )}
      </div>
    </div>
  );
};

const CountdownSeconds = ({ countStart }: { countStart: number }) => {
  const [count, { startCountdown }] = useCountdown({ countStart });

  useEffect(() => {
    startCountdown();
  }, [startCountdown]);

  return count;
};
