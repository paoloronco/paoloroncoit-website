// Motore di riconoscimento certificazioni.
// Scrivi solo la stringa della cert: ente, logo, nome e colore vengono dedotti.
// Nessun fetch dal web, nessun logo scaricato a runtime.
//
// • Se l'ente ha un logo locale in /public/logos/<logo>.svg → usa quello.
// • Altrimenti → monogramma generato (iniziali), 100% originale, zero copyright.
//
// Metti a `false` per usare SEMPRE i monogrammi (massima sicurezza copyright):
export const USE_ISSUER_LOGOS = true;

interface Issuer {
  id: string;
  name: string;
  keywords: string[]; // alias normalizzati per il matching
  color: string;
  logo?: string; // file in /public/logos/<logo>.svg (se presente)
  mark?: string; // testo del monogramma quando non c'è logo (es. "AWS")
}

// Ordine = priorità: i più specifici prima (es. "Google Cloud" prima di "Google").
const ISSUERS: Issuer[] = [
  { id: 'googlecloud', name: 'Google Cloud', keywords: ['google cloud', 'gcp'], color: 'var(--color-cat-cloud)', logo: 'googlecloud' },
  { id: 'google', name: 'Google', keywords: ['google'], color: 'var(--color-accent)', logo: 'google' },
  { id: 'aws', name: 'AWS', keywords: ['aws', 'amazon web services', 'amazon'], color: 'var(--color-cat-automation)', mark: 'AWS' },
  { id: 'comptia', name: 'CompTIA', keywords: ['comptia'], color: 'var(--color-cat-security)', logo: 'comptia' },
  { id: 'cisco', name: 'Cisco', keywords: ['cisco', 'netcad', 'netacad'], color: 'var(--color-cat-cloud)', logo: 'cisco' },
  { id: 'intel', name: 'Intel', keywords: ['intel'], color: 'var(--color-accent)', logo: 'intel' },
  { id: 'splunk', name: 'Splunk', keywords: ['splunk'], color: 'var(--color-cat-ai)', logo: 'splunk' },
  { id: 'microsoft', name: 'Microsoft', keywords: ['microsoft', 'azure', 'az-900', 'sc-900'], color: 'var(--color-cat-cloud)' },
  { id: 'oracle', name: 'Oracle', keywords: ['oracle', 'oci'], color: 'var(--color-cat-security)' },
  { id: 'isc2', name: 'ISC2', keywords: ['isc2', 'cissp', 'cc certified'], color: 'var(--color-cat-ai)' },
  { id: 'ec-council', name: 'EC-Council', keywords: ['ec-council', 'ceh'], color: 'var(--color-cat-automation)' },
  { id: 'offsec', name: 'OffSec', keywords: ['offensive security', 'offsec', 'oscp'], color: 'var(--color-cat-security)' },
  { id: 'hashicorp', name: 'HashiCorp', keywords: ['hashicorp', 'terraform'], color: 'var(--color-cat-ai)' },
];

export interface ResolvedCert {
  raw: string;
  name: string; // nome senza il prefisso dell'ente
  issuer: string;
  color: string;
  logo: string | null; // path locale o null → usa monogramma
  initials: string;
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // rimuove accenti/diacritici
    .replace(/\s+/g, ' ')
    .trim();

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

// Rimuove il nome/alias dell'ente se è in testa alla stringa.
function stripIssuer(raw: string, issuer: Issuer): string {
  let out = raw.trim();
  const tokens = [issuer.name, ...issuer.keywords].sort((a, b) => b.length - a.length);
  for (const t of tokens) {
    const re = new RegExp('^' + escapeRe(t) + '\\b[\\s:·–—-]*', 'i');
    if (re.test(out)) {
      const stripped = out.replace(re, '').trim();
      if (stripped) return stripped;
    }
  }
  return out;
}

export function resolveCert(raw: string): ResolvedCert {
  const norm = normalize(raw);
  const issuer =
    ISSUERS.find((i) => i.keywords.some((k) => norm.includes(normalize(k)))) ?? null;

  if (!issuer) {
    // Ente sconosciuto → monogramma dalla prima parola.
    const first = raw.trim().split(/\s+/)[0] ?? raw;
    return {
      raw,
      name: raw.trim(),
      issuer: '—',
      color: 'var(--color-accent)',
      logo: null,
      initials: first.slice(0, 2).toUpperCase(),
    };
  }

  const hasLogo = USE_ISSUER_LOGOS && !!issuer.logo;
  return {
    raw,
    name: stripIssuer(raw, issuer),
    issuer: issuer.name,
    color: issuer.color,
    logo: hasLogo ? `/logos/${issuer.logo}.svg` : null,
    initials: issuer.mark ?? initialsOf(issuer.name),
  };
}
