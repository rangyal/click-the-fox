import { useState } from 'react';
import { WelcomeForm } from './Welcome.Form';
import { Button } from '../../components/Button';

type WelcomeProps = {
  onPlay: (name: string) => void;
};

export const Welcome = ({ onPlay }: WelcomeProps) => {
  const [step, setStep] = useState<'form' | 'hello'>('form');
  const [name, setName] = useState('');

  const handleSubmit = (newName: string) => {
    setStep('hello');
    setName(newName);
  };

  const handleChangeName = () => {
    setStep('form');
  };

  const handlePlay = () => {
    onPlay(name);
  };

  return (
    <div className="flex flex-col justify-between items-center">
      {step === 'form' && (
        <WelcomeForm defaultName={name} onSubmit={handleSubmit} />
      )}
      {step === 'hello' && (
        <>
          <div className="text-2xl">
            Hello{' '}
            <Button
              variant="link"
              title="Change name"
              onClick={handleChangeName}
            >
              {name}
            </Button>
          </div>
          <Button variant="primary" onClick={handlePlay} autoFocus>
            PLAY!
          </Button>
        </>
      )}
    </div>
  );
};
