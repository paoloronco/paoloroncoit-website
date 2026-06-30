export type CertificateAssetType = 'pdf' | 'image' | 'web' | 'text';

export interface CertificateAsset {
  label: string;
  type: CertificateAssetType;
  file?: string;
  url?: string;
}

export interface CertificateEntry {
  title: string;
  assets: CertificateAsset[];
}

export const certificateEntries: CertificateEntry[] = [
  {
    title: 'CompTIA Security+ ce certificate',
    assets: [{ label: 'PDF', type: 'pdf', file: '1 CompTIA Security+ ce certificate.pdf' }],
  },
  {
    title: 'CompTIA AI Essentials',
    assets: [
      { label: 'PDF', type: 'pdf', file: '1a CompTIA-AI-Essentials.pdf' },
      { label: 'Preview', type: 'image', file: 'CompTIA AI Essentials.webp' },
    ],
  },
  {
    title: 'Splunk Core Certified User',
    assets: [{ label: 'PDF', type: 'pdf', file: '10 SplunkCoreCertifiedUser.pdf' }],
  },
  {
    title: 'Google Cyber Security Professional Certificate',
    assets: [{ label: 'PDF', type: 'pdf', file: '10 Coursea - Google Cyber Security Professional Certificate.pdf' }],
  },
  {
    title: 'Google Cloud Digital Leader',
    assets: [{ label: 'PDF', type: 'pdf', file: 'CloudDigitalLeader20260427-32-hy8vki.pdf' }],
  },
  {
    title: 'Google Cloud Generative AI Leader',
    assets: [{ label: 'PDF', type: 'pdf', file: 'GenerativeAILeader20251024-30-a9cl88.pdf' }],
  },
  {
    title: 'EC-Council Ethical Hacking Essentials',
    assets: [{ label: 'PDF', type: 'pdf', file: '2 EcCouncil Ethical Hacking Essentials - EHE.pdf' }],
  },
  {
    title: 'Cisco NetAcad - Get Connected',
    assets: [{ label: 'PDF', type: 'pdf', file: '3 Cisco NetCAD - Get Connected 2022.pdf' }],
  },
  {
    title: 'Cisco NetAcad - Introduction to CyberSecurity',
    assets: [{ label: 'PDF', type: 'pdf', file: '4 Cisco NetCAD - Introduction to CyberSecurity 2022.pdf' }],
  },
  {
    title: 'Cisco NetAcad - NDG Linux Unhatched',
    assets: [{ label: 'PDF', type: 'pdf', file: '5 Cisco NetCAD - NDG Linux Unchained.pdf' }],
  },
  {
    title: 'Google Fondamenti di Marketing Digitale',
    assets: [{ label: 'PDF', type: 'pdf', file: '6 Google Fondamenti di Marketing Digitale.pdf' }],
  },
  {
    title: 'Google IT Support - Technical Support Fundamentals',
    assets: [{ label: 'PDF', type: 'pdf', file: '7 Coursea - Google IT Support - Technical Support Fundamentals.pdf' }],
  },
  {
    title: 'IBM Introduction to Hardware and Operating Systems',
    assets: [{ label: 'PDF', type: 'pdf', file: '8 Coursea - IBM - Introduction to Hardware and Operating Systems.pdf' }],
  },
  {
    title: 'Intel Network Academy - Network Transformation 101',
    assets: [{ label: 'PDF', type: 'pdf', file: '9 Coursea - Intel\u00ae Network Academy - Network Transformation 101.pdf' }],
  },
  {
    title: 'Google Cloud Skill Boost - Security & Identify Fundamentals',
    assets: [
      { label: 'Badge', type: 'web', url: 'https://www.cloudskillsboost.google/public_profiles/394043de-e04e-4006-afaf-02a2608acfc8/badges/3634227' },
      { label: 'Image', type: 'image', file: '11a - Google Cloud Skill Boost - Security & Identify Fundamentals.png' },
    ],
  },
  {
    title: 'Google Cloud Skill Boost - Networking Fundamentals in Google Cloud',
    assets: [
      { label: 'Badge', type: 'web', url: 'https://www.cloudskillsboost.google/public_profiles/394043de-e04e-4006-afaf-02a2608acfc8/badges/3569015' },
      { label: 'Image', type: 'image', file: '12a - Google Cloud Skill Boost - Networking Fundamentals in Google Cloud.png' },
    ],
  },
  {
    title: 'Google Cloud Skill Boost - Baseline Infrastructure',
    assets: [
      { label: 'Badge', type: 'web', url: 'https://www.cloudskillsboost.google/public_profiles/394043de-e04e-4006-afaf-02a2608acfc8/badges/3552518' },
      { label: 'Image', type: 'image', file: '13a - Google Cloud Skill Boost - Baseline Infrastructure.png' },
    ],
  },
  {
    title: 'Google Cloud Skill Boost - Google Cloud Essentials',
    assets: [
      { label: 'Badge', type: 'web', url: 'https://www.cloudskillsboost.google/public_profiles/394043de-e04e-4006-afaf-02a2608acfc8/badges/3551976' },
      { label: 'Image', type: 'image', file: '14a - Google Cloud Skill Boost - Google Cloud Essentials.png' },
    ],
  },
  {
    title: 'AWS CAWS Knowledge Cloud Essentials',
    assets: [{ label: 'PDF', type: 'pdf', file: '15 AWS CAWS Knowledge Cloud Essentials.pdf' }],
  },
  {
    title: 'Corso Crescere in digitale',
    assets: [{ label: 'PDF', type: 'pdf', file: '16 - certificato Corso Crescere in digitale.pdf' }],
  },
];
