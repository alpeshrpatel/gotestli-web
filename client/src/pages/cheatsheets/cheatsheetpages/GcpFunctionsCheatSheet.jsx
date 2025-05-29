import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';

const gcpFunctionsSections = [
  {
    heading: "What is Google Cloud Functions?",
    content: `Google Cloud Functions is a serverless compute service that lets you run your code in response to events without provisioning or managing servers. It supports event-driven architectures and is ideal for lightweight APIs, automation, and integrations with other GCP services.`,
  },
  {
    heading: "Key Features",
    content: `• Event-driven execution triggered by HTTP, Pub/Sub, Cloud Storage, etc.\n• Automatic scaling – scales up/down based on incoming events\n• Supports Node.js, Python, Go, Java, .NET, Ruby, PHP\n• Pay-per-use pricing (only for the time code runs)\n• Built-in monitoring and logging with Cloud Monitoring and Logging\n• Secure by design – integrate IAM and VPC\n• Integrates with Cloud Build for CI/CD`,
  },
  {
    heading: "Common Use Cases",
    content: `• RESTful APIs\n• Backend for mobile/web apps\n• Real-time file/image processing\n• Event-based automation (e.g., on file upload, new database entry)\n• ETL pipelines and background tasks\n• Scheduled jobs (via Cloud Scheduler)`,
  },
  {
    heading: "Creating a Function (gcloud CLI)",
    code: `# Deploy an HTTP-triggered function
gcloud functions deploy helloWorld \\
  --runtime=nodejs18 \\
  --trigger-http \\
  --allow-unauthenticated

# Deploy triggered by Cloud Storage
gcloud functions deploy processFile \\
  --runtime=python39 \\
  --trigger-resource=my-bucket \\
  --trigger-event=google.storage.object.finalize`,
  },
  {
    heading: "Basic Node.js Example",
    code: `// index.js
exports.helloWorld = (req, res) => {
  res.send('Hello from Google Cloud Functions!');
};

// package.json
{
  "name": "sample-function",
  "version": "1.0.0",
  "dependencies": {}
}`,
  },
  {
    heading: "Trigger Types",
    content: `• **HTTP** – Triggered by HTTP requests (supports REST APIs)\n• **Cloud Storage** – Triggered on file creation/deletion\n• **Pub/Sub** – Triggered when messages are published to a topic\n• **Firebase** – Triggered by Firebase events (auth, Firestore, etc.)\n• **Cloud Scheduler** – Triggered on a scheduled CRON job\n• **Cloud Audit Logs** – Triggered by GCP resource changes`,
  },
  {
    heading: "Environment Variables",
    code: `# Set during deployment
gcloud functions deploy myFunction \\
  --set-env-vars="ENV=prod,DEBUG=true"

# Access in code (Node.js)
process.env.ENV`,
  },
  {
    heading: "Monitoring and Logging",
    content: `• Logs are automatically pushed to Cloud Logging\n• Use \`console.log\` or language-specific loggers to generate logs\n• Monitor memory, execution time, and invocation count with Cloud Monitoring\n• View logs in the GCP Console → Logging → Logs Explorer`,
  },
  {
    heading: "Securing Functions",
    content: `• Use IAM roles to control who can deploy, invoke, or view functions\n• Require authentication for HTTP functions unless explicitly made public\n• Use VPC connectors to access resources in a private network\n• Use Cloud Armor or API Gateway in front of Cloud Functions for extra security`,
  },
  {
    heading: "Best Practices",
    content: `• Keep functions small and single-purpose\n• Avoid cold start latency by optimizing package size\n• Use environment variables for configuration\n• Use Pub/Sub for decoupling services\n• Handle retries and failures gracefully (Cloud Tasks for more control)\n• Use CI/CD with Cloud Build for automated deployments`,
  }
];

const GcpFunctionsCheatSheet = () => {
  return (
    <CheatSheetLayout
      title="Google Cloud Functions Cheat Sheet"
      description="Quick reference for Google Cloud Functions – serverless compute to run code in response to events."
      sections={gcpFunctionsSections}
      cheatsheetId={19}
    />
  );
};

export default GcpFunctionsCheatSheet;
