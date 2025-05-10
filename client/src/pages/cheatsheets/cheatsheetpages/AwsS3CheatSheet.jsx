import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';


const s3Sections = [
    {
      heading: "What is Amazon S3?",
      content: `Amazon S3 (Simple Storage Service) is a highly scalable, durable, and secure object storage service designed for storing any amount of data. It's used for backup, archiving, big data analytics, and web hosting. Data is stored as objects within "buckets".`,
    },
    {
      heading: "Key Benefits of S3",
      content: `• **Scalability**: Automatically scales storage based on demand.\n• **Durability**: Designed for 99.999999999% (11 9's) durability.\n• **Security**: Supports encryption, IAM policies, and bucket policies.\n• **Data Management**: Lifecycle policies, object versioning, and replication options.\n• **Cost-Effective**: Multiple storage classes to optimize cost vs. performance.`,
    },
    {
      heading: "Common Use Cases",
      content: `• Backup and restore\n• Data archiving\n• Static website hosting\n• Big data analytics\n• Storing application assets and logs`,
    },
    {
      heading: "Storage Classes in S3",
      content: `• **S3 Standard**: For frequently accessed data.\n• **S3 Intelligent-Tiering**: Automatically moves data between two access tiers based on usage.\n• **S3 Standard-IA (Infrequent Access)**: For data that is less frequently accessed.\n• **S3 One Zone-IA**: Lower-cost option for infrequent access in a single AZ.\n• **S3 Glacier**: For archival with retrieval times in minutes to hours.\n• **S3 Glacier Deep Archive**: Lowest-cost archival storage, retrieval within 12 hours.`,
    },
    {
      heading: "S3 Bucket Policies and Access Control",
      content: `• Bucket policies use JSON to define permissions at the bucket level.\n• IAM policies control access on a user level.\n• Object-level permissions are handled via Access Control Lists (ACLs).\n• S3 supports cross-account access, VPC endpoint policies, and AWS Organizations.`,
    },
    {
      heading: "Versioning and Lifecycle Rules",
      content: `• **Versioning**: Maintains multiple versions of objects.\n• **Lifecycle Policies**: Automatically transition objects to cheaper storage classes or delete them after a set time.`,
    },
    {
      heading: "Example: Upload File to S3 via CLI",
      code: `aws s3 cp myphoto.jpg s3://my-bucket-name/photos/`
    }
  ];
  

const AwsS3CheatSheet = () => {
  return (
    <CheatSheetLayout
      title="AWS S3 Cheat Sheet"
      description="Quick reference for working with Amazon S3 - Simple Storage Service."
      sections={s3Sections}
    />
  );
};

export default AwsS3CheatSheet;
