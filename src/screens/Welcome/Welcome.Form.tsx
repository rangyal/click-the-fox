import { useId, useState } from 'react';
import { Button } from '../../components';

type WelcomeFormProps = {
  defaultName?: string;
  onSubmit: (name: string) => void;
};

export const WelcomeForm = ({ defaultName, onSubmit }: WelcomeFormProps) => {
  const formId = useId();
  const nameInputId = useId();
  const [name, setName] = useState(defaultName ?? '');
  const trimmedName = name.trim();
  const isNameValid = trimmedName.length > 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(trimmedName);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <>
      <form
        id={formId}
        className="inline-flex gap-4 items-center"
        onSubmit={handleSubmit}
      >
        <label htmlFor={nameInputId}>Name</label>
        <input
          id={nameInputId}
          name="name"
          type="text"
          className="border border-gray-300 rounded-md p-2"
          placeholder="Enter your name"
          required
          value={name}
          onChange={handleNameChange}
        />
      </form>
      <Button
        variant="secondary"
        type="submit"
        form={formId}
        disabled={!isNameValid}
      >
        PLAY!
      </Button>
    </>
  );
};
