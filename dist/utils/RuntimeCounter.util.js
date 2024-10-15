class RuntimeCounter {
    constructor() {
        Object.defineProperty(this, "date", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
    }
    start() {
        this.date = new Date();
    }
    stop() {
        const start = this.date;
        const end = new Date();
        if (start === null)
            return 0;
        return end.getTime() - start.getTime();
    }
}

export { RuntimeCounter };
