import { setupServer } from 'msw/node';
import {
  describe,
  it,
  expect,
  beforeAll,
  afterEach,
  afterAll,
  vi,
} from 'vitest';
import {
  act,
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { handlers } from './_test/mocks/handlers';
import App from './App';
import type { Animal } from './api/types';

const server = setupServer(...handlers);

const setupGame = () => {
  render(<App />);
  fireEvent.input(screen.getByRole('textbox', { name: 'Name' }), {
    target: { value: 'John' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'PLAY!' }));
};

const play = async () => {
  fireEvent.click(screen.getByRole('button', { name: 'PLAY!' }));
  await waitForElementToBeRemoved(() => screen.queryByText('Initializing…'));
};

describe('App', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should welcome the player', async () => {
    setupGame();
    expect(screen.getByText('Hello').textContent).toBe('Hello John');
  });

  it('should show 9 animals on the play screen', async () => {
    setupGame();
    await play();
    expect(screen.getByRole('button', { name: 'fox' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'dog' })).toHaveLength(4);
    expect(screen.getAllByRole('button', { name: 'cat' })).toHaveLength(4);
  });

  it('should load new animals when an animal is clicked', async () => {
    const getSortedAnimalImageUrls = () =>
      screen
        .getAllByRole('img')
        .map((img) => img.getAttribute('src'))
        .sort();

    setupGame();
    await play();
    const imageUrlsBeforeClick = getSortedAnimalImageUrls();
    await clickAnimal('fox');
    const animalUrlsAfterClick = getSortedAnimalImageUrls();

    expect(imageUrlsBeforeClick).toHaveLength(9);
    expect(animalUrlsAfterClick).toHaveLength(9);
    expect(animalUrlsAfterClick).not.toEqual(imageUrlsBeforeClick);
  });

  it('should direct to the scoreboard screen when the time is up', async () => {
    vi.useFakeTimers();
    setupGame();
    await act(async () =>
      fireEvent.click(screen.getByRole('button', { name: 'PLAY!' }))
    );
    await act(async () => await vi.runOnlyPendingTimersAsync());
    const totalDelay = await clickAnimals([
      ['fox', 5],
      ['dog', 2],
      ['cat', 1],
    ]);
    await advanceSeconds(30 - totalDelay);
    expect(screen.getByText('John: 2')).toBeInTheDocument();
    vi.useRealTimers();
  });
});

const clickAnimal = (animal: Animal['type']) =>
  act(async () =>
    fireEvent.click(screen.getAllByRole('button', { name: animal })[0])
  );

/**
 * Click multiple animals.
 * Each animal is clicked with a delay between each click if the timers are fake.
 * @param animals - An array of animal types and the number of times to click each
 * @returns The total delay in seconds
 */
const clickAnimals = async (animals: [Animal['type'], number][]) => {
  const delay = vi.isFakeTimers() ? 1 : 0;
  let sum = 0;
  for (const [animal, count] of animals) {
    for (let i = 0; i < count; i++) {
      if (delay) await advanceSeconds(delay);
      await clickAnimal(animal);
    }
    sum += delay * count;
  }
  return sum;
};

const advanceSeconds = (seconds: number) =>
  act(() => vi.advanceTimersByTime(seconds * 1_000));
