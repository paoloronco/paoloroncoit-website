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
  issuer?: string;
  credlyUrl?: string;
}

export const certificateEntries: CertificateEntry[] = [
  {
    title: 'CompTIA Security+ ce certificate',
    assets: [{ label: 'PDF', type: 'pdf', file: '1 CompTIA Security+ ce certificate.pdf' }],
    credlyUrl: 'https://www.credly.com/badges/048d7003-e8dc-42bd-80bc-bbeb3363935e/public_url',
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
    credlyUrl: 'https://www.credly.com/badges/19c29e50-8af9-4694-8b2a-4d7c96852dff/public_url',
  },
  {
    title: 'Google Cyber Security Professional Certificate',
    assets: [{ label: 'PDF', type: 'pdf', file: '10 Coursea - Google Cyber Security Professional Certificate.pdf' }],
  },
  {
    title: 'Google Cloud Digital Leader',
    assets: [{ label: 'PDF', type: 'pdf', file: 'CloudDigitalLeader20260427-32-hy8vki.pdf' }],
    credlyUrl: 'https://www.credly.com/badges/f784e7c8-ff56-4a3d-a8e8-e12848b65338/public_url',
  },
  {
    title: 'Google Cloud Associate Cloud Engineer',
    assets: [{ label: 'PDF', type: 'pdf', file: 'AssociateCloudEngineer20260708-7-owa87.pdf' }],
    credlyUrl: 'https://www.credly.com/badges/c42d90b5-3599-44eb-bc01-a3b7b169bf02/public_url',
  },
  {
    title: 'Google Cloud Generative AI Leader',
    assets: [{ label: 'PDF', type: 'pdf', file: 'GenerativeAILeader20251024-30-a9cl88.pdf' }],
    credlyUrl: 'https://www.credly.com/badges/85b3d2c8-0c26-42bb-bdbd-11eff3fc1cae/public_url',
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
    credlyUrl: 'https://www.credly.com/badges/41b33068-9f15-4115-ac35-831b0511825b/public_url',
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
    issuer: 'IBM',
    assets: [{ label: 'PDF', type: 'pdf', file: '8 Coursea - IBM - Introduction to Hardware and Operating Systems.pdf' }],
    credlyUrl: 'https://www.credly.com/badges/03c76a77-5912-4d43-8a72-443ac27b65c1/public_url',
  },
  {
    title: 'Intel Network Academy - Network Transformation 101',
    assets: [{ label: 'PDF', type: 'pdf', file: '9 Coursea - Intel\u00ae Network Academy - Network Transformation 101.pdf' }],
  },
  {
    title: 'AWS CAWS Knowledge Cloud Essentials',
    assets: [{ label: 'PDF', type: 'pdf', file: '15 AWS CAWS Knowledge Cloud Essentials.pdf' }],
    credlyUrl: 'https://www.credly.com/badges/6559468a-3210-46af-ad7e-cee6ef23eea2/public_url',
  },
  {
    title: 'Corso Crescere in digitale',
    issuer: 'Unioncamere + Google',
    assets: [{ label: 'PDF', type: 'pdf', file: '16 - certificato Corso Crescere in digitale.pdf' }],
  },
];
