import * as child from 'child_process';

export class Vercel {
  token: string;

  constructor(token: string) {
    this.token = token;
  }

  build() {
    return new Promise((resolve, reject) => {
      child.exec(
        `npx vercel build --prod --token=${this.token} --yes`,
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
      child.exec(
        `npx vercel --token=${this.token} --prod --yes`,
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