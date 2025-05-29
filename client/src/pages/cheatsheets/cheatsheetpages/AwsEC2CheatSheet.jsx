import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';


const ec2Sections = [
    {
      heading: "What is Amazon EC2?",
      content: `Amazon EC2 (Elastic Compute Cloud) is a core part of AWS that provides resizable virtual servers in the cloud. It enables developers to run applications on virtual machines, known as "instances", without needing to invest in hardware upfront. EC2 is designed to make web-scale cloud computing easier for developers.`,
    },
    {
      heading: "Key Benefits of EC2",
      content: `• **Scalability**: Easily scale capacity up or down according to demand.\n• **Cost-Effective**: Pay only for the compute time you consume.\n• **Elastic Load Balancing**: Distribute incoming application traffic across multiple EC2 instances.\n• **Integration with other AWS services**: Works seamlessly with services like Amazon RDS, S3, IAM, and CloudWatch.\n• **Customizable**: Choose your own OS, storage, memory, CPU, and more.`,
    },
    {
      heading: "Common Use Cases",
      content: `• Hosting web and application servers\n• Running batch processing systems\n• High-performance computing (HPC)\n• Dev/Test environments\n• Scalable backend systems`,
    },
    {
      heading: "Types of EC2 Instances",
      content: `• **General Purpose**: Balanced CPU, memory, and networking (e.g., t3, t3a, m5).\n• **Compute Optimized**: Best for compute-bound applications (e.g., c5, c6g).\n• **Memory Optimized**: For memory-intensive workloads (e.g., r5, x1).\n• **Storage Optimized**: High, sequential read/write access to large datasets (e.g., i3, d2).\n• **Accelerated Computing**: Uses GPUs or FPGAs for ML, gaming, etc. (e.g., p3, inf1).`,
    },
    {
      heading: "Security Features",
      content: `• **Key Pairs**: Used to SSH into your instance securely.\n• **Security Groups**: Acts as a virtual firewall to control inbound/outbound traffic.\n• **IAM Roles**: Assign permissions to EC2 instances to access other AWS services without storing credentials.\n• **VPC Isolation**: Launch EC2 instances within an isolated network.`,
    },
    {
      heading: "Pricing Models",
      content: `• **On-Demand Instances**: Pay per hour/second with no long-term commitment.\n• **Reserved Instances**: Up to 75% savings with a one- or three-year term.\n• **Spot Instances**: Bid for unused EC2 capacity, can save up to 90%.\n• **Savings Plans**: Flexible pricing model for predictable workloads.`,
    },
    {
      heading: "Example: Launch EC2 Instance via CLI",
      code: `aws ec2 run-instances \\
  --image-id ami-0abcdef1234567890 \\
  --count 1 \\
  --instance-type t2.micro \\
  --key-name MyKeyPair \\
  --security-groups MySecurityGroup`
    }
  ];
  

const AwsEC2CheatSheet = () => {
  return (
    <CheatSheetLayout
      title="AWS EC2 Cheat Sheet"
      description="Quick reference for working with Amazon EC2 - Elastic Compute Cloud."
      sections={ec2Sections}
      cheatsheetId={4}
    />
  );
};

export default AwsEC2CheatSheet;
