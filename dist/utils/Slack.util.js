import * as child from 'child_process';

class Slack {
    constructor(webhookUrl) {
        Object.defineProperty(this, "webhookUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.webhookUrl = webhookUrl;
    }
    send(payload) {
        return new Promise((resolve, reject) => {
            child.exec(`curl -X POST -H 'Content-type: application/json' --data '${payload}'`, (error, stdout) => {
                if (error) {
                    reject(`Failed send slack message: ${error}`);
                    return;
                }
                resolve(stdout);
            });
        });
    }
}

export { Slack };
