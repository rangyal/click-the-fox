import '@testing-library/jest-dom';

class MockImage extends Image {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;

  constructor() {
    setTimeout(() => this.onload?.(), 0);
    super();
  }
}

globalThis.Image = MockImage;

// Add any global test utilities here
export const renderWithProviders = (ui: React.ReactElement) => {
  return ui;
};
