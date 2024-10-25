import core from '@actions/core';
import { Vercel } from './utils/Vercel.util';
import { Slack } from './utils/Slack.util';
import { RuntimeCounter } from './utils/RuntimeCounter.util';
import { JsonReader } from './utils/JsonReader.util';
import { GithubPath } from './utils/GithubPath.util';

export type IDependencies = {
  githubPath: GithubPath;
  slack: Slack;
  vercel: Vercel;
  jsonReader: JsonReader;
  runtimeCounter: RuntimeCounter;
}

export async function run() {
  const jsonReader = new JsonReader();
  const runtimeCounter = new RuntimeCounter();
  runtimeCounter.start();

  const slackWebhookUrl = core.getInput('slack-webhook-url');
  const vercelTokenId = core.getInput('vercel-token-id');
  
  let slackStartPayload = core.getInput('slack-deploy-start-message-payload');
  let slackFailurePayload = core.getInput('slack-deploy-failed-message-payload');
  let slackSuccessPayload = core.getInput('slack-deploy-succeed-message-payload');

  const slackStartPayloadFile = GithubPath.workspacePath(core.getInput('slack-deploy-start-message-payload-file'));
  const slackFailurePayloadFile = GithubPath.workspacePath(core.getInput('slack-deploy-failed-message-payload-file'));
  const slackSuccessPayloadFile = GithubPath.workspacePath(core.getInput('slack-deploy-succeed-message-payload-file'));

  const slack = slackWebhookUrl ? new Slack(slackWebhookUrl) : null;
  const vercel = new Vercel(vercelTokenId);

  try {
    if (slackStartPayloadFile) {
      core.info('Exporting Starting message...');
      slackStartPayload = await jsonReader.read(slackStartPayloadFile) as string;
      core.info('Exported Starting message!');
    }
    if (slackSuccessPayloadFile) {
      core.group('Get Succeed message for Slack Notification from File', async () => {
        core.info('Exporting Succeed message...');
        slackSuccessPayload = await jsonReader.read(slackSuccessPayloadFile) as string;
        core.info('Exported Succeed message!');
      });
    }

    if (slack !== null && slackStartPayload) {
      core.info('Send Starting message to Slack');
      await slack.send(slackStartPayload);
    }

    core.info('processing deploy to Vercel');
    await vercel.pull();
    await vercel.build();
    await vercel.deploy();

    core.info('Send Succeed message to Slack');
    if (slack !== null && slackSuccessPayload)
      await slack.send(slackSuccessPayload);

    core.info('All processes are done!');
    core.setOutput('process-time', runtimeCounter.stop());
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else if (typeof error === 'string') {
      core.setFailed(error);
    } else {
      core.setFailed('Deploy failed!');
    }

    if (slackFailurePayloadFile)
      slackFailurePayload = await jsonReader.read(slackFailurePayloadFile) as string;

    if (slack !== null && slackFailurePayload)
      slack.send(slackFailurePayload);
  }
}

run();
