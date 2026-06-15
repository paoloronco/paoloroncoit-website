// Competenze tecniche — fonte: skills.paoloronco.it. Bilingue IT/EN.
import type { Lang } from '@/i18n/ui';
type LS = Record<Lang, string>;

export interface Skill {
  name: string;
  level: number;
  hands?: boolean;
  tools?: string[];
  desc?: LS;
}
export interface SkillCategory {
  name: LS;
  color: string;
  skills: Skill[];
}

export const skillsTagline: LS = {
  it: 'Cybersecurity analyst specializzato in difesa cloud, networking resiliente, automazione, AI operations e piattaforme digitali.',
  en: 'Cybersecurity analyst specialized in cloud defense, resilient networking, automation, AI operations and digital platforms.',
};

const d = (it: string, en: string): LS => ({ it, en });

export const skillCategories: SkillCategory[] = [
  {
    name: { it: 'Security & Zero Trust', en: 'Security & Zero Trust' },
    color: 'var(--color-cat-security)',
    skills: [
      { name: 'Cybersecurity', level: 99, desc: d('Protezione dei sistemi informatici dalla divulgazione di informazioni.', 'Protection of computer systems from information disclosure.') },
      { name: 'Security Architecture', level: 90, desc: d('Progettazione di sistemi e applicazioni sicure.', 'Designing secure systems and applications.') },
      { name: 'Cloud Security', level: 90, desc: d('Messa in sicurezza di ambienti e applicazioni cloud.', 'Securing cloud environments and applications.') },
      { name: 'Zero Trust Security', level: 90, hands: true, desc: d('Controlli su identità, rete e dati secondo i principi Zero Trust.', 'Identity, network and data controls aligned to Zero Trust principles.'), tools: ['Cloudflare Zero Trust', 'Cloudflare Tunnels & Access'] },
      { name: 'Identity & Access Management (IAM)', level: 75, hands: true, desc: d('Soluzioni IAM sui principali cloud.', 'IAM solutions across major clouds.'), tools: ['AWS IAM', 'Azure AD', 'Google Cloud IAM', 'AD DS', 'SSO', 'FreeIPA', 'OAuth2/OIDC'] },
      { name: 'CSPM Platforms', level: 80, hands: true, desc: d('Cloud Security Posture Management.', 'Cloud Security Posture Management.'), tools: ['Wiz', 'SentinelOne'] },
      { name: 'CNAPP Platforms', level: 80, hands: true, desc: d('Sicurezza di build pipeline, runtime cloud e compliance.', 'Securing build pipelines, cloud runtime and compliance.'), tools: ['Wiz (CNAPP)'] },
      { name: 'SIEM Platforms', level: 65, hands: true, desc: d('Onboarding e detection engineering su Splunk ES e Wazuh.', 'Onboarding and detection engineering on Splunk ES and Wazuh.'), tools: ['Splunk', 'Wazuh', 'NetWitness'] },
      { name: 'SOAR Platforms', level: 40, desc: d('Security Orchestration, Automation and Response.', 'Security Orchestration, Automation and Response.') },
      { name: 'EDR / XDR Platforms', level: 55, desc: d('Endpoint/Extended Detection and Response.', 'Endpoint/Extended Detection and Response.'), tools: ['CrowdStrike Falcon'] },
      { name: 'Threat & Vulnerability Management', level: 80, desc: d('Triage, prioritizzazione e remediation.', 'Triage, prioritization and remediation.') },
      { name: 'Vulnerability Assessment', level: 65, desc: d('Identificazione e analisi delle vulnerabilità.', 'Identifying and analyzing security vulnerabilities.') },
      { name: 'Penetration Testing', level: 50, desc: d('Attacchi simulati per valutare la sicurezza.', 'Simulated attacks to evaluate security.') },
      { name: 'Threat Intelligence', level: 85, desc: d('Analisi di minacce e vulnerabilità.', 'Analysis of threats and vulnerabilities.') },
      { name: 'Incident Response', level: 80, desc: d('Gestione e mitigazione degli incidenti.', 'Handling and mitigating incidents.') },
      { name: 'Risk Management', level: 60, desc: d('Identificazione, analisi e trattamento dei rischi.', 'Identification, analysis and treatment of risks.') },
      { name: 'Security Compliance', level: 60, desc: d('Conformità ai requisiti normativi.', 'Ensuring systems meet regulatory requirements.') },
      { name: 'GRC', level: 85, desc: d('Governance, Risk & Compliance: ISO 27001, NIST CSF, CIS Controls, audit readiness.', 'Governance, Risk & Compliance: ISO 27001, NIST CSF, CIS Controls, audit readiness.') },
      { name: 'OSINT', level: 40, desc: d('Open Source Intelligence.', 'Open Source Intelligence.') },
      { name: 'Hardening', level: 70, desc: d('Baseline e benchmark di hardening di sistemi e reti.', 'System and network hardening baselines and benchmarks.') },
      { name: 'Cryptography', level: 50, desc: d('Concetti e pratiche di crittografia applicata.', 'Concepts and practices of applied cryptography.') },
    ],
  },
  {
    name: { it: 'Cloud Platforms & Architecture', en: 'Cloud Platforms & Architecture' },
    color: 'var(--color-cat-cloud)',
    skills: [
      { name: 'Google Cloud (GCP)', level: 85, hands: true, desc: d('Servizi e infrastruttura Google Cloud.', "Google Cloud services and infrastructure.") },
      { name: 'Amazon Web Services (AWS)', level: 75, hands: true, desc: d('Infrastruttura, servizi e best practice AWS.', 'AWS infrastructure, services and best practices.') },
      { name: 'Microsoft Azure', level: 65, desc: d('Piattaforma cloud Microsoft.', "Microsoft's cloud platform.") },
      { name: 'Oracle Cloud Infrastructure (OCI)', level: 85, hands: true, desc: d('Compute, networking, storage e database su Oracle Cloud.', 'Compute, networking, storage and databases on Oracle Cloud.') },
      { name: 'Cloud Architecture', level: 85, desc: d('Progettazione di soluzioni cloud scalabili e sicure.', 'Designing scalable and secure cloud solutions.') },
      { name: 'Multi-Cloud Strategy', level: 75, desc: d('Soluzioni su più provider cloud.', 'Solutions across multiple cloud providers.') },
      { name: 'Cloud Migration', level: 85, desc: d('Strategie di migrazione verso il cloud.', 'Strategies for migrating to the cloud.') },
      { name: 'Cloud Cost Optimization', level: 85, desc: d('Ottimizzazione dei costi delle risorse cloud.', 'Optimizing cloud resource costs.') },
      { name: 'Serverless Computing', level: 85, desc: d('AWS Lambda, Google Cloud Functions.', 'AWS Lambda, Google Cloud Functions.') },
      { name: 'IaaS', level: 90, desc: d('Compute, storage e networking cloud (Compute Engine, EC2, Azure VMs).', 'Cloud compute, storage and networking (Compute Engine, EC2, Azure VMs).') },
      { name: 'PaaS', level: 90, desc: d('App Engine, Cloud Run, Vercel, Heroku, Railway, Render.', 'App Engine, Cloud Run, Vercel, Heroku, Railway, Render.') },
      { name: 'SaaS', level: 90, desc: d('Microsoft 365, Google Workspace, Slack, Zoom.', 'Microsoft 365, Google Workspace, Slack, Zoom.') },
      { name: 'Hybrid Cloud', level: 85, desc: d('Soluzioni on-premise + cloud.', 'On-premise + cloud solutions.') },
      { name: 'Databases', level: 99, hands: true, desc: d('Database relazionali e non relazionali.', 'Relational and non-relational databases.'), tools: ['MongoDB', 'Redis', 'Supabase'] },
      { name: 'Object Storage', level: 99, hands: true, desc: d('Lifecycle, versioning, IAM, replica cross-region, integrazione CDN.', 'Lifecycle, versioning, IAM, cross-region replication, CDN integration.'), tools: ['Google Cloud Storage', 'Amazon S3', 'Azure Blob', 'Cloudflare R2'] },
      { name: 'Google Cloud Databases', level: 75, desc: d('Firestore, Bigtable, Spanner.', 'Firestore, Bigtable, Spanner.'), tools: ['Cloud Firestore', 'Cloud Bigtable', 'Cloud Spanner'] },
      { name: 'Scalable Architecture', level: 90, desc: d('Sistemi che scalano in modo efficiente.', 'Systems that scale efficiently.') },
    ],
  },
  {
    name: { it: 'Networking & Edge', en: 'Networking & Edge' },
    color: 'var(--color-cat-ai)',
    skills: [
      { name: 'Network Protocols', level: 80, desc: d('HTTP/S, TCP/IP, UDP e altri protocolli di rete.', 'HTTP/S, TCP/IP, UDP and other network protocols.') },
      { name: 'Routing & Switching', level: 80, desc: d('Routing statico/dinamico, VLAN, STP.', 'Static/dynamic routing, VLAN, STP.'), tools: ['PfSense', 'Ubiquiti'] },
      { name: 'Firewall', level: 90, hands: true, desc: d('Policy, NAT e UTM/NGFW.', 'Policy, NAT and UTM/NGFW.'), tools: ['PfSense', 'Ubiquiti', 'Cloudflare Firewall', 'Cloudflare WAF', 'FortiGate'] },
      { name: 'Virtual Private Cloud (VPC)', level: 90, desc: d('Progettazione VPC sui vari cloud.', 'VPC design across clouds.') },
      { name: 'Zero Trust Networking', level: 85, desc: d('Segmentazione identity-aware con Cloudflare One.', 'Identity-aware segmentation with Cloudflare One.'), tools: ['Cloudflare Zero Trust', 'Cloudflare Tunnels & Access'] },
      { name: 'VPN Solutions', level: 80, hands: true, desc: d('VPN site-to-site e client.', 'Site-to-site and client VPNs.'), tools: ['Tailscale', 'Twingate', 'WireGuard', 'OpenVPN'] },
      { name: 'Load Balancing', level: 90, desc: d('Distribuzione del traffico e alta disponibilità.', 'Traffic distribution and high availability.') },
      { name: 'API Gateway', level: 85, desc: d('Gestione e sicurezza delle API.', 'API management and security.') },
      { name: 'CDN Implementation', level: 80, desc: d('Configurazione e ottimizzazione CDN.', 'CDN configuration and optimization.'), tools: ['Cloudflare CDN', 'Cache Rules', 'Workers Sites'] },
      { name: 'DNS Management', level: 85, desc: d('Architettura e gestione DNS.', 'DNS architecture and management.'), tools: ['Cloudflare DNS', 'Registrar'] },
    ],
  },
  {
    name: { it: 'DevOps & Platform Engineering', en: 'DevOps & Platform Engineering' },
    color: 'var(--color-cat-tool)',
    skills: [
      { name: 'Docker', level: 95, hands: true, desc: d('Container per il packaging delle applicazioni.', 'Containers for application packaging.') },
      { name: 'Git', level: 90, hands: true, desc: d('Version control con Git.', 'Version control with Git.') },
      { name: 'GitHub', level: 90, hands: true, desc: d('Collaborazione, automazione e CI/CD con GitHub.', 'Collaboration, automation and CI/CD with GitHub.') },
      { name: 'GitHub Actions', level: 90, hands: true, desc: d('CI/CD e automazione integrate nei repo.', 'CI/CD and automation integrated in repos.') },
      { name: 'Infrastructure as Code (IaC)', level: 40, desc: d('Terraform, CloudFormation, ARM Templates.', 'Terraform, CloudFormation, ARM Templates.') },
      { name: 'CI/CD Pipelines', level: 70, hands: true, desc: d('Automazione di integrazione e deployment.', 'Integration and deployment automation.') },
      { name: 'Vercel', level: 70, hands: true, desc: d('Deployment e automazione su Vercel.', 'Deployment and automation on Vercel.') },
      { name: 'Heroku', level: 75, desc: d('PaaS per deploy e scaling di web app.', 'PaaS for deploying and scaling web apps.') },
      { name: 'Render', level: 75, desc: d('Deploy di web service, database e siti statici.', 'Deploying web services, databases and static sites.') },
      { name: 'Railway', level: 75, desc: d('Deploy di applicazioni dal codice al cloud.', 'Deploying applications from code to cloud.') },
      { name: 'Netlify', level: 70, desc: d('Hosting di progetti web moderni con edge functions.', 'Hosting modern web projects with edge functions.') },
    ],
  },
  {
    name: { it: 'Automation & Orchestration', en: 'Automation & Orchestration' },
    color: 'var(--color-cat-automation)',
    skills: [
      { name: 'Low-Code Automation', level: 90, hands: true, desc: d('Automazioni componibili con integrazioni API e human-in-the-loop.', 'Composable automations with API integrations and human-in-the-loop.'), tools: ['Make.com', 'n8n', 'Zapier'] },
      { name: 'Serverless Workflows', level: 90, hands: true, desc: d('Processi serverless event-driven.', 'Event-driven serverless processes.'), tools: ['HTTP / Webhooks', 'AWS Step Functions', 'GCP Cloud Functions'] },
      { name: 'Event-Driven Automation', level: 90, desc: d('Sistemi che rispondono a trigger ed eventi.', 'Systems responding to triggers and events.') },
      { name: 'Process Automation', level: 90, desc: d('Automazione e orchestrazione di workflow.', 'Workflow automation and orchestration.') },
      { name: 'Home Assistant', level: 90, hands: true, desc: d('Home automation per IoT e dispositivi smart.', 'Home automation for IoT and smart devices.') },
    ],
  },
  {
    name: { it: 'Observability & Analytics', en: 'Observability & Analytics' },
    color: 'var(--color-cat-cloud)',
    skills: [
      { name: 'Log Analysis', level: 85, hands: true, desc: d('Estrazione di insight da log di sistema e applicazioni.', 'Extracting insights from system and application logs.'), tools: ['Google Cloud Logging', 'SigNoz', 'Graylog'] },
      { name: 'Monitoring & Observability', level: 90, hands: true, desc: d('Pipeline di monitoraggio e visibilità complete.', 'Comprehensive monitoring and visibility pipelines.'), tools: ['Prometheus', 'Grafana', 'Elastic Stack', 'Netdata', 'Glances'] },
      { name: 'Performance Analysis', level: 85, desc: d('Valutazione e ottimizzazione delle prestazioni.', 'Evaluating and optimizing performance.') },
      { name: 'Security Analytics', level: 90, desc: d('Analisi dei dati per insight di sicurezza.', 'Analyzing data for security insights.') },
    ],
  },
  {
    name: { it: 'AI & Machine Intelligence', en: 'AI & Machine Intelligence' },
    color: 'var(--color-cat-ai)',
    skills: [
      { name: 'OpenAI API', level: 99, hands: true, desc: d('App con modelli, API e SDK OpenAI.', 'Apps with OpenAI models, APIs and SDKs.') },
      { name: 'Prompt Engineering', level: 90, hands: true, desc: d('Progettazione e ottimizzazione di prompt per LLM.', 'Designing and optimizing prompts for LLMs.') },
      { name: 'Ollama', level: 90, hands: true, desc: d('Esecuzione e gestione di LLM in locale.', 'Running and managing local LLMs.') },
      { name: 'AI Gateway', level: 80, desc: d('Routing, rate-limiting e observability del traffico LLM.', 'Routing, rate-limiting and observability for LLM traffic.') },
      { name: 'Hugging Face Ecosystem', level: 80, hands: true, desc: d('Modelli, dataset, Inference Endpoints e Spaces.', 'Models, datasets, Inference Endpoints and Spaces.') },
      { name: 'RAG', level: 85, hands: true, desc: d('Pipeline knowledge-grounded per assistenti AI.', 'Knowledge-grounded pipelines for AI assistants.') },
      { name: 'Vector Databases', level: 80, hands: true, desc: d('Schemi e ricerca su vector store (Pinecone, Weaviate).', 'Schemas and search on vector stores (Pinecone, Weaviate).'), tools: ['MongoDB Atlas Vector Store'] },
      { name: 'Qdrant', level: 90, hands: true, desc: d('Motore di similarity search vettoriale.', 'Vector similarity search engine.') },
      { name: 'LangChain', level: 70, desc: d('Framework per app e agent pipeline basate su LLM.', 'Framework for LLM apps and agent pipelines.') },
      { name: 'MCP', level: 90, desc: d('Implementazione e gestione di server/client MCP e tool provider.', 'Implementing and operating MCP servers/clients and tool providers.') },
      { name: 'AI Agent Development & Orchestration', level: 80, desc: d('Agenti autonomi con tool, memoria e guardrail.', 'Autonomous agents with tools, memory and guardrails.') },
      { name: 'Chatbot Development', level: 80, hands: true, desc: d('AI conversazionale multi-canale.', 'Multi-channel conversational AI.') },
      { name: 'Fine-tuning', level: 70, desc: d('Fine-tuning di LLM per task specifici.', 'Fine-tuning LLMs for domain-specific tasks.') },
      { name: 'AI Red Teaming', level: 75, hands: true, desc: d('Test avversariale di sistemi AI per safety e security.', 'Adversarial testing of AI systems for safety and security.'), tools: ['PromptFoo'] },
    ],
  },
  {
    name: { it: 'Infrastructure & Operations', en: 'Infrastructure & Operations' },
    color: 'var(--color-cat-tool)',
    skills: [
      { name: 'Containers', level: 95, hands: true, desc: d('Tecnologie di container oltre Docker.', 'Container technologies beyond Docker.'), tools: ['Proxmox LXC', 'Cloudflare Containers', 'Docker', 'Amazon ECS', 'Portainer'] },
      { name: 'Linux', level: 95, hands: true, desc: d('Amministrazione Linux (Ubuntu, Debian, RHEL, Proxmox).', 'Linux administration (Ubuntu, Debian, RHEL, Proxmox).'), tools: ['Ubuntu', 'Debian', 'RHEL'] },
      { name: 'Windows Server Administration', level: 75, desc: d('AD DS, GPO, ruoli e servizi.', 'AD DS, GPO, roles and services.'), tools: ['Active Directory', 'GPO', 'PowerShell', 'Hyper-V', 'RDS', 'VDI', 'DNS & DHCP', 'Failover Clustering'] },
      { name: 'Proxmox Virtual Environment', level: 99, hands: true, desc: d('VM e LXC, clustering e HA su Proxmox VE.', 'VMs and LXC, clustering and HA on Proxmox VE.') },
      { name: 'VMware ESXi', level: 65, desc: d('Hypervisor VMware per workload enterprise.', 'VMware hypervisor for enterprise workloads.') },
      { name: 'Data Migration', level: 75, desc: d('Migrazioni di workload e dati on-prem → cloud.', 'Workload and data migrations on-prem → cloud.') },
      { name: 'Business Continuity', level: 70, desc: d('BIA, pianificazione e test BCP.', 'BIA, BCP planning and testing.') },
      { name: 'Disaster Recovery', level: 90, desc: d('Pianificazione e implementazione di strategie DR.', 'Planning and implementing DR strategies.') },
      { name: 'High Availability', level: 90, desc: d('Sistemi ridondanti e fault-tolerant.', 'Redundant, fault-tolerant systems.') },
      { name: 'Mail Server Administration', level: 75, desc: d('Postfix/Exchange; DNS/MX/SPF/DKIM/DMARC.', 'Postfix/Exchange; DNS/MX/SPF/DKIM/DMARC.'), tools: ['SMTP', 'IMAP', 'SPF', 'DKIM', 'DMARC'] },
    ],
  },
  {
    name: { it: 'Software Development & Digital Platforms', en: 'Software Development & Digital Platforms' },
    color: 'var(--color-cat-security)',
    skills: [
      { name: 'HTML / CSS', level: 90, desc: d('Sviluppo e design web.', 'Web development and design.') },
      { name: 'Node.js', level: 40, desc: d('Runtime JavaScript per backend e full-stack.', 'JavaScript runtime for backend and full-stack.') },
      { name: 'Python', level: 40, desc: d('Programmazione general-purpose e automazione.', 'General-purpose programming and automation.') },
      { name: 'Android Development', level: 50, desc: d('App Android in Java e Kotlin.', 'Android apps in Java and Kotlin.'), tools: ['PaoloRonco.it App', 'Enclave: password manager'] },
      { name: 'WordPress', level: 90, hands: true, desc: d('Sviluppo e personalizzazione di siti e plugin WordPress.', 'Development and customization of WordPress sites and plugins.') },
      { name: 'Chrome Extensions Development', level: 80, hands: true, desc: d('Estensioni Chrome custom.', 'Custom Chrome extensions.') },
      { name: 'Vibe Coding', level: 100, desc: d('Sviluppo AI-assisted / AI-based.', 'AI-assisted / AI-based development.') },
    ],
  },
  {
    name: { it: 'Professional & Core Skills', en: 'Professional & Core Skills' },
    color: 'var(--color-cat-automation)',
    skills: [
      { name: 'Hardware', level: 100, desc: d('Assemblaggio e troubleshooting hardware.', 'Hardware assembly and troubleshooting.') },
      { name: 'Ticketing Systems', level: 100, desc: d('Sistemi di ticketing e supporto.', 'Ticketing and support systems.'), tools: ['Jira Service Management', 'GLPI'] },
      { name: 'Problem Solving', level: 100 },
      { name: 'Troubleshooting', level: 100 },
      { name: 'Time Management', level: 100 },
      { name: 'Teamwork', level: 100 },
      { name: 'Accounting', level: 30, desc: d('Contabilità e nozioni finanziarie.', 'Accounting and financial basics.') },
      { name: 'Law', level: 30, desc: d('Nozioni legali.', 'Legal basics.') },
    ],
  },
];
