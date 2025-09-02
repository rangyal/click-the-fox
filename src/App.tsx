import { useState } from 'react';
import { Welcome } from './screens/Welcome';
import { Play } from './screens/Play';
import { Scoreboard } from './screens/Scoreboard';
import { useGameScores } from './hooks/useGameScores';
import { useRandomAnimalsGenerator } from './hooks/useRandomAnimalsGenerator';
import { Button } from './components/Button';

type Screen = 'welcome' | 'game' | 'scoreboard';

const App = () => {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [name, setName] = useState('');
  const { scores, addScore } = useGameScores();
  const randomAnimalsGenerator = useRandomAnimalsGenerator();

  const handlePlay = (newName: string) => {
    setName(newName);
    setScreen('game');
  };

  const handleEnd = (score: number) => {
    setScreen('scoreboard');
    addScore({ name, score, date: new Date() });
  };

  const handleToWelcome = () => {
    setName('');
    setScreen('welcome');
  };

  const handleToGame = () => setScreen('game');

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
        {screen === 'scoreboard' && <Scoreboard scores={scores} />}
      </div>
      {screen === 'scoreboard' && (
        <div className="flex gap-4">
          <Button variant="primary" onClick={handleToWelcome}>
            To Welcome Screen
          </Button>
          <Button variant="primary" onClick={handleToGame}>
            PLAY!
          </Button>
        </div>
      )}
    </div>
  );
};

export default App;
