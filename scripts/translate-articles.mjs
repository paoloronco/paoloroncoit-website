// Traduce gli articoli IT -> EN usando un LLM (API OpenAI-compatibile).
// Funziona con OpenAI cloud OPPURE con Ollama locale (gratis).
//
// Esempi d'uso (funzionano in PowerShell, CMD e bash):
//   node scripts/translate-articles.mjs                          # default: Ollama + qwen2.5:7b
//   node scripts/translate-articles.mjs --model gemma2:9b        # modello diverso
//   node scripts/translate-articles.mjs --limit 5                # prova solo i primi 5
//   node scripts/translate-articles.mjs --model gpt-4o-mini --key sk-...   # OpenAI
//   node scripts/translate-articles.mjs --force                  # ritraduce anche gli esistenti
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const IT = path.join(root, 'src', 'content', 'writing', 'it');
const EN = path.join(root, 'src', 'content', 'writing', 'en');

// --- argomenti CLI (hanno priorità sulle variabili d'ambiente) ---
const argv = process.argv.slice(2);
const arg = (name) => {
  const i = argv.indexOf('--' + name);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : undefined;
};
const has = (name) => argv.includes('--' + name);

const BASE = arg('base') || process.env.LLM_BASE_URL || 'http://localhost:11434/v1';
const MODEL = arg('model') || process.env.LLM_MODEL || 'qwen2.5:7b';
const KEY = arg('key') || process.env.LLM_API_KEY || 'ollama';
const LIMIT = arg('limit') ? parseInt(arg('limit'), 10) : process.env.LIMIT ? parseInt(process.env.LIMIT, 10) : Infinity;
const FORCE = has('force') || !!process.env.FORCE;

fs.mkdirSync(EN, { recursive: true });

const SYSTEM = `You are a professional translator. Translate the given Markdown article from Italian to English.
Rules:
- Output ONLY the translated Markdown file, nothing else (no comments, no fences around it).
- Keep the YAML frontmatter delimiters (---) and ALL its keys.
- Translate ONLY the values of "title" and "description". Keep "pubDate", "tags", "draft" EXACTLY as they are.
- Preserve all Markdown structure, code blocks, inline code, URLs, image paths and HTML exactly.
- Do NOT translate code, commands, file paths, URLs, brand/product names.
- Natural, fluent technical English.`;

async function translate(md) {
  const res = await fetch(`${BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.2,
      messages: [
        { role: 'system', content: SYSTEM },
        { role: 'user', content: md },
      ],
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const j = await res.json();
  let out = j.choices?.[0]?.message?.content ?? '';
  // pulizia: rimuove eventuali fence ```markdown ... ``` aggiunti dal modello
  out = out.replace(/^```[a-z]*\n?/i, '').replace(/\n?```\s*$/i, '').trim();
  // rimuove eventuale preambolo prima del frontmatter (es. "Here is the translation:")
  const idx = out.indexOf('---');
  if (idx > 0) out = out.slice(idx);
  return out + '\n';
}

const files = fs.readdirSync(IT).filter((f) => f.endsWith('.md'));
let done = 0, skip = 0, fail = 0;

for (const f of files) {
  if (done >= LIMIT) break;
  const dest = path.join(EN, f);
  if (!FORCE && fs.existsSync(dest)) { skip++; continue; }
  const md = fs.readFileSync(path.join(IT, f), 'utf8');
  process.stdout.write(`→ ${f} ... `);
  try {
    const en = await translate(md);
    if (!en.startsWith('---')) throw new Error('output senza frontmatter');
    fs.writeFileSync(dest, en, 'utf8');
    console.log('ok');
    done++;
  } catch (e) {
    console.log('FAIL ' + e.message);
    fail++;
  }
}

console.log(`\n✅ Tradotti ${done} · saltati ${skip} (già presenti) · falliti ${fail}`);
console.log(`   Modello: ${MODEL} @ ${BASE}`);
