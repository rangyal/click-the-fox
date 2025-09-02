import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnimalPicker } from './AnimalPicker';
import type { Animal } from '../../api/types';

const dog: Animal = {
  type: 'dog',
  image: 'image_dog.jpg',
};
const cat: Animal = {
  type: 'cat',
  image: 'image_cat.jpg',
};
const fox: Animal = {
  type: 'fox',
  image: 'image_fox.jpg',
};
const animals = [cat, dog, fox];

describe('AnimalPicker', () => {
  it('should render', () => {
    render(<AnimalPicker animals={animals} onAnimalClick={vi.fn()} />);

    for (const animal of animals) {
      const button = screen.getByRole('button', { name: animal.type });
      const img = within(button).getByRole('img', { name: animal.type });
      expect(img).toHaveAttribute('src', animal.image);
    }
  });

  it('should call onAnimalClick when an animal is clicked', async () => {
    const onAnimalClick = vi.fn();
    render(<AnimalPicker animals={animals} onAnimalClick={onAnimalClick} />);
    await userEvent.click(screen.getByRole('button', { name: 'dog' }));
    expect(onAnimalClick).toHaveBeenCalledWith(dog);
  });
});
