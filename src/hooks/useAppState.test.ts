import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAppState } from './useAppState';
import { useGameScores } from './useGameScores';

vi.mock('./useGameScores');
const mockUseGameScores = vi.mocked(useGameScores);

describe('useAppState', () => {
  const mockScores = [
    { name: 'John', score: 100, date: new Date('2025-01-01') },
    { name: 'Jane', score: 90, date: new Date('2025-01-02') },
  ];
  const mockAddScore = vi.fn();

  beforeEach(() => {
    mockUseGameScores.mockReturnValue({
      scores: mockScores,
      addScore: mockAddScore,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with welcome screen and empty name', () => {
    const { result } = renderHook(() => useAppState());

    expect(result.current.screen).toBe('welcome');
    expect(result.current.name).toBe('');
    expect(result.current.scores).toEqual(mockScores);
  });

  it('should start game with provided name', () => {
    const { result } = renderHook(() => useAppState());

    act(() => {
      result.current.startGame('John Doe');
    });

    expect(result.current.screen).toBe('game');
    expect(result.current.name).toBe('John Doe');
  });

  it('should end game and add score to scoreboard', () => {
    vi.useFakeTimers();
    const mockDate = new Date('2025-01-15T10:30:00Z');
    vi.setSystemTime(mockDate);
    const { result } = renderHook(() => useAppState());

    act(() => {
      result.current.startGame('Test Player');
    });

    act(() => {
      result.current.endGame(42);
    });

    expect(result.current.screen).toBe('scoreboard');
    expect(mockAddScore).toHaveBeenCalledTimes(1);
    expect(mockAddScore).toHaveBeenCalledWith({
      name: 'Test Player',
      score: 42,
      date: mockDate,
    });

    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should retry game from scoreboard', () => {
    const { result } = renderHook(() => useAppState());

    act(() => {
      result.current.startGame('Test Player');
    });

    act(() => {
      result.current.endGame(10);
    });

    expect(result.current.screen).toBe('scoreboard');

    act(() => {
      result.current.retryGame();
    });

    expect(result.current.screen).toBe('game');
    expect(result.current.name).toBe('Test Player');
  });

  it('should reset game to welcome screen', () => {
    const { result } = renderHook(() => useAppState());

    act(() => {
      result.current.startGame('Test Player');
    });

    act(() => {
      result.current.endGame(10);
    });

    expect(result.current.screen).toBe('scoreboard');
    expect(result.current.name).toBe('Test Player');

    act(() => {
      result.current.resetGame();
    });

    expect(result.current.screen).toBe('welcome');
    expect(result.current.name).toBe('');
  });
});
