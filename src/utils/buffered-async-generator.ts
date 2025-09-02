class BufferedAsyncGenerator<T> {
  private bufferSize: number;
  private buffer: Promise<T>[] = [];
  private getNewItem: () => Promise<T>;

  constructor(getNewItem: () => Promise<T>, bufferSize: number = 10) {
    this.bufferSize = bufferSize;
    this.getNewItem = getNewItem;
    this.fillBuffer();
  }

  private fillBuffer() {
    if (this.buffer.length >= this.bufferSize) return;
    const newItems = Array.from(
      { length: this.bufferSize - this.buffer.length },
      this.getNewItem
    );
    this.buffer = [...this.buffer, ...newItems];
  }

  public waitForBuffer() {
    return Promise.all(this.buffer).then(() => {});
  }

  public next() {
    const nextItem = this.buffer.at(0) ?? this.getNewItem();
    const rest = this.buffer.slice(1);
    this.buffer = rest;
    this.fillBuffer();
    return nextItem;
  }
}

export { BufferedAsyncGenerator };
