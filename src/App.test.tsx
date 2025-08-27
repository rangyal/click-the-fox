import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('should start game after the welcome screen', async () => {
    render(<App />);
    await userEvent.type(screen.getByRole('textbox', { name: 'Name' }), 'John');
    await userEvent.click(screen.getByRole('button', { name: 'PLAY!' }));
    await userEvent.click(screen.getByRole('button', { name: 'PLAY!' }));
    expect(screen.getByText('Game')).toBeInTheDocument();
  });
});
