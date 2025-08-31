type AnimalType = 'cat' | 'dog' | 'fox';

type Animal = {
  type: AnimalType;
  image: string;
};

export type { AnimalType, Animal };
