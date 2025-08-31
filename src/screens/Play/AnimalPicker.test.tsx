import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnimalPicker } from './AnimalPicker';
import type { Animal } from '../../api/types';

const dog: Animal = {
  type: 'dog',
  image: 'image',
};
const cat: Animal = {
  type: 'cat',
  image: 'image',
};
const fox: Animal = {
  type: 'fox',
  image: 'image',
};
const animals = [cat, dog, fox];

describe('AnimalPicker', () => {
  it('should render', () => {
    render(<AnimalPicker animals={animals} onAnimalClick={vi.fn()} />);
    expect(screen.getByAltText('fox')).toBeInTheDocument();
    expect(screen.getByAltText('dog')).toBeInTheDocument();
    expect(screen.getByAltText('cat')).toBeInTheDocument();
  });

  it('should call onAnimalClick when an animal is clicked', async () => {
    const onAnimalClick = vi.fn();
    render(<AnimalPicker animals={animals} onAnimalClick={onAnimalClick} />);
    await userEvent.click(screen.getByAltText('dog'));
    expect(onAnimalClick).toHaveBeenCalledWith(dog);
  });
});
