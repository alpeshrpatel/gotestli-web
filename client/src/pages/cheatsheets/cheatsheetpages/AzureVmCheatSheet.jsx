import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';

const azureVmSections = [
  {
    heading: "What is Azure Virtual Machines?",
    content: `Azure Virtual Machines (VMs) are one of the core Infrastructure-as-a-Service (IaaS) offerings in Microsoft Azure, allowing you to create and run Windows or Linux virtualized environments in the cloud. These VMs provide the flexibility of virtualization without the need to invest in physical hardware, offering full control over the operating system, installed software, and configurations.\n\nAzure VMs are used for hosting applications, running legacy workloads, development and testing environments, and extending data centers to the cloud.`,
  },
  {
    heading: "Key Features",
    content: `• Support for both Linux and Windows OS\n• Various VM sizes and series (General purpose, Compute optimized, Memory optimized, etc.)\n• Custom images and gallery images\n• Azure Disk Storage (Standard HDD/SSD, Premium SSD)\n• Virtual Network Integration\n• Auto-scaling using Virtual Machine Scale Sets (VMSS)\n• High availability via Availability Zones and Sets\n• Integration with Azure Monitor, Backup, and Security Center`,
  },
  {
    heading: "VM Types (Series)",
    content: `• **B-Series (Burstable)** – Cost-effective for workloads with variable CPU\n• **D-Series** – Balanced CPU and memory; good for web servers, small databases\n• **E-Series** – Memory optimized; good for SAP HANA, in-memory analytics\n• **F-Series** – Compute optimized; good for gaming, batch processing\n• **M-Series** – Massive memory; ideal for large enterprise workloads\n• **N-Series** – GPU optimized; for AI, deep learning, and video rendering`,
  },
  {
    heading: "Creating an Azure VM (CLI Example)",
    code: `# Login to Azure
az login

# Create a resource group
az group create --name myResourceGroup --location eastus

# Create a virtual machine
az vm create \\
  --resource-group myResourceGroup \\
  --name myVM \\
  --image UbuntuLTS \\
  --admin-username azureuser \\
  --generate-ssh-keys`
  },
  {
    heading: "VM Pricing Model",
    content: `• Pay-as-you-go pricing (billed per second)\n• Reserved Instances (1 or 3 year terms) for cost savings\n• Spot Instances (eviction possible) for non-critical workloads\n\nCost depends on:\n• VM size and region\n• OS and licensing\n• Attached storage and networking\n• Uptime and scale sets`,
  },
  {
    heading: "VM Networking",
    content: `• Virtual Network (VNet): Private network for VMs\n• Public IP: Access VMs over the internet\n• Network Security Groups (NSGs): Firewall rules\n• Azure Bastion: Secure RDP/SSH without exposing IP\n• Load Balancer: Distribute traffic across VMs\n• Application Gateway: Layer 7 load balancer with WAF`,
  },
  {
    heading: "Disk Storage Options",
    content: `• **OS Disk**: Required for boot volume\n• **Data Disk**: Optional for application data\n• **Standard HDD/SSD**: Cost-effective options\n• **Premium SSD**: High performance and low latency\n• **Ultra Disk**: High throughput and IOPS (for I/O-intensive apps)`,
  },
  {
    heading: "Best Practices",
    content: `• Choose the right VM size for performance and cost\n• Use Managed Disks to simplify management\n• Implement Availability Sets or Zones for redundancy\n• Use Azure Monitor for performance tracking\n• Automate with Azure Resource Manager (ARM) templates\n• Secure VMs using Just-In-Time access, NSGs, and Azure Defender`,
  },
  {
    heading: "Common Use Cases",
    content: `• Hosting web apps and APIs\n• Running development/test environments\n• Migrating on-prem applications\n• High-performance computing (HPC)\n• Running container workloads (via Docker or Kubernetes)\n• Creating sandbox environments for training or demos`,
  }
];

const AzureVmCheatSheet = () => {
  return (
    <CheatSheetLayout
      title="Azure Virtual Machines Cheat Sheet"
      description="Comprehensive guide and reference to working with Microsoft Azure Virtual Machines."
      sections={azureVmSections}
    />
  );
};

export default AzureVmCheatSheet;
