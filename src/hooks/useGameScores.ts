import { z } from 'zod';
import { useLocalStorage } from 'usehooks-ts';

const ScoreSchema = z.object({
  name: z.string(),
  score: z.number(),
  date: z.string().pipe(z.coerce.date()),
});

type Score = z.infer<typeof ScoreSchema>;

const useGameScores = () => {
  const [scores, setScores] = useLocalStorage<Score[]>('game-scores', [], {
    deserializer: (value: string) =>
      ScoreSchema.array().parse(JSON.parse(value)),
  });

  const addScore = (score: Score) =>
    setScores((prevScores) =>
      prevScores.concat(score).sort((a, b) => b.score - a.score)
    );

  return { scores, addScore };
};

export { useGameScores };
export type { Score };
