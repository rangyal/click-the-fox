import { describe, it, expect, vi } from 'vitest';
import { BufferedAsyncGenerator } from './buffered-async-generator';

describe('BufferedAsyncGenerator', () => {
  it('should buffer the items', () => {
    const fn = vi.fn(() => Promise.resolve('test'));
    new BufferedAsyncGenerator(fn, 2);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should wait for the buffer', async () => {
    let resolvePromise1: (value: string) => void = () => {};
    const promise1 = new Promise<string>((resolve) => {
      resolvePromise1 = resolve;
    });
    let resolvePromise2: (value: string) => void = () => {};
    const promise2 = new Promise<string>((resolve) => {
      resolvePromise2 = resolve;
    });
    const fn = vi.fn();
    fn.mockReturnValueOnce(promise1).mockReturnValueOnce(promise2);
    const generator = new BufferedAsyncGenerator(fn, 2);

    // Promise should not resolve until all buffer items resolve
    let isResolved = false;
    const waitForBufferPromise = generator
      .waitForBuffer()
      .then(() => (isResolved = true));

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(isResolved).toBe(false);

    resolvePromise1('test');
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(isResolved).toBe(false);

    resolvePromise2('test');
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(isResolved).toBe(true);
    expect(fn).toHaveBeenCalledTimes(2);

    await waitForBufferPromise;
  });

  it('should return the next item', async () => {
    let fnCallCount = 0;
    const fn = vi.fn(() => Promise.resolve(`test-${++fnCallCount}`));
    const generator = new BufferedAsyncGenerator(fn, 2);
    expect(await generator.next()).toBe('test-1');
    expect(await generator.next()).toBe('test-2');
    expect(await generator.next()).toBe('test-3');
    expect(fn).toHaveBeenCalledTimes(5);
  });
});
