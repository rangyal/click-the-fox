import { within } from '@testing-library/react';

export function getTableBodyData(tableEl: HTMLElement, rowGroupIndex: number) {
  const body = within(tableEl).getAllByRole('rowgroup')[rowGroupIndex];
  const rows = within(body).getAllByRole('row');
  return rows.map((row) => {
    const cells = within(row).getAllByRole('cell');
    return cells.map((cell) => cell.textContent?.trim() ?? '');
  });
}
