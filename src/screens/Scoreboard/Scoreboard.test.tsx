import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { getTableBodyData } from '../../_test/test-utils';
import type { Score } from '../../hooks/useGameScores';
import { Scoreboard } from './Scoreboard';

const scores: Score[] = [
  { name: 'John', score: 100, date: new Date('2025-09-01T10:00:00Z') },
  { name: 'Jane', score: 90, date: new Date('2025-09-02T14:30:00Z') },
];

describe('Scoreboard', () => {
  it('should display the scoreboard title', () => {
    render(<Scoreboard scores={scores} />);
    expect(screen.getByText('SCOREBOARD')).toBeInTheDocument();
  });

  it('should show the scores', () => {
    render(<Scoreboard scores={scores} />);
    const tableData = getTableBodyData(screen.getByRole('table'), 1);
    expect(tableData).toEqual([
      ['1', 'John', 'Sep 1, 2025, 10:00 AM', '100'],
      ['2', 'Jane', 'Sep 2, 2025, 02:30 PM', '90'],
    ]);
  });
});
