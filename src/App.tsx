import { Welcome } from './screens/Welcome';
import { Play } from './screens/Play';
import { Scoreboard } from './screens/Scoreboard';
import { ErrorScreen } from './screens/ErrorScreen';
import { useAppState, useRandomAnimalsGenerator } from './hooks';
import { Button } from './components';

const App = () => {
  const { screen, scores, startGame, endGame, retryGame, resetGame } =
    useAppState();
  const randomAnimalsGenerator = useRandomAnimalsGenerator();

  if (randomAnimalsGenerator.error) return <ErrorScreen />;

  return (
    <div className="min-h-screen max-h-screen p-8 flex flex-col gap-8 items-center">
      <h1 className="text-4xl font-bold">Click the Fox! Game</h1>
      <div className="grow grid w-full">
        {screen === 'welcome' && <Welcome onPlay={startGame} />}
        {screen === 'game' &&
          (randomAnimalsGenerator.isInitializing ? (
            <div className="flex justify-center items-center">
              Initializing&hellip;
            </div>
          ) : (
            <Play
              randomAnimalsGenerator={randomAnimalsGenerator}
              onEnd={endGame}
            />
          ))}
        {screen === 'scoreboard' && <Scoreboard scores={scores} />}
      </div>
      {screen === 'scoreboard' && (
        <div className="flex gap-4">
          <Button variant="primary" onClick={resetGame}>
            To Welcome Screen
          </Button>
          <Button variant="primary" onClick={retryGame}>
            PLAY!
          </Button>
        </div>
      )}
    </div>
  );
};

export default App;
