class BufferedAsyncGenerator<T> {
  private bufferSize: number;
  private buffer: Promise<T>[] = [];
  private getNewItem: () => Promise<T>;

  constructor(getNewItem: () => Promise<T>, bufferSize: number = 10) {
    this.bufferSize = bufferSize;
    this.getNewItem = getNewItem;
    this.initializeBuffer();
  }

  private addNewItemToBuffer() {
    this.buffer.push(this.getNewItem());
  }

  private async initializeBuffer() {
    for (let i = 0; i < this.bufferSize; i++) {
      this.addNewItemToBuffer();
    }
  }

  public async waitForBuffer() {
    await Promise.all(this.buffer);
  }

  public next() {
    this.addNewItemToBuffer();
    const nextItem = this.buffer.shift();
    if (!nextItem) throw new Error('No more items');
    return nextItem;
  }
}

export { BufferedAsyncGenerator };
