import { exec } from 'child_process';

export class Vercel {
  token: string;

  constructor(token: string) {
    this.token = token;
  }

  pull() {
    return new Promise((resolve, reject) => {
      exec(
        `npx vercel build --token=${this.token} --yes`,
        (error, stdout) => {
          if (error) {
            reject(`Failed pull environment from Vercel: ${error}`)
            return;
          }

          resolve(stdout);
        }
      );
    });
  }

  build() {
    return new Promise((resolve, reject) => {
      exec(
        `npx vercel build --token=${this.token}`,
        (error, stdout) => {
          if (error) {
            reject(`Build failed: ${error}`);
            return;
          }

          resolve(stdout);
        }
      );
    });
  }

  deploy() {
    return new Promise((resolve, reject) => {
      exec(
        `npx vercel --token=${this.token} --prod`,
        (error, stdout) => {
          if (error) {
            reject(`Deploy failed: ${error}`);
            return;
          }
          
          resolve(stdout);
        }
      );
    });
  }
}