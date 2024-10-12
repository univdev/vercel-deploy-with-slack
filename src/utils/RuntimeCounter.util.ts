export class RuntimeCounter {
  private date: Date | null = null;

  start() {
    this.date = new Date();
  }

  stop() {
    const start = this.date;
    const end = new Date();

    if (start === null) return 0;

    return end.getTime() - start.getTime();
  }
}