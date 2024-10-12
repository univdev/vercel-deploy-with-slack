import { exec } from "child_process";

export class Slack {
  webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  send(payload: string) {
    return new Promise((resolve, reject) => {
      exec(
        `curl -X POST -H 'Content-type: application/json' --data '${payload}'`,
        (error, stdout) => {
          if (error) {
            reject(`Failed send slack message: ${error}`);
            return;
          }

          resolve(stdout);
        }
      );
    });
  }
}
