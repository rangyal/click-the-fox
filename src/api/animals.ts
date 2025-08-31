import { getCats } from './cats';
import { getDog } from './dogs';
import { getFox } from './foxes';
import type { Animal, AnimalType } from './types';

const getAnimals = async ({ cat, dog, fox }: Record<AnimalType, number>) => {
  const animals = await Promise.all([
    getCats(cat).then((cats) => Promise.all(cats.map(prefetchAnimalImage))),
    ...Array.from({ length: dog }, getDog).map(prefetchAnimalImage),
    ...Array.from({ length: fox }, getFox).map(prefetchAnimalImage),
  ]);
  return animals.flat();
};

const prefetchAnimalImage = async (animalPromise: Promise<Animal> | Animal) => {
  const animal = await animalPromise;
  await prefetchImage(animal.image);
  return animal;
};

const prefetchImage = async (imageUrl: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    return img;
  });
};

export { getAnimals };
