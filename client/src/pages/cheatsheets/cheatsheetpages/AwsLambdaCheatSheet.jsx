// import React from 'react';
// import CheatSheetLayout from '../CheatSheetLayout';


// const lambdaSections = [
//   {
//     heading: "What is AWS Lambda?",
//     content: `AWS Lambda is a serverless compute service that allows you to run code without provisioning or managing servers. You simply upload your code, configure triggers, and Lambda handles everything required to run and scale your application. It automatically manages the compute fleet that offers a balance of memory, CPU, network, and other resources.\n\nUse cases include REST APIs, event-driven applications, file processing, real-time notifications, and backend logic for mobile or web apps.`,
//   },
//   {
//     heading: "Key Concepts",
//     content: `• **Function**: A Lambda function is the code you upload to run on AWS Lambda.\n• **Event Source**: Services or triggers that invoke your function (like S3, DynamoDB, API Gateway).\n• **Execution Role**: IAM role assigned to a function that defines what AWS services it can access.\n• **Handler**: The function that AWS Lambda calls to begin execution.\n• **Timeout**: The maximum duration your function is allowed to run (max 15 minutes).\n• **Memory Allocation**: Ranges from 128 MB to 10,240 MB and proportionally allocates CPU and other resources.`,
//   },
//   {
//     heading: "Common Use Cases",
//     content: `• Real-time file processing (e.g., resize an image when uploaded to S3)\n• Backend for web and mobile apps\n• Automation tasks (e.g., scheduled cleanups)\n• Real-time stream processing with Kinesis or DynamoDB Streams\n• RESTful API backend via API Gateway`,
//   },
//   {
//     heading: "Supported Runtimes",
//     content: `• Node.js\n• Python\n• Java\n• Go\n• .NET (C#)\n• Ruby\n• Custom Runtime (via Lambda Layers or Containers)`,
//   },
//   {
//     heading: "Lambda Function Structure (Node.js Example)",
//     code: `exports.handler = async (event) => {
//   console.log("Event received:", event);
//   return {
//     statusCode: 200,
//     body: JSON.stringify({ message: "Hello from Lambda!" }),
//   };
// };`
//   },
//   {
//     heading: "Deploying with AWS CLI",
//     code: `# Step 1: Create a deployment package
// zip function.zip index.js

// # Step 2: Create the Lambda function
// aws lambda create-function \\
//   --function-name myLambdaFunction \\
//   --zip-file fileb://function.zip \\
//   --handler index.handler \\
//   --runtime nodejs18.x \\
//   --role arn:aws:iam::123456789012:role/my-lambda-role

// # Step 3: Update the function code (for future updates)
// aws lambda update-function-code \\
//   --function-name myLambdaFunction \\
//   --zip-file fileb://function.zip`
//   },
//   {
//     heading: "Best Practices",
//     content: `• Keep your functions small and single-purpose\n• Use environment variables for configuration\n• Minimize cold starts by avoiding large dependencies\n• Use Lambda Layers to share common code\n• Monitor with Amazon CloudWatch Logs and Metrics\n• Secure using least privilege IAM roles`,
//   },
//   {
//     heading: "Pricing",
//     content: `• Free tier: 1 million requests and 400,000 GB-seconds per month\n• Charges are based on number of requests and duration of execution time\n• You only pay for the compute time your code uses\n\n**Example**: If your function runs for 200ms and you allocated 512MB memory, you pay for 0.0001 GB-seconds per invocation.`,
//   }
// ];

// const AwsLambdaCheatSheet = () => {
//   return (
//     <CheatSheetLayout
//       title="AWS Lambda Cheat Sheet"
//       description="A complete and concise guide to working with AWS Lambda in serverless applications."
//       sections={lambdaSections}
//     />
//   );
// };

// export default AwsLambdaCheatSheet;



import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';



const lambdaSections = [
  {
    heading: "What is AWS Lambda?",
    content: `AWS Lambda is a serverless compute service that allows you to run code without provisioning or managing servers. You simply upload your code, configure triggers, and Lambda handles everything required to run and scale your application. It automatically manages the compute fleet that offers a balance of memory, CPU, network, and other resources.\n\nUse cases include REST APIs, event-driven applications, file processing, real-time notifications, and backend logic for mobile or web apps.`,
  },
  {
    heading: "Key Concepts",
    content: `• **Function**: A Lambda function is the code you upload to run on AWS Lambda.\n• **Event Source**: Services or triggers that invoke your function (like S3, DynamoDB, API Gateway).\n• **Execution Role**: IAM role assigned to a function that defines what AWS services it can access.\n• **Handler**: The function that AWS Lambda calls to begin execution.\n• **Timeout**: The maximum duration your function is allowed to run (max 15 minutes).\n• **Memory Allocation**: Ranges from 128 MB to 10,240 MB and proportionally allocates CPU and other resources.`,
  },
  {
    heading: "Common Use Cases",
    content: `• Real-time file processing (e.g., resize an image when uploaded to S3)\n• Backend for web and mobile apps\n• Automation tasks (e.g., scheduled cleanups)\n• Real-time stream processing with Kinesis or DynamoDB Streams\n• RESTful API backend via API Gateway`,
  },
  {
    heading: "Supported Runtimes",
    content: `• Node.js\n• Python\n• Java\n• Go\n• .NET (C#)\n• Ruby\n• Custom Runtime (via Lambda Layers or Containers)`,
  },
  {
    heading: "Lambda Function Structure (Node.js Example)",
    code: `exports.handler = async (event) => {
  console.log("Event received:", event);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Lambda!" }),
  };
};`
  },
  {
    heading: "Deploying with AWS CLI",
    code: `# Step 1: Create a deployment package
zip function.zip index.js

# Step 2: Create the Lambda function
aws lambda create-function \\
  --function-name myLambdaFunction \\
  --zip-file fileb://function.zip \\
  --handler index.handler \\
  --runtime nodejs18.x \\
  --role arn:aws:iam::123456789012:role/my-lambda-role

# Step 3: Update the function code (for future updates)
aws lambda update-function-code \\
  --function-name myLambdaFunction \\
  --zip-file fileb://function.zip`
  },
  {
    heading: "Best Practices",
    content: `• Keep your functions small and single-purpose\n• Use environment variables for configuration\n• Minimize cold starts by avoiding large dependencies\n• Use Lambda Layers to share common code\n• Monitor with Amazon CloudWatch Logs and Metrics\n• Secure using least privilege IAM roles`,
  },
  {
    heading: "Pricing",
    content: `• Free tier: 1 million requests and 400,000 GB-seconds per month\n• Charges are based on number of requests and duration of execution time\n• You only pay for the compute time your code uses\n\n**Example**: If your function runs for 200ms and you allocated 512MB memory, you pay for 0.0001 GB-seconds per invocation.`,
  }
];

const AwsLambdaCheatSheet = () => {
  return (
    <CheatSheetLayout
      title="AWS Lambda Cheat Sheet"
      description="A complete and concise guide to working with AWS Lambda in serverless applications."
      sections={lambdaSections}
    />
  );
};

export default AwsLambdaCheatSheet;