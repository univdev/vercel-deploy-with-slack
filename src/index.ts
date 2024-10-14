import core from '@actions/core';
import { Vercel } from './utils/Vercel.util';
import { Slack } from './utils/Slack.util';
import { RuntimeCounter } from './utils/RuntimeCounter.util';
import { JsonReader } from './utils/JsonReader.util';
import { GithubPath } from './utils/GithubPath.util';

async function run() {
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
    if (slackStartPayloadFile)
      slackStartPayload = await jsonReader.read(slackStartPayloadFile) as string;
    if (slackSuccessPayloadFile)
      slackSuccessPayload = await jsonReader.read(slackSuccessPayloadFile) as string;

    if (slack !== null && slackStartPayload)
      await slack.send(slackStartPayload);

    await vercel.pull();
    await vercel.build();
    await vercel.deploy();

    if (slack !== null && slackSuccessPayload)
      await slack.send(slackSuccessPayload);

    core.setOutput('process-time', runtimeCounter.stop());
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);

      if (slackFailurePayloadFile)
        slackFailurePayload = await jsonReader.read(slackFailurePayloadFile) as string;

      if (slack !== null && slackFailurePayload)
        slack.send(slackFailurePayload);
    }
  }
}

export default run;
