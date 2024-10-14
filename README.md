# Vercel deploy with slack

**GitHub Action for Vercel Distribution and Slack Message Transfer**

This action automates deployments to Vercel and sends real-time status updates to a Slack channel with customizable message payloads. It also supports loading payloads from files, which allows more complex message structures to be maintained outside the YAML configuration.

## Inputs

| Name                               | Description                                                                | Required |
|------------------------------------ |----------------------------------------------------------------------------|----------|
| `vercel-token-id`                  | Vercel API token for authenticating deployment requests.                   | `true`   |
| `slack-webhook-url`                | Slack Incoming Webhook URL for sending deployment status updates.           | `false`  |
| `slack-deploy-start-message-payload`| Custom payload for the message to be sent when the deployment starts.       | `false`  |
| `slack-deploy-failed-message-payload`| Custom payload for the message to be sent if the deployment fails.         | `false`  |
| `slack-deploy-succeed-message-payload`| Custom payload for the message to be sent when the deployment succeeds.    | `false`  |
| `slack-deploy-start-message-payload-file`| Path to a file containing the custom payload for the start message. This will override the inline payload if both are set. | `false`  |
| `slack-deploy-failed-message-payload-file`| Path to a file containing the custom payload for the failure message. This will override the inline payload if both are set. | `false`  |
| `slack-deploy-succeed-message-payload-file`| Path to a file containing the custom payload for the success message. This will override the inline payload if both are set. | `false`  |

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

### Example with Message Payload from File

```yaml
name: Deploy to Vercel with Slack Notifications (Payload from File)

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
          slack-deploy-start-message-payload-file: 'config/slack-deploy-start.json'
          slack-deploy-failed-message-payload-file: 'config/slack-deploy-failed.json'
          slack-deploy-succeed-message-payload-file: 'config/slack-deploy-succeed.json'
```

## Inputs Explanation

- **vercel-token-id**: This is your Vercel API token, required to authenticate the deployment request. Make sure to store this token as a GitHub secret.
- **slack-webhook-url**: Your Slack Incoming Webhook URL where deployment status updates will be sent. It is recommended to store this as a GitHub secret. This input is optional; if not set, no messages will be sent to Slack.
- **slack-deploy-start-message-payload**: A custom JSON payload defining the message that will be sent when the deployment starts. You can define text, attachments, and other Slack API payload fields. If a file is provided, it will take precedence over this inline value.
- **slack-deploy-failed-message-payload**: A custom JSON payload that is sent if the deployment fails. Similarly, this can be overridden by a file input.
- **slack-deploy-succeed-message-payload**: A custom JSON payload that is sent when the deployment succeeds. File input can override this.
- **slack-deploy-start-message-payload-file**: Path to a JSON file that contains the message payload for deployment start. If both this file and the inline payload are set, the file will be used.
- **slack-deploy-failed-message-payload-file**: Path to a JSON file containing the message payload for deployment failure. The file will override any inline payload.
- **slack-deploy-succeed-message-payload-file**: Path to a JSON file containing the message payload for deployment success. The file will override any inline payload.

## Outputs

- **process-time**: The action outputs the total time taken to complete the deployment process, which can be useful for logging or performance tracking.

## Customizing Slack Messages

You can customize the Slack messages using Slack's message formatting capabilities. Below is an example of a basic message payload:

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

Pass similar JSON payloads as values to the Slack-related inputs, or load them from a file.

For more detailed customization, check out Slack’s message format guide: [Slack Webhooks](https://api.slack.com/messaging/webhooks).