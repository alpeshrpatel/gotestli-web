import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';

const azureBlobSections = [
  {
    heading: "What is Azure Blob Storage?",
    content: `Azure Blob Storage is Microsoft's object storage solution for the cloud. It is designed to store massive amounts of unstructured data such as text, images, videos, documents, backups, logs, and big data. 'Blob' stands for Binary Large Object. Blob storage is highly scalable, durable, secure, and accessible over HTTP/HTTPS via REST APIs or SDKs.\n\nIt’s commonly used for cloud-native applications, static website hosting, disaster recovery, and content streaming.`,
  },
  {
    heading: "Key Features",
    content: `• Store unstructured data such as media files, logs, and backups\n• Highly scalable and durable (supports petabytes of data)\n• Supports hot, cool, and archive access tiers\n• Integrated with Azure Active Directory and Shared Access Signatures for access control\n• Lifecycle management policies to automate data movement and deletion\n• Supports encryption at rest and in transit\n• Static website hosting directly from containers`,
  },
  {
    heading: "Blob Storage Tiers",
    content: `• **Hot** – Optimized for frequent access; higher storage cost, lower access cost\n• **Cool** – Optimized for infrequent access; lower storage cost, higher access cost\n• **Archive** – Lowest storage cost; data must be rehydrated before access\n\nUse lifecycle management policies to automatically move blobs between tiers based on usage patterns.`,
  },
  {
    heading: "Types of Blobs",
    content: `• **Block blobs** – Best for storing text or binary data (e.g., files, images)\n• **Append blobs** – Optimized for append operations, such as log files\n• **Page blobs** – Optimized for random read/write operations; used for VHDs (disks for VMs)`,
  },
  {
    heading: "Creating a Storage Account (CLI)",
    code: `# Create a resource group
az group create --name myResourceGroup --location eastus

# Create a storage account
az storage account create \\
  --name mystorageaccount \\
  --resource-group myResourceGroup \\
  --location eastus \\
  --sku Standard_LRS

# Create a blob container
az storage container create \\
  --name mycontainer \\
  --account-name mystorageaccount \\
  --public-access blob`
  },
  {
    heading: "Uploading and Downloading Files (CLI)",
    code: `# Upload a file to a container
az storage blob upload \\
  --container-name mycontainer \\
  --file myimage.jpg \\
  --name myimage.jpg \\
  --account-name mystorageaccount

# Download a file
az storage blob download \\
  --container-name mycontainer \\
  --name myimage.jpg \\
  --file downloaded.jpg \\
  --account-name mystorageaccount`
  },
  {
    heading: "Access Control",
    content: `• **Shared Access Signatures (SAS)** – Time-limited tokens to grant access without exposing keys\n• **Azure Active Directory (AAD)** – Role-based access control using Azure IAM\n• **Access Keys** – Long-term keys, typically used in development (rotate frequently)\n• **Container-Level Access** – Set containers to private, blob, or container access level`,
  },
  {
    heading: "Common Use Cases",
    content: `• Storing media assets (videos, images, documents)\n• Backup and restore operations\n• Data lakes and big data analytics (integrates with Azure Data Lake)\n• Serving static websites and hosting single-page applications\n• Log file storage and archival\n• Disaster recovery and long-term retention`,
  },
  {
    heading: "Best Practices",
    content: `• Use appropriate access tiers based on usage\n• Use lifecycle management to reduce costs\n• Secure access using SAS tokens or AAD\n• Enable soft delete for accidental data recovery\n• Monitor and log usage using Azure Monitor and diagnostics\n• Use managed identity to access storage securely from apps`,
  }
];

const AzureBlobCheatSheet = () => {
  return (
    <CheatSheetLayout
      title="Azure Blob Storage Cheat Sheet"
      description="Quick reference for working with Azure Blob Storage - secure, scalable object storage in Microsoft Azure."
      sections={azureBlobSections}
      cheatsheetId={7}
    />
  );
};

export default AzureBlobCheatSheet;
