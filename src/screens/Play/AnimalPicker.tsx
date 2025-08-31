import type { Animal } from '../../api/types';

type Props = {
  animals: Animal[];
  onAnimalClick: (animal: Animal) => void;
};

const AnimalPicker = ({ animals, onAnimalClick }: Props) => (
  <div className="grid grid-cols-3 size-full content-stretch">
    {animals.map((animal) => (
      <button
        key={animal.image}
        className="relative"
        onClick={() => onAnimalClick(animal)}
      >
        <img
          className="absolute size-full top-0 left-0 object-cover"
          src={animal.image}
          alt={animal.type}
          draggable={false}
        />
      </button>
    ))}
  </div>
);

export { AnimalPicker };
