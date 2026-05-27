export class SubtitleHistory {
  private buffer: string[] = [];
  private lastLine: string = "";
  private capacity: number;

  constructor(capacity: number) {
    this.capacity = Math.max(0, Math.floor(capacity));
  }

  setCapacity(capacity: number): void {
    this.capacity = Math.max(0, Math.floor(capacity));
    if (this.buffer.length > this.capacity) {
      this.buffer = this.buffer.slice(-this.capacity);
    }
  }

  push(line: string): void {
    const trimmed = (line || "").trim();
    if (!trimmed) return;
    if (trimmed === this.lastLine) return;
    this.lastLine = trimmed;
    if (this.capacity === 0) return;
    this.buffer.push(trimmed);
    if (this.buffer.length > this.capacity) {
      this.buffer.shift();
    }
  }

  recent(): string[] {
    return [...this.buffer];
  }

  joined(separator: string = "\n"): string {
    return this.buffer.join(separator);
  }

  clear(): void {
    this.buffer = [];
    this.lastLine = "";
  }
}
