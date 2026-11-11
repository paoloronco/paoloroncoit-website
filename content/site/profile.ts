// Dati centrali del sito e del profilo. Punto unico di verità.
export const enterpriseSecurityArea = 'Enterprise Cloud & AI Security Team';

export const site = {
  name: 'Paolo Ronco',
  role: 'Cybersecurity Analyst',
  // Sintesi SEO per lingua, coerente con l'introduzione della home.
  description: {
    it: 'Cybersecurity Analyst presso Deloitte: Security Operations, SIEM e assessment. Progetti personali in cloud, software e automazione. Interessi in DevSecOps e AI.',
    en: 'Cybersecurity Analyst at Deloitte: Security Operations, SIEM and assessments. Personal cloud, software and automation projects. Interests in DevSecOps and AI.',
  },
  domains: ['Security', 'AI / LLM', 'Automation', 'Cloud', 'DevSecOps'],
  email: 'info@paoloronco.it',
  url: 'https://paoloronco.it',
  socials: {
    github: 'https://github.com/paoloronco',
    huggingface: 'https://huggingface.co/paoloronco',
    linkedin: 'http://linkedin.com/in/paolo-ronco',
    readytensor: 'https://app.readytensor.ai/users/paolo.ronco2000',
    n8n: 'https://n8n.io/creators/paoloronco/',
    repo: 'https://github.com/paoloronco/paoloroncoit-website',
  },
} as const;

export const nav = [
  { href: '/cv', label: 'CV' },
  { href: '/skills', label: 'Skills' },
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

// Breve presentazione per la home (rifinisci con le tue parole).
export const intro =
  `Cybersecurity Analyst in Deloitte, nell'${enterpriseSecurityArea}. Mi occupo di sicurezza cloud, infrastrutture e AI. Nel mio homelab metto le mani su automazioni, LLM e tutto ciò che vale la pena capire a fondo.`;

// Aree di competenza con descrizione + colore. Riempie la home con sostanza.
export const areas = [
  { key: 'security', title: 'Cyber Security', desc: 'Threat detection, hardening, incident response.', color: 'var(--color-cat-security)' },
  { key: 'ai', title: 'AI / LLM', desc: 'RAG, agenti e modelli self-hosted, applicati sul serio.', color: 'var(--color-cat-ai)' },
  { key: 'automation', title: 'Automazione', desc: 'Workflow n8n e pipeline che tolgono lavoro ripetitivo.', color: 'var(--color-cat-automation)' },
  { key: 'cloud', title: 'Cloud & DevSecOps', desc: 'Container, CI/CD e sicurezza dentro il ciclo di sviluppo.', color: 'var(--color-cat-cloud)' },
] as const;

// Mappa colore per categoria progetto (usata nelle card e nei dettagli).
export const categoryColors: Record<string, string> = {
  security: 'var(--color-cat-security)',
  ai: 'var(--color-cat-ai)',
  automation: 'var(--color-cat-automation)',
  cloud: 'var(--color-cat-cloud)',
  tool: 'var(--color-cat-tool)',
};
