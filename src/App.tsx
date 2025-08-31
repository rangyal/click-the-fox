import { useState } from 'react';
import { Welcome } from './screens/Welcome';
import { Play } from './screens/Play';
import { useRandomAnimalsGenerator } from './screens/Play/useRandomAnimalsGenerator';

type Screen = 'welcome' | 'game' | 'scoreboard';

const App = () => {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);
  const randomAnimalsGenerator = useRandomAnimalsGenerator();

  const handlePlay = (newName: string) => {
    setName(newName);
    setScreen('game');
  };

  const handleEnd = (score: number) => {
    setScreen('scoreboard');
    setScore(score);
  };

  return (
    <div className="min-h-screen max-h-screen p-8 flex flex-col gap-8 items-center">
      <h1 className="text-4xl font-bold">Click the Fox! Game</h1>
      <div className="grow grid w-full">
        {screen === 'welcome' && <Welcome onPlay={handlePlay} />}
        {screen === 'game' &&
          (randomAnimalsGenerator.isInitializing ? (
            <div className="flex justify-center items-center">
              Initializing&hellip;
            </div>
          ) : (
            <Play
              randomAnimalsGenerator={randomAnimalsGenerator}
              onEnd={handleEnd}
            />
          ))}
        {screen === 'scoreboard' && `${name}: ${score}`}
      </div>
    </div>
  );
};

export default App;
