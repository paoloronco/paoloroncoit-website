// Proxy server-side per l'assistente AI (Astro endpoint, on-demand su Vercel).
// Custodisce le credenziali del webhook n8n (env) e inoltra la richiesta.
// Il sito resta statico: solo questa route gira lato server (prerender = false).
//
// Env (Vercel → Settings → Environment Variables):
//   N8N_WEBHOOK_URL         es. https://n8n.prhomelab.com/webhook/wp-ai-chatbot
//   N8N_AUTH_HEADER_NAME    es. Authorization        (opzionale, default Authorization)
//   N8N_AUTH_HEADER_VALUE   es. Bearer <token>
//   SITE_HOME_URL           es. https://paoloronco.it/   (opzionale)
import type { APIRoute } from 'astro';

export const prerender = false;

const env = (k: string) => process.env[k] || '';

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

// Health-check minimale: conferma che la funzione è attiva e le env presenti.
// Non espone alcun dato sensibile.
export const GET: APIRoute = async () =>
  json({
    ok: true,
    configured: Boolean(env('N8N_WEBHOOK_URL')) && Boolean(env('N8N_AUTH_HEADER_VALUE')),
  });

export const POST: APIRoute = async ({ request }) => {
  const url = env('N8N_WEBHOOK_URL');
  if (!url) return json({ error: 'not_configured' }, 500);

  const headerName = env('N8N_AUTH_HEADER_NAME') || 'Authorization';
  const headerValue = env('N8N_AUTH_HEADER_VALUE');
  const siteUrl = env('SITE_HOME_URL') || 'https://paoloronco.it/';

  let body: any = {};
  try { body = await request.json(); } catch { body = {}; }
  const message = String(body?.message || '').trim().slice(0, 2000);
  const sessionId = String(body?.sessionId || '').slice(0, 100);
  if (!message) return json({ error: 'empty_message' }, 400);

  const headers: Record<string, string> = { 'Content-Type': 'application/json', Accept: 'application/json' };
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
    if (!upstream.ok) return json({ error: 'upstream_error', status: upstream.status }, 502);
    try {
      return json(JSON.parse(raw), 200);
    } catch {
      return json({ type: 'message', reply: raw }, 200);
    }
  } catch (e: any) {
    clearTimeout(timer);
    const aborted = e && e.name === 'AbortError';
    return json({ error: aborted ? 'timeout' : 'proxy_error' }, aborted ? 504 : 502);
  }
};
