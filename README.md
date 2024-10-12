# Vercel deploy with slack

**GitHub Action for Vercel Distribution and Slack Message Transfer**

This action helps automate deployments to Vercel while sending real-time status updates to a Slack channel via custom message payloads.

## Inputs

| Name                               | Description                                                                | Required |
|------------------------------------ |----------------------------------------------------------------------------|----------|
| `vercel-token-id`                  | Vercel API token for authenticating deployment requests.                   | `true`   |
| `slack-webhook-url`                | Slack Incoming Webhook URL for sending deployment status updates.           | `true`   |
| `slack-deploy-start-message-payload`| Custom payload for the message to be sent when the deployment starts.       | `true`   |
| `slack-deploy-failed-message-payload`| Custom payload for the message to be sent if the deployment fails.         | `true`   |
| `slack-deploy-succeed-message-payload`| Custom payload for the message to be sent when the deployment succeeds.    | `true`   |

## Outputs

| Name             | Description                                     |
|------------------|-------------------------------------------------|
| `process-time`   | The total time taken to complete the deployment.|

## Example Usage

```yaml
name: Deploy to Vercel with Slack Notifications

on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
      
      - name: Deploy with Slack notifications
        uses: univdev/vercel-deploy-with-slack@v1
        with:
          vercel-token-id: ${{ secrets.VERCEL_TOKEN }}
          slack-webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
          slack-deploy-start-message-payload: '{"text": "Deployment has started..."}'
          slack-deploy-failed-message-payload: '{"text": "Deployment failed!"}'
          slack-deploy-succeed-message-payload: '{"text": "Deployment succeeded!"}'
```

## Inputs Explanation

- vercel-token-id: This is your Vercel API token, required to authenticate the deployment request. Make sure to store this token as a GitHub secret.
- slack-webhook-url: Your Slack Incoming Webhook URL where deployment status updates will be sent. Also recommended to store as a GitHub secret.
- slack-deploy-start-message-payload: A custom JSON payload defining the message that will be sent when the deployment starts. Typically includes a text field, but you can customize it according to your Slack API payload format.
- slack-deploy-failed-message-payload: A custom JSON payload that is sent if the deployment fails.
- slack-deploy-success-message-payload: A custom JSON payload that is sent when the deployment succeeds.

## Outputs
- process-time: The action outputs the total time taken to complete the deployment process, which can be used for further logging or metrics.
Customizing Slack Messages

To customize the Slack messages, use Slack's message formatting capabilities. Here's an example of a basic message payload:

```json
{
  "text": "Deployment started for project XYZ.",
  "attachments": [
    {
      "text": "We're deploying the latest changes.",
      "color": "#36a64f"
    }
  ]
}
```

You can pass similar JSON payloads as values to the Slack-related inputs.

Slack message format guide: [Here!](https://api.slack.com/messaging/webhooks)