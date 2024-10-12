import core from '@actions/core';
import { Vercel } from './utils/Vercel.util';
import { Slack } from './utils/Slack.util';
import { RuntimeCounter } from './utils/RuntimeCounter.util';

async function run() {
  const runtimeCounter = new RuntimeCounter();
  runtimeCounter.start();

  const slackWebhookUrl = core.getInput('slack-webhook-url');
  const vercelTokenId = core.getInput('vercel-token-id');
  const slackStartPayload = core.getInput('slack-deploy-start-message-payload');
  const slackFailurePayload = core.getInput('slack-deploy-failed-message-payload');
  const slackSuccessPayload = core.getInput('slack-deploy-succeed-message-payload');

  const slack = new Slack(slackWebhookUrl);
  const vercel = new Vercel(vercelTokenId);

  try {    
    await slack.send(slackStartPayload);

    await vercel.pull();
    await vercel.build();
    await vercel.deploy();

    await slack.send(slackSuccessPayload);

    core.setOutput('process-time', runtimeCounter.stop());
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
      slack.send(slackFailurePayload);
    }
  }
}

export default run;
