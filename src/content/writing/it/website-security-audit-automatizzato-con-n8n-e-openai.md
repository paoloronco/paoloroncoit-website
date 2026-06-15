---
title: "Website Security Audit automatizzato: con n8n e OpenAI"
description: "Da tempo utilizzo n8n per automatizzare diversi processi, sia nel mio lavoro quotidiano che nei miei progetti personali. È una piattaforma che trovo…"
pubDate: 2025-10-21
tags: []
draft: false
---
Da tempo utilizzo **n8n** per automatizzare diversi processi, sia nel mio lavoro quotidiano che nei miei progetti personali.  
È una piattaforma che trovo estremamente versatile: permette di creare workflow complessi integrando API, servizi cloud, sistemi di monitoraggio e, più di recente, anche **modelli di intelligenza artificiale**.

Tra i vari flussi che ho sperimentato, quello che mi ha dato maggior soddisfazione è il **Website Security Auditor**, basato su un template pubblico disponibile su [n8n.io](https://n8n.io/workflows/3314-websecscan-ai-powered-website-security-auditor/).  
Si tratta di un workflow che effettua un **audit di sicurezza automatico dei siti web**, sfruttando l’AI per analizzare header, configurazioni e codice lato client, e inviare poi un report dettagliato via email.

### La sicurezza come priorità

La sicurezza dei miei siti — e soprattutto quella dei visitatori — è sempre stata una priorità.  
Anche se i miei progetti non gestiscono login, pagamenti o dati sensibili, considero fondamentale prevenire attacchi e vulnerabilità comuni come:

-   **Cross-Site Scripting (XSS)**
-   **Content Injection o Clickjacking**
-   **Configurazioni HTTPS errate**
-   **Mancanza di header di sicurezza fondamentali**

Questi problemi non solo possono compromettere l’esperienza degli utenti, ma in certi casi permettere a malintenzionati di sfruttare i miei siti come vettori di attacco verso altri.  
Automatizzare i controlli di sicurezza mi consente di **mantenere un livello di protezione costante** senza dover eseguire test manuali a ogni aggiornamento.

* * *

### Come funziona il workflow

Il flusso parte in modo semplice: inserisco l’URL del sito da analizzare e n8n esegue una serie di passaggi automatici:

1.  Effettua il **fetch del contenuto** e degli **header HTTP** del sito.
2.  Passa i dati a due moduli AI (basati su **GPT-5**) che eseguono:
    -   un’**analisi delle configurazioni di sicurezza** (HTTP headers, cookie, CSP, HSTS, ecc.);
    -   un’**analisi del contenuto HTML e JavaScript**, per individuare vulnerabilità lato client.
3.  I risultati vengono aggregati e **trasformati in un report HTML professionale**, con un **punteggio di sicurezza (da F ad A+)** e suggerimenti concreti per la correzione.
4.  Infine, il workflow **invia automaticamente il report via email**, completo di grafici e sezioni colorate per una lettura immediata.

È un sistema **non invasivo**, che analizza solo le informazioni pubbliche del sito e restituisce un quadro chiaro del livello di sicurezza.

* * *

### Dai problemi iniziali ai miglioramenti concreti

Quando ho eseguito i primi test su **paoloronco.it**, i punteggi iniziali erano piuttosto bassi (classe **D**).  
Analizzando i risultati e seguendo le raccomandazioni generate dal report, ho implementato varie **Cloudflare Rules** per aggiungere header di sicurezza mancanti, come:

-   `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
-   `X-Content-Type-Options: nosniff`
-   `X-Frame-Options: SAMEORIGIN`
-   `Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()`
-   `Referrer-Policy: strict-origin-when-cross-origin`

Dopo queste modifiche, il punteggio è salito fino ad **A-**, con una configurazione solida e in linea con le best practice.

Ho applicato la stessa logica anche ai miei altri progetti, compresi quelli statici su **Vercel**, tramite il file `vercel.json`, così da estendere facilmente la protezione anche ai sottodomini.

* * *

### Piccole sfide tecniche

L’unico limite riscontrato riguarda i **siti di grandi dimensioni**, dove il modulo di analisi “Security Vulnerabilities Audit” può andare in errore per **input troppo lunghi (token limit)** o **timeout**.  
Per mitigarlo, sto valutando di segmentare l’analisi o di passare a una versione del modello con contesto esteso, così da mantenere l’automazione anche su domini più complessi.

* * *

### Un alleato nella sicurezza

Questo esperimento con n8n mi ha confermato quanto l’automazione possa essere potente anche in ambito **cybersecurity**.  
Un flusso ben progettato permette di:

-   rilevare vulnerabilità in modo proattivo,
-   standardizzare le verifiche di sicurezza,
-   e soprattutto, **integrare l’AI nei processi di auditing quotidiano**.

Per me è diventato un piccolo strumento di routine, utile per garantire che i miei siti restino **sicuri, aggiornati e conformi alle migliori pratiche di sicurezza web** — senza perdere tempo in controlli ripetitivi.

## Security Report di esempio:

# Website Security Audit Report

## Security Report Summary

<table style="width:100%"><tbody><tr><td style="width:120px" valign="top"><div style="font-size:64px;font-weight:bold;width:100px;height:100px;line-height:100px;text-align:center;background-color:#3498db;color:white;border-radius:5px;margin:0 auto">B</div></td><td valign="top"><table style="width:100%"><tbody><tr><td><strong>Site:</strong></td><td><a href="https://paoloronco.it" style="color:#3498db" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://paoloronco.it&amp;source=gmail&amp;ust=1761151872719000&amp;usg=AOvVaw2WmycexRnK0wtJUd0Wxojs">https://paoloronco.it</a></td></tr><tr><td><strong>Report Time:</strong></td><td>October 21, 2025 at 04:50 PM</td></tr><tr><td valign="top"><strong>Headers:</strong></td><td><div class="m_5214027070715621164header-badges"><span style="display:inline-block;margin:2px;padding:4px 8px;background-color:#e74c3c;color:white;border-radius:4px;font-size:12px">✗ Content-Security-Policy</span><span style="display:inline-block;margin:2px;padding:4px 8px;background-color:#27ae60;color:white;border-radius:4px;font-size:12px">✓ Strict-Transport-Security</span><span style="display:inline-block;margin:2px;padding:4px 8px;background-color:#27ae60;color:white;border-radius:4px;font-size:12px">✓ X-Content-Type-Options</span><span style="display:inline-block;margin:2px;padding:4px 8px;background-color:#27ae60;color:white;border-radius:4px;font-size:12px">✓ X-Frame-Options</span><span style="display:inline-block;margin:2px;padding:4px 8px;background-color:#27ae60;color:white;border-radius:4px;font-size:12px">✓ Referrer-Policy</span><span style="display:inline-block;margin:2px;padding:4px 8px;background-color:#27ae60;color:white;border-radius:4px;font-size:12px">✓ Permissions-Policy</span></div></td></tr><tr><td><strong>Critical Issues:</strong></td><td>0</td></tr><tr><td><strong>Warnings:</strong></td><td>3</td></tr></tbody></table></td></tr></tbody></table>

## Warnings

**3 warnings detected**

See the Configuration Issues section below for more info.

## Raw Headers

| Header | Status | Value |
| --- | --- | --- |
| date | present | Tue, 21 Oct 2025 16:50:31 GMT |
| content-type | present | text/html; charset=UTF-8 |
| transfer-encoding | present | chunked |
| connection | present | close |
| report-to | present | {"group":"cf-nel",  
"max\_age":604800,  
"endpoints":\[{"url":"[https://a.nel.cloudflare.com/report/v4?s=1yQ1J5ssSLv1SkmE6Ryid4wgzrlR3AtZbA7JA8sOJg9lH6eilgyRhGgg7o%2FbvORNExuw8i3pZ%2BdOGjAgsb3cT5WNvNn0DM9sHhwJ%2BGo%3D"}\]}](https://a.nel.cloudflare.com/report/v4?s=1yQ1J5ssSLv1SkmE6Ryid4wgzrlR3AtZbA7JA8sOJg9lH6eilgyRhGgg7o%2FbvORNExuw8i3pZ%2BdOGjAgsb3cT5WNvNn0DM9sHhwJ%2BGo%3D) |
| link | present | <[https://paoloronco.it/wp-json/>;  
](https://paoloronco.it/wp-json/%3E;%3Cbr%3E)rel="[" style="color: #3498DB;  
text-decoration: none;  
" target="\_blank">https://api.w.org/",  
](https://api.w.org/)<[https://paoloronco.it/wp-json/wp/v2/pages/1251>;  
](https://paoloronco.it/wp-json/wp/v2/pages/1251%3E;%3Cbr%3E)rel="alternate";  
title="JSON";  
type="application/json",  
<[https://paoloronco.it/>;  
](https://paoloronco.it/%3E;%3Cbr%3E)rel=shortlink |
| server | present | cloudflare |
| vary | present | Accept-Encoding |
| x-powered-by | present | PHP/8.2.28 |
| cf-cache-status | present | DYNAMIC |
| nel | present | {"report\_to":"cf-nel","success\_fraction":0.0,"max\_age":604800} |
| speculation-rules | present | "/cdn-cgi/speculation" |
| strict-transport-security | present | max-age=31536000; includeSubDomains; preload |
| content-security-policy-report-only | present | default-src 'self';  
img-src 'self' data: https:;  
style-src 'self' 'unsafe-inline' https:;  
script-src 'self' 'unsafe-inline' https:;  
font-src 'self' data: https:;  
connect-src 'self' https:;  
frame-ancestors 'self';  
base-uri 'self';  
form-action 'self';  
upgrade-insecure-requests |
| permissions-policy | present | geolocation=(), microphone=(), camera=(), payment=(), usb=(), interest-cohort=() |
| referrer-policy | present | strict-origin-when-cross-origin |
| x-content-type-options | present | nosniff |
| x-frame-options | present | SAMEORIGIN |
| x-xss-protection | present | 0 |
| server-timing | present | cfCacheStatus;desc="DYNAMIC", cfEdge;dur=5,cfOrigin;dur=115 |
| cf-ray | present | 992241206e0ff615-MXP |
| alt-svc | present | h3=":443"; ma=86400 |

## Security Findings

### Vulnerabilities

No vulnerabilities detected.

### Configuration Issues

Strict-Transport-Security

This header is unknown. Value: max-age=31536000; includeSubDomains; preload.

Content-Security-Policy

This header is unknown. Value: default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; script-src 'self' 'unsafe-inline' https:; font-src 'self' data: https:; connect-src 'self' https:; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests.

Permissions-Policy

This header is unknown. Value: geolocation=(), microphone=(), camera=(), payment=(), usb=(), interest-cohort=().

Referrer-Policy

This header is unknown. Value: strict-origin-when-cross-origin.

X-Content-Type-Options

This header is unknown. Value: nosniff.

X-Frame-Options

This header is unknown. Value: SAMEORIGIN.

X-XSS-Protection

This header is unknown. Value: 0.

Content Security Policy - 'unsafe-inline'

The Content Security Policy allows the use of \`'unsafe-inline'\` for both scripts and styles.

X-XSS-Protection

The X-XSS-Protection header is set to \`0\`, meaning that the browser's built-in XSS protection is disabled.

## Additional Information

<table style="width:100%;border-collapse:collapse;margin-top:10px"><tbody><tr><td style="padding:8px;border-bottom:1px solid #eee;color:#3498db;font-weight:bold">access-control-allow-origin</td><td style="padding:8px;border-bottom:1px solid #eee">This is a very lax CORS policy. Such a policy should only be used on a public CDN.</td></tr><tr><td style="padding:8px;border-bottom:1px solid #eee;color:#27ae60;font-weight:bold">strict-transport-security</td><td style="padding:8px;border-bottom:1px solid #eee">HTTP Strict Transport Security is an excellent feature to support on your site and strengthens your implementation of TLS by getting the User Agent to enforce the use of HTTPS.</td></tr><tr><td style="padding:8px;border-bottom:1px solid #eee;color:#27ae60;font-weight:bold">content-security-policy</td><td style="padding:8px;border-bottom:1px solid #eee">Content Security Policy is an effective measure to protect your site from XSS attacks. By whitelisting sources of approved content, you can prevent the browser from loading malicious assets. Analyse this policy in more detail. You can sign up for a free account on Report URI to collect reports about problems on your site.</td></tr><tr><td style="padding:8px;border-bottom:1px solid #eee;color:#27ae60;font-weight:bold">permissions-policy</td><td style="padding:8px;border-bottom:1px solid #eee">Permissions Policy is a new header that allows a site to control which features and APIs can be used in the browser.</td></tr><tr><td style="padding:8px;border-bottom:1px solid #eee;color:#27ae60;font-weight:bold">referrer-policy</td><td style="padding:8px;border-bottom:1px solid #eee">Referrer Policy is a new header that allows a site to control how much information the browser includes with navigations away from a document and should be set by all sites.</td></tr><tr><td style="padding:8px;border-bottom:1px solid #eee;color:#27ae60;font-weight:bold">x-content-type-options</td><td style="padding:8px;border-bottom:1px solid #eee">X-Content-Type-Options stops a browser from trying to MIME-sniff the content type and forces it to stick with the declared content-type. The only valid value for this header is "X-Content-Type-Options: nosniff".</td></tr><tr><td style="padding:8px;border-bottom:1px solid #eee;color:#27ae60;font-weight:bold">x-frame-options</td><td style="padding:8px;border-bottom:1px solid #eee">X-Frame-Options tells the browser whether you want to allow your site to be framed or not. By preventing a browser from framing your site you can defend against attacks like clickjacking.</td></tr><tr><td style="padding:8px;border-bottom:1px solid #eee;color:#3498db;font-weight:bold">report-to</td><td style="padding:8px;border-bottom:1px solid #eee">Report-To enables the Reporting API. This allows a website to collect reports from the browser about various errors that may occur. You can sign up for a free account on Report URI to collect these reports.</td></tr><tr><td style="padding:8px;border-bottom:1px solid #eee;color:#3498db;font-weight:bold">nel</td><td style="padding:8px;border-bottom:1px solid #eee">Network Error Logging is a new header that instructs the browser to send reports during various network or application errors. You can sign up for a free account on Report URI to collect these reports.</td></tr><tr><td style="padding:8px;border-bottom:1px solid #eee;color:#3498db;font-weight:bold">server</td><td style="padding:8px;border-bottom:1px solid #eee">Server value has been changed. Typically you will see values like "Microsoft-IIS/8.0" or "nginx 1.7.2".</td></tr></tbody></table>

## Implementation Guide

This report highlights security issues detected through client-side analysis. For a comprehensive security assessment, consider engaging a professional penetration tester.

**To implement the fixes above:**

1.  Work with your development team to address each issue in order of criticality
2.  Retest after implementing each fix
3.  Consider implementing a web application firewall for additional protection

This report was automatically generated and represents an automated assessment of publicly accessible aspects of your website. For a more comprehensive security assessment, consider engaging with a professional security consultant.

© 2025 Website Security Scanner | Generated on October 21, 2025 at 04:50 PM

  
  
\---  
_This email was sent automatically with [n8n](https://n8n.io/?utm_source=n8n-internal&utm_medium=powered_by&utm_campaign=n8n-nodes-base.gmail_9d797abf871ff7776b72030f386aac63fbb09752ce3bb94854a66e7091951bfc)_
