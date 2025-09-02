import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Play } from './Play';
import type { Animal } from '../../api/types';
import type { ComponentPropsWithoutRef } from 'react';

const animals: Animal[] = [
  { type: 'dog', image: 'dog.jpg' },
  { type: 'fox', image: 'fox.jpg' },
  { type: 'cat', image: 'cat.jpg' },
];

const setup = (props: Partial<ComponentPropsWithoutRef<typeof Play>> = {}) => {
  return render(
    <Play
      randomAnimalsGenerator={{
        animals,
        isLoading: false,
        loadAnimals: async () => {},
      }}
      {...props}
    />
  );
};

const clickAnimal = (animal: Animal['type']) => {
  fireEvent.click(screen.getByRole('button', { name: animal }));
};

describe('Play', () => {
  it('should display loading message', () => {
    render(
      <Play
        randomAnimalsGenerator={{
          animals: null,
          isLoading: true,
          loadAnimals: async () => {},
        }}
      />
    );
    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  it('should display animals when loading is finished', () => {
    setup();
    expect(screen.getByRole('button', { name: 'cat' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'dog' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'fox' })).toBeInTheDocument();
  });

  it('should call `loadAnimals` when an animal is clicked', async () => {
    const loadAnimals = vi.fn();
    render(
      <Play
        randomAnimalsGenerator={{
          animals,
          isLoading: false,
          loadAnimals,
        }}
      />
    );
    await userEvent.click(screen.getByAltText('dog'));
    expect(loadAnimals).toHaveBeenCalled();
  });

  it('should increment the score when a fox is clicked', async () => {
    setup();
    clickAnimal('fox');
    expect(screen.getByText(/^Score: 1$/)).toBeInTheDocument();
    clickAnimal('fox');
    expect(screen.getByText(/^Score: 2$/)).toBeInTheDocument();
  });

  it('should decrement the score when a cat is clicked', async () => {
    setup();
    clickAnimal('cat');
    expect(screen.getByText(/^Score: -1$/)).toBeInTheDocument();
    clickAnimal('dog');
    expect(screen.getByText(/^Score: -2$/)).toBeInTheDocument();
  });

  it('should call `onEnd` with the score when the time is up', async () => {
    vi.useFakeTimers();

    const onEnd = vi.fn();
    setup({ onEnd });
    const animalsToClick: Animal['type'][] = ['cat', 'fox', 'fox'];
    animalsToClick.forEach(clickAnimal);

    act(() => vi.advanceTimersByTime(29_000));
    expect(onEnd).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1_000));
    expect(onEnd).toHaveBeenCalledTimes(1);
    expect(onEnd).toHaveBeenCalledWith(1);

    vi.useRealTimers();
  });

  it('should display the time left', () => {
    vi.useFakeTimers();

    setup();
    expect(screen.getByText(/^Time left: 30$/)).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1_000));
    expect(screen.getByText(/^Time left: 29$/)).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(29_000));
    expect(screen.getByText(/^Time left: 0$/)).toBeInTheDocument();

    vi.useRealTimers();
  });
});
