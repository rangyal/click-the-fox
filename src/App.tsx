import { useState } from 'react';
import { Welcome } from './screens/Welcome';

type Screen = 'welcome' | 'game' | 'scoreboard';

const App = () => {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [name, setName] = useState('');

  const handlePlay = (newName: string) => {
    setName(newName);
    setScreen('game');
  };

  return (
    <div className="min-h-screen p-8 flex flex-col gap-8 items-center">
      <h1 className="text-4xl font-bold">Click the Fox! Game</h1>
      <div className="grow w-full grid">
        {screen === 'welcome' && <Welcome onPlay={handlePlay} />}
        {screen === 'game' && 'Game'}
        {screen === 'scoreboard' && 'Scoreboard'}
      </div>
    </div>
  );
};

export default App;
