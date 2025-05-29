import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';

const gcpComputeSections = [
  {
    heading: "What is Google Cloud Compute Engine?",
    content: `Google Compute Engine (GCE) is the Infrastructure-as-a-Service (IaaS) offering from Google Cloud Platform (GCP). It allows users to run virtual machines (VMs) on Google's infrastructure with customizable CPU, memory, and disk configurations. GCE is designed for high performance, scalability, and flexibility, supporting Linux and Windows workloads and integration with other GCP services.`,
  },
  {
    heading: "Key Features",
    content: `• Custom machine types (choose your own vCPU and memory)\n• Predefined VM types for common workloads\n• Persistent disks and local SSDs\n• Global load balancing\n• Automatic instance backups and snapshots\n• Instance groups and autoscaling\n• Integration with Identity and Access Management (IAM) and VPC networking\n• Support for GPUs and TPUs for ML/AI workloads`,
  },
  {
    heading: "VM Instance Types",
    content: `• **E2** – Cost-effective general-purpose\n• **N2/N2D** – High performance general-purpose\n• **C2** – Compute optimized\n• **M2/M3** – Memory optimized\n• **A2** – GPU accelerated for AI/ML\n• **T2D (Tau VMs)** – High performance per cost`,
  },
  {
    heading: "Persistent Disk Types",
    content: `• **Standard Persistent Disk** – Affordable HDD-based storage\n• **Balanced Persistent Disk** – Good balance of price and performance\n• **SSD Persistent Disk** – High performance SSD storage\n• **Local SSDs** – Directly attached to VM; not durable across VM stops`,
  },
  {
    heading: "Creating a VM (gcloud CLI)",
    code: `# Create a VM instance
gcloud compute instances create my-vm \\
  --zone=us-central1-a \\
  --machine-type=e2-medium \\
  --image-family=debian-11 \\
  --image-project=debian-cloud \\
  --boot-disk-size=20GB`
  },
  {
    heading: "Connecting to a VM",
    code: `# SSH into the VM
gcloud compute ssh my-vm --zone=us-central1-a`
  },
  {
    heading: "Managing VM Lifecycle",
    content: `• **Start/Stop/Restart/Delete VM**: Control VM state via console or CLI\n• **Snapshots**: Capture disk state for backup or replication\n• **Instance Templates**: Reuse VM configurations for auto-scaling or templates\n• **Instance Groups**: Manage multiple VMs as a single unit (supports autoscaling and load balancing)\n• **Preemptible VMs**: Short-lived, low-cost VMs ideal for batch jobs`,
  },
  {
    heading: "Networking and Firewall",
    content: `• Each VM is part of a **VPC network** with internal and external IPs\n• Use **firewall rules** to allow/deny traffic by IP, port, or tags\n• Assign static external IPs for consistent access\n• Enable **IP forwarding** if using the VM as a proxy or NAT\n• Integrate with **Cloud NAT**, **Cloud Load Balancing**, and **Cloud Armor**`,
  },
  {
    heading: "Security Best Practices",
    content: `• Use **IAM roles** to control who can manage or SSH into instances\n• Use **OS Login** to enforce user-level SSH key management\n• Regularly patch VMs and use **Shielded VMs** for better protection\n• Encrypt persistent disks (default is encryption at rest)\n• Use **service accounts** for application access to other GCP services`,
  },
  {
    heading: "Common Use Cases",
    content: `• Hosting web servers and backend services\n• Running containerized workloads without Kubernetes\n• Batch processing and cron jobs\n• High-performance computing (HPC) and AI/ML model training\n• Game server hosting or simulation environments`,
  },
  {
    heading: "Best Practices",
    content: `• Use custom images or instance templates for repeatable VM setup\n• Use startup and shutdown scripts for configuration automation\n• Schedule automatic backups with snapshots\n• Use labels and tags to organize and group resources\n• Monitor performance with **Cloud Monitoring** and **Cloud Logging**`,
  }
];

const GcpComputeCheatSheet = () => {
  return (
    <CheatSheetLayout
      title="Google Cloud Compute Engine Cheat Sheet"
      description="Quick reference guide for Google Cloud Compute Engine - high-performance virtual machines on GCP."
      sections={gcpComputeSections}
      cheatsheetId={18}
    />
  );
};

export default GcpComputeCheatSheet;
