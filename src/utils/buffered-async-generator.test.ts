import { describe, it, expect, vi } from 'vitest';
import { BufferedAsyncGenerator } from './buffered-async-generator';

describe('BufferedAsyncGenerator', () => {
  it('should pre-fill buffer on initialization', () => {
    const fn = vi.fn(() => Promise.resolve('test'));
    new BufferedAsyncGenerator(fn, 2);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should wait for all buffer items to resolve', async () => {
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

  it('should return items and refill buffer as needed', async () => {
    let fnCallCount = 0;
    const fn = vi.fn(() => Promise.resolve(`test-${++fnCallCount}`));
    const generator = new BufferedAsyncGenerator(fn, 2);

    // Initial buffer has 2 items, consuming 3 should trigger refilling
    expect(await generator.next()).toBe('test-1');
    expect(await generator.next()).toBe('test-2');
    expect(await generator.next()).toBe('test-3');
    expect(fn).toHaveBeenCalledTimes(5); // 2 initial + 3 refills
  });

  it('should reject when generator function errors', async () => {
    const fn = vi.fn(() => Promise.reject(new Error('Generator failed')));
    const generator = new BufferedAsyncGenerator(fn, 1);

    await expect(generator.next()).rejects.toThrow('Generator failed');
  });

  it('should work with buffer size of 0', async () => {
    const fn = vi.fn(() => Promise.resolve('test'));
    const generator = new BufferedAsyncGenerator(fn, 0);

    expect(await generator.next()).toBe('test');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should handle concurrent next() calls correctly', async () => {
    let fnCallCount = 0;
    const fn = vi.fn(() => Promise.resolve(`test-${++fnCallCount}`));
    const generator = new BufferedAsyncGenerator(fn, 2);

    const promises = [
      generator.next(),
      generator.next(),
      generator.next(),
      generator.next(),
    ];

    const results = await Promise.all(promises);
    expect(results).toEqual(['test-1', 'test-2', 'test-3', 'test-4']);
    expect(fn).toHaveBeenCalledTimes(6); // 2 initial + 4 refills
  });
});
