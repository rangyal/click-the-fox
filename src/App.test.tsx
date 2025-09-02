import { setupServer } from 'msw/node';
import {
  describe,
  it,
  expect,
  beforeAll,
  afterEach,
  afterAll,
  vi,
  beforeEach,
} from 'vitest';
import {
  act,
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { handlers } from './_test/mocks/handlers';
import { getTableBodyData } from './_test/test-utils';
import App from './App';
import type { Animal } from './api/types';

const server = setupServer(...handlers);

describe('App', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('Welcome screen', () => {
    it('should welcome the player', async () => {
      setupGame();
      expect(screen.getByText('Hello').textContent).toBe('Hello John');
    });
  });

  describe('Play screen', () => {
    it('should show 9 animals', async () => {
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
  });

  describe('Scoreboard screen', () => {
    // get to the scoreboard screen before each test
    beforeEach(async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2025, 8, 2, 14, 30));

      // seed the local storage with some scores
      window.localStorage.setItem(
        'game-scores',
        JSON.stringify([
          {
            name: 'Jane',
            score: 1,
            date: new Date(2025, 7, 1, 10, 30),
          },
        ])
      );

      // setup and play the game until the time is up
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
    });

    afterEach(() => {
      window.localStorage.removeItem('game-scores');
      vi.useRealTimers();
    });

    it('should be shown when the time is up', () => {
      expect(screen.getByText('SCOREBOARD')).toBeInTheDocument();
      const scoresData = getTableBodyData(screen.getByRole('table'), 1);
      expect(scoresData).toEqual([
        ['1', 'John', 'Sep 2, 2025, 02:30 PM', '2'],
        ['2', 'Jane', 'Aug 1, 2025, 10:30 AM', '1'],
      ]);
    });

    it('should redirect to the welcome screen when the `To Welcome Screen` button is clicked', () => {
      fireEvent.click(
        screen.getByRole('button', { name: 'To Welcome Screen' })
      );
      expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
    });

    it('should redirect to the game screen when the `PLAY!` button is clicked', () => {
      fireEvent.click(screen.getByRole('button', { name: 'PLAY!' }));
      expect(screen.getByRole('button', { name: 'fox' })).toBeInTheDocument();
    });
  });
});

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

const clickAnimal = (animal: Animal['type']) =>
  act(async () =>
    fireEvent.click(screen.getAllByRole('button', { name: animal })[0])
  );

const advanceSeconds = (seconds: number) =>
  act(() => vi.advanceTimersByTime(seconds * 1_000));
