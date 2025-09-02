import { describe, it, expect, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGameScores } from './useGameScores';

describe('useGameScores', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty scores array', () => {
    const { result } = renderHook(() => useGameScores());

    expect(result.current.scores).toEqual([]);
  });

  it('should return existing scores from localStorage', () => {
    const existingScores = [
      { name: 'John', score: 100, date: new Date('2025-01-01') },
      { name: 'Jane', score: 90, date: new Date('2025-01-02') },
    ];

    localStorage.setItem('game-scores', JSON.stringify(existingScores));

    const { result } = renderHook(() => useGameScores());

    expect(result.current.scores).toEqual(existingScores);
  });

  it('should add new score and sort by score descending', () => {
    const initialScores = [
      { name: 'John', score: 100, date: new Date('2025-01-01') },
      { name: 'Jane', score: 90, date: new Date('2025-01-02') },
    ];

    localStorage.setItem('game-scores', JSON.stringify(initialScores));

    const { result } = renderHook(() => useGameScores());

    const newScore = {
      name: 'Bob',
      score: 95,
      date: new Date('2025-01-03'),
    };

    act(() => {
      result.current.addScore(newScore);
    });

    expect(result.current.scores).toEqual([
      { name: 'John', score: 100, date: new Date('2025-01-01') },
      { name: 'Bob', score: 95, date: new Date('2025-01-03') },
      { name: 'Jane', score: 90, date: new Date('2025-01-02') },
    ]);

    const storedData = JSON.parse(localStorage.getItem('game-scores') || '[]');
    expect(storedData).toHaveLength(3);
    expect(storedData[1].name).toBe('Bob');
  });

  it('should handle adding score to empty array', () => {
    const { result } = renderHook(() => useGameScores());

    const newScore = {
      name: 'First Player',
      score: 50,
      date: new Date('2025-01-01'),
    };

    act(() => {
      result.current.addScore(newScore);
    });

    expect(result.current.scores).toEqual([newScore]);
    expect(localStorage.getItem('game-scores')).toBe(
      JSON.stringify([newScore])
    );
  });

  it('should maintain correct order when adding highest score', () => {
    const initialScores = [
      { name: 'John', score: 100, date: new Date('2025-01-01') },
      { name: 'Jane', score: 90, date: new Date('2025-01-02') },
    ];

    localStorage.setItem('game-scores', JSON.stringify(initialScores));

    const { result } = renderHook(() => useGameScores());

    const newScore = {
      name: 'Champion',
      score: 150,
      date: new Date('2025-01-03'),
    };

    act(() => {
      result.current.addScore(newScore);
    });

    expect(result.current.scores).toEqual([
      { name: 'Champion', score: 150, date: new Date('2025-01-03') },
      { name: 'John', score: 100, date: new Date('2025-01-01') },
      { name: 'Jane', score: 90, date: new Date('2025-01-02') },
    ]);
  });

  it('should maintain correct order when adding lowest score', () => {
    const initialScores = [
      { name: 'John', score: 100, date: new Date('2025-01-01') },
      { name: 'Jane', score: 90, date: new Date('2025-01-02') },
    ];

    localStorage.setItem('game-scores', JSON.stringify(initialScores));

    const { result } = renderHook(() => useGameScores());

    const newScore = {
      name: 'Newbie',
      score: 50,
      date: new Date('2025-01-03'),
    };

    act(() => {
      result.current.addScore(newScore);
    });

    expect(result.current.scores).toEqual([
      { name: 'John', score: 100, date: new Date('2025-01-01') },
      { name: 'Jane', score: 90, date: new Date('2025-01-02') },
      { name: 'Newbie', score: 50, date: new Date('2025-01-03') },
    ]);
  });

  it('should handle multiple addScore calls correctly', () => {
    const { result } = renderHook(() => useGameScores());

    const scores = [
      { name: 'Player1', score: 80, date: new Date('2025-01-01') },
      { name: 'Player2', score: 120, date: new Date('2025-01-02') },
      { name: 'Player3', score: 60, date: new Date('2025-01-03') },
    ];

    act(() => {
      result.current.addScore(scores[0]);
    });

    act(() => {
      result.current.addScore(scores[1]);
    });

    act(() => {
      result.current.addScore(scores[2]);
    });

    expect(result.current.scores).toEqual([
      { name: 'Player2', score: 120, date: new Date('2025-01-02') },
      { name: 'Player1', score: 80, date: new Date('2025-01-01') },
      { name: 'Player3', score: 60, date: new Date('2025-01-03') },
    ]);
  });
});
