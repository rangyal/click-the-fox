import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Welcome } from './Welcome';
import type { ComponentProps } from 'react';

const getNameInput = () => screen.getByRole('textbox', { name: 'Name' });
const getPlayButton = () => screen.getByRole('button', { name: 'PLAY!' });

describe('Welcome', () => {
  describe('Form screen', () => {
    it('should render the welcome form initially', () => {
      render(<Welcome onPlay={() => {}} />);
      expect(getNameInput()).toBeInTheDocument();
      expect(getPlayButton()).toBeDisabled();
    });

    it('should have the submit button disabled when the name contains whitespaces only', async () => {
      render(<Welcome onPlay={() => {}} />);
      await userEvent.type(getNameInput(), '   ');
      expect(getPlayButton()).toBeDisabled();
    });

    it('should have the submit button enabled when the name is valid', async () => {
      render(<Welcome onPlay={() => {}} />);
      await userEvent.type(getNameInput(), 'John');
      expect(getPlayButton()).toBeEnabled();
    });
  });

  describe('Hello screen', () => {
    const setupHelloScreen = async (
      props?: Partial<ComponentProps<typeof Welcome>>
    ) => {
      render(<Welcome onPlay={() => {}} {...props} />);
      await userEvent.type(getNameInput(), 'John');
      await userEvent.click(getPlayButton());
    };

    it('should render the hello message', async () => {
      await setupHelloScreen();
      const helloEl = screen.getByText('Hello');
      expect(helloEl.textContent).toBe('Hello John');
    });

    it('should render the form state if the name is clicked', async () => {
      await setupHelloScreen();
      await userEvent.click(screen.getByRole('button', { name: /John/ }));
      expect(getNameInput()).toHaveValue('John');
    });

    it('should call the onPlay function with the name when the PLAY! button is clicked', async () => {
      const onPlayMock = vi.fn();
      await setupHelloScreen({ onPlay: onPlayMock });
      await userEvent.click(getPlayButton());
      expect(onPlayMock).toHaveBeenCalledWith('John');
    });

    it('should call the onPlay function with the trimmed name when the PLAY! button is clicked', async () => {
      const onPlayMock = vi.fn();
      render(<Welcome onPlay={onPlayMock} />);
      await userEvent.type(getNameInput(), '  John  ');
      await userEvent.click(getPlayButton());
      await userEvent.click(getPlayButton());
      expect(onPlayMock).toHaveBeenCalledWith('John');
    });
  });
});
