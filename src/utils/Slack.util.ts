import * as child from "child_process";

export class Slack {
  webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  send(payload: string) {
    return new Promise((resolve, reject) => {
      child.exec(
        `curl -X POST -H 'Content-type: application/json' --data '${payload}' ${this.webhookUrl}`,
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
