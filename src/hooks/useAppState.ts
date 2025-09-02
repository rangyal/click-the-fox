import { useState } from 'react';
import { useGameScores } from './useGameScores';

type Screen = 'welcome' | 'game' | 'scoreboard';

export const useAppState = () => {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [name, setName] = useState('');
  const { scores, addScore } = useGameScores();

  const startGame = (newName: string) => {
    setName(newName);
    setScreen('game');
  };

  const endGame = (score: number) => {
    setScreen('scoreboard');
    addScore({ name, score, date: new Date() });
  };

  const retryGame = () => setScreen('game');

  const resetGame = () => {
    setName('');
    setScreen('welcome');
  };

  return {
    screen,
    name,
    scores,
    startGame,
    endGame,
    retryGame,
    resetGame,
  };
};

export type { Screen };
