import * as child from 'child_process';

class Vercel {
    constructor(token) {
        Object.defineProperty(this, "token", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.token = token;
    }
    pull() {
        return new Promise((resolve, reject) => {
            child.exec(`npx vercel build --token=${this.token} --yes`, (error, stdout) => {
                if (error) {
                    reject(`Failed pull environment from Vercel: ${error}`);
                    return;
                }
                resolve(stdout);
            });
        });
    }
    build() {
        return new Promise((resolve, reject) => {
            child.exec(`npx vercel build --token=${this.token}`, (error, stdout) => {
                if (error) {
                    reject(`Build failed: ${error}`);
                    return;
                }
                resolve(stdout);
            });
        });
    }
    deploy() {
        return new Promise((resolve, reject) => {
            child.exec(`npx vercel --token=${this.token} --prod`, (error, stdout) => {
                if (error) {
                    reject(`Deploy failed: ${error}`);
                    return;
                }
                resolve(stdout);
            });
        });
    }
}

export { Vercel };
