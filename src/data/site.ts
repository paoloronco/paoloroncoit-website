// Dati centrali del sito e del profilo. Punto unico di verità.
export const enterpriseSecurityArea = 'Enterprise Cloud & AI Security Team';

export const site = {
  name: 'Paolo Ronco',
  role: 'Cyber Security Analyst',
  // Descrizione neutra — usata solo per <meta> / SEO, non in pagina.
  description:
    'Cyber Security Analyst in Deloitte, Enterprise Cloud & AI Security Team. Security, AI/LLM, automazione e homelab.',
  domains: ['Security', 'AI / LLM', 'Automation', 'Cloud', 'DevSecOps'],
  email: 'info@paoloronco.it',
  url: 'https://paoloronco.it',
  socials: {
    github: 'https://github.com/paoloronco',
    huggingface: 'https://huggingface.co/paoloronco',
    linkedin: 'https://www.linkedin.com/in/paolo-ronco-685a5722a',
  },
} as const;

export const nav = [
  { href: '/cv', label: 'CV' },
  { href: '/skills', label: 'Skills' },
  { href: '/work', label: 'Work' },
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
] as const;

// Breve presentazione per la home (rifinisci con le tue parole).
export const intro =
  `Cyber Security Analyst in Deloitte, nell'${enterpriseSecurityArea}. Mi occupo di sicurezza cloud, infrastrutture e AI applicata alla difesa. Nel mio homelab metto le mani su automazioni, LLM e tutto ciò che vale la pena capire a fondo.`;

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
