// Edge proxy per l'assistente AI (Vercel Serverless Function).
// Il sito è statico: il token del webhook n8n NON deve stare nel client.
// Questa funzione custodisce le credenziali (env) e inoltra a n8n.
//
// Env richieste (Vercel → Settings → Environment Variables):
//   N8N_WEBHOOK_URL         es. https://n8n.prhomelab.com/webhook/wp-ai-chatbot
//   N8N_AUTH_HEADER_NAME    es. Authorization        (opzionale, default Authorization)
//   N8N_AUTH_HEADER_VALUE   es. Bearer <token>
//   SITE_HOME_URL           es. https://paoloronco.it/   (opzionale)

export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) return res.status(500).json({ error: 'not_configured' });

  const headerName = process.env.N8N_AUTH_HEADER_NAME || 'Authorization';
  const headerValue = process.env.N8N_AUTH_HEADER_VALUE || '';
  const siteUrl = process.env.SITE_HOME_URL || 'https://paoloronco.it/';

  // body può arrivare già parsato (oggetto) o come stringa
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};
  const message = String(body.message || '').trim().slice(0, 2000);
  const sessionId = String(body.sessionId || '').slice(0, 100);
  if (!message) return res.status(400).json({ error: 'empty_message' });

  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
  if (headerValue) headers[headerName] = headerValue;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 55000);
  try {
    const upstream = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message, sessionId, url: siteUrl }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    const raw = await upstream.text();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');

    if (!upstream.ok) {
      return res.status(502).json({ error: 'upstream_error', status: upstream.status });
    }
    // Inoltra il JSON di n8n così com'è; se è testo, lo incapsula.
    try {
      return res.status(200).json(JSON.parse(raw));
    } catch {
      return res.status(200).json({ type: 'message', reply: raw });
    }
  } catch (e) {
    clearTimeout(timer);
    const aborted = e && e.name === 'AbortError';
    return res.status(aborted ? 504 : 502).json({ error: aborted ? 'timeout' : 'proxy_error' });
  }
}
