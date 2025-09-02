import type { Score } from '../../hooks/useGameScores';

type Props = {
  scores: Score[];
};

const Scoreboard = ({ scores }: Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-center">SCOREBOARD</h2>
      <div className="flex justify-center">
        <table className="border-separate border-spacing-0.25">
          <thead className="text-center">
            <tr className="bg-gray-500 text-white">
              <th className="py-1 px-2">Rank</th>
              <th className="py-1 px-2">Name</th>
              <th className="py-1 px-2">Date</th>
              <th className="py-1 px-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => {
              const isEven = index % 2 === 0;
              const bgColor = isEven ? 'bg-gray-100' : 'bg-gray-200';
              return (
                <tr key={index} className={bgColor}>
                  <td className="text-center bg-gray-500 text-white py-1 px-2">
                    {index + 1}
                  </td>
                  <td className="text-left py-1 px-2">{score.name}</td>
                  <td className="text-left py-1 px-2">
                    {formatDate(score.date)}
                  </td>
                  <td className="text-right py-1 px-2">{score.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export { Scoreboard };
