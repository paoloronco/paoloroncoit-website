// Testi legali del sito — Privacy Policy, Termini e Condizioni, Cookie Policy.
// Bilingue IT/EN. Contenuto reso in .prose tramite set:html.
// NB: documento informativo allineato a GDPR (Reg. UE 2016/679) e normativa IT;
// per una conformità piena è consigliata una revisione legale.

import type { Lang } from '@/i18n/ui';
type LS = Record<Lang, string>;

export const legalUpdated = '2026-06-20';

export interface LegalDoc {
  title: LS;
  description: LS;
  html: LS;
}

export type LegalKey = 'privacy' | 'terms' | 'cookie';

export const legal: Record<LegalKey, LegalDoc> = {
  // ============================================================ PRIVACY
  privacy: {
    title: { it: 'Privacy Policy', en: 'Privacy Policy' },
    description: {
      it: 'Informativa sul trattamento dei dati personali di paoloronco.it ai sensi del GDPR.',
      en: 'Information on the processing of personal data of paoloronco.it under the GDPR.',
    },
    html: {
      it: `
<p>La presente informativa descrive le modalità di trattamento dei dati personali degli utenti che consultano il sito <strong>paoloronco.it</strong> (di seguito, il "Sito"), ai sensi del Regolamento (UE) 2016/679 ("GDPR") e del D.Lgs. 196/2003 e ss.mm.ii. ("Codice Privacy").</p>

<h2>1. Titolare del trattamento</h2>
<p>Titolare del trattamento è <strong>Paolo Ronco</strong>, contattabile all'indirizzo email <a href="mailto:info@paoloronco.it">info@paoloronco.it</a>. Ulteriori dati identificativi e di contatto del Titolare sono disponibili su richiesta.</p>

<h2>2. Tipologie di dati trattati</h2>
<p>Il Sito è un sito personale a carattere divulgativo e non prevede registrazione degli utenti. I dati trattati sono limitati a quanto segue:</p>
<ul>
  <li><strong>Dati di navigazione e tecnici.</strong> I sistemi informatici e le procedure software preposte al funzionamento del Sito acquisiscono, nel normale esercizio, alcuni dati la cui trasmissione è implicita nell'uso dei protocolli di comunicazione di Internet (es. indirizzo IP, tipo di browser e dispositivo, sistema operativo, data e ora della richiesta, pagine visitate, referrer). Tali dati sono trattati dai fornitori di hosting e di rete/sicurezza per finalità tecniche, statistiche aggregate e di sicurezza.</li>
  <li><strong>Dati di misurazione e statistica (cookie e tecnologie simili).</strong> Previo consenso, il Sito utilizza strumenti di analisi del traffico. Per il dettaglio si rimanda alla <a href="/cookie">Cookie Policy</a>.</li>
  <li><strong>Dati di contatto.</strong> Se l'utente sceglie di scrivere all'indirizzo email indicato, verranno trattati i dati contenuti nella comunicazione (es. indirizzo email, nome, contenuto del messaggio).</li>
</ul>

<h2>3. Finalità e basi giuridiche del trattamento</h2>
<table>
  <thead><tr><th>Finalità</th><th>Base giuridica (art. 6 GDPR)</th></tr></thead>
  <tbody>
    <tr><td>Erogazione e funzionamento del Sito, sicurezza e prevenzione abusi</td><td>Legittimo interesse del Titolare (art. 6.1.f)</td></tr>
    <tr><td>Statistiche di utilizzo e miglioramento dei contenuti (analytics)</td><td>Consenso dell'interessato (art. 6.1.a)</td></tr>
    <tr><td>Riscontro a richieste inviate via email</td><td>Riscontro a richiesta dell'interessato (art. 6.1.b/f)</td></tr>
    <tr><td>Adempimento di obblighi di legge</td><td>Obbligo legale (art. 6.1.c)</td></tr>
  </tbody>
</table>

<h2>4. Strumenti e fornitori (responsabili e terze parti)</h2>
<p>Per l'erogazione del Sito il Titolare si avvale di fornitori che possono trattare dati in qualità di responsabili del trattamento o titolari autonomi. I principali sono:</p>
<ul>
  <li><strong>OVHcloud (OVH SAS)</strong> — registrazione del dominio.</li>
  <li><strong>Cloudflare, Inc.</strong> — gestione DNS, CDN, sicurezza/WAF e protezione dagli attacchi.</li>
  <li><strong>Vercel Inc.</strong> — hosting e distribuzione del Sito. L'infrastruttura di hosting potrebbe in futuro essere modificata (anche verso una soluzione self-hosted basata su Linux, Docker, NGINX e Cloudflare Zero Trust): la presente informativa sarà aggiornata di conseguenza.</li>
  <li><strong>Zoho Corporation (Zoho Mail)</strong> — gestione della casella di posta elettronica per le comunicazioni.</li>
  <li><strong>Google Ireland Ltd / Google LLC</strong> — Google Analytics e Google Search Console.</li>
  <li><strong>Microsoft Ireland / Microsoft Corporation</strong> — Microsoft Clarity (analisi di utilizzo), ove attivo.</li>
  <li><strong>CookieYes Limited</strong> — piattaforma di gestione del consenso ai cookie (CMP).</li>
</ul>
<p>L'elenco aggiornato dei responsabili del trattamento è disponibile su richiesta scrivendo al Titolare.</p>

<h2>5. Trasferimento dei dati extra-UE</h2>
<p>Alcuni fornitori (in particolare Cloudflare, Vercel, Google e Microsoft) possono trattare dati al di fuori dello Spazio Economico Europeo, anche negli Stati Uniti. Tali trasferimenti avvengono nel rispetto degli artt. 44 e ss. del GDPR, sulla base di garanzie adeguate quali le Clausole Contrattuali Standard della Commissione europea e/o l'adesione al <em>EU-U.S. Data Privacy Framework</em>.</p>

<h2>6. Periodo di conservazione</h2>
<p>I dati di navigazione e i log tecnici sono conservati per il tempo strettamente necessario alle finalità tecniche e di sicurezza, secondo le politiche dei rispettivi fornitori. I dati statistici sono conservati secondo i tempi di ritenzione configurati negli strumenti di analisi. Le comunicazioni email sono conservate per il tempo necessario a gestire la richiesta e per i successivi adempimenti.</p>

<h2>7. Diritti dell'interessato</h2>
<p>In qualità di interessato, hai il diritto di esercitare, nei limiti e alle condizioni previste dagli artt. 15-22 del GDPR:</p>
<ul>
  <li>accesso ai tuoi dati personali;</li>
  <li>rettifica dei dati inesatti o integrazione di quelli incompleti;</li>
  <li>cancellazione ("diritto all'oblio");</li>
  <li>limitazione del trattamento;</li>
  <li>portabilità dei dati;</li>
  <li>opposizione al trattamento basato sul legittimo interesse;</li>
  <li>revoca del consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento effettuato prima della revoca.</li>
</ul>
<p>Per esercitare i tuoi diritti puoi scrivere a <a href="mailto:info@paoloronco.it">info@paoloronco.it</a>. Hai inoltre il diritto di proporre reclamo all'Autorità Garante per la protezione dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener">garanteprivacy.it</a>).</p>

<h2>8. Cookie</h2>
<p>Il Sito utilizza cookie e tecnologie simili. Per ogni dettaglio sulle tipologie, le finalità e la gestione del consenso, consulta la <a href="/cookie">Cookie Policy</a>.</p>

<h2>9. Sicurezza</h2>
<p>Il Titolare adotta misure tecniche e organizzative adeguate a proteggere i dati da accessi non autorizzati, perdita o divulgazione, tra cui cifratura del traffico (HTTPS), protezione perimetrale e filtraggio del traffico tramite il provider di sicurezza.</p>

<h2>10. Modifiche alla presente informativa</h2>
<p>Il Titolare si riserva di modificare o aggiornare la presente informativa, anche a seguito di variazioni normative o dei fornitori utilizzati. La versione vigente è sempre pubblicata su questa pagina, con indicazione della data di ultimo aggiornamento.</p>

<h2>11. Contatti</h2>
<p>Per qualsiasi domanda relativa al trattamento dei dati personali: <a href="mailto:info@paoloronco.it">info@paoloronco.it</a>.</p>
`,
      en: `
<p>This notice describes how the personal data of users visiting <strong>paoloronco.it</strong> (the "Site") is processed, pursuant to Regulation (EU) 2016/679 ("GDPR") and applicable Italian law.</p>

<h2>1. Data Controller</h2>
<p>The Data Controller is <strong>Paolo Ronco</strong>, reachable at <a href="mailto:info@paoloronco.it">info@paoloronco.it</a>. Further identification and contact details of the Controller are available on request.</p>

<h2>2. Types of data processed</h2>
<p>The Site is a personal, informational website and does not require user registration. The data processed is limited to the following:</p>
<ul>
  <li><strong>Navigation and technical data.</strong> The systems and software running the Site acquire, during normal operation, certain data whose transmission is implicit in the use of Internet communication protocols (e.g. IP address, browser and device type, operating system, date and time of the request, pages visited, referrer). This data is processed by the hosting and network/security providers for technical, aggregate-statistical and security purposes.</li>
  <li><strong>Measurement and statistical data (cookies and similar technologies).</strong> Subject to consent, the Site uses traffic analysis tools. See the <a href="/en/cookie">Cookie Policy</a> for details.</li>
  <li><strong>Contact data.</strong> If the user chooses to write to the email address provided, the data contained in the message (e.g. email address, name, message content) will be processed.</li>
</ul>

<h2>3. Purposes and legal bases</h2>
<table>
  <thead><tr><th>Purpose</th><th>Legal basis (Art. 6 GDPR)</th></tr></thead>
  <tbody>
    <tr><td>Provision and operation of the Site, security and abuse prevention</td><td>Legitimate interest (Art. 6.1.f)</td></tr>
    <tr><td>Usage statistics and content improvement (analytics)</td><td>Consent (Art. 6.1.a)</td></tr>
    <tr><td>Responding to requests sent by email</td><td>Response to the data subject's request (Art. 6.1.b/f)</td></tr>
    <tr><td>Compliance with legal obligations</td><td>Legal obligation (Art. 6.1.c)</td></tr>
  </tbody>
</table>

<h2>4. Tools and providers (processors and third parties)</h2>
<p>To operate the Site, the Controller relies on providers that may process data as data processors or independent controllers. The main ones are:</p>
<ul>
  <li><strong>OVHcloud (OVH SAS)</strong> — domain registration.</li>
  <li><strong>Cloudflare, Inc.</strong> — DNS management, CDN, security/WAF and attack protection.</li>
  <li><strong>Vercel Inc.</strong> — hosting and delivery of the Site. The hosting infrastructure may change in the future (including a self-hosted solution based on Linux, Docker, NGINX and Cloudflare Zero Trust); this notice will be updated accordingly.</li>
  <li><strong>Zoho Corporation (Zoho Mail)</strong> — email mailbox for communications.</li>
  <li><strong>Google Ireland Ltd / Google LLC</strong> — Google Analytics and Google Search Console.</li>
  <li><strong>Microsoft Ireland / Microsoft Corporation</strong> — Microsoft Clarity (usage analytics), where active.</li>
  <li><strong>CookieYes Limited</strong> — cookie consent management platform (CMP).</li>
</ul>
<p>An up-to-date list of data processors is available on request by writing to the Controller.</p>

<h2>5. Transfers outside the EU</h2>
<p>Some providers (in particular Cloudflare, Vercel, Google and Microsoft) may process data outside the European Economic Area, including in the United States. Such transfers take place in compliance with Art. 44 et seq. of the GDPR, based on adequate safeguards such as the European Commission's Standard Contractual Clauses and/or adherence to the <em>EU-U.S. Data Privacy Framework</em>.</p>

<h2>6. Retention period</h2>
<p>Navigation data and technical logs are retained for the time strictly necessary for technical and security purposes, according to the respective providers' policies. Statistical data is retained according to the retention periods configured in the analytics tools. Email communications are kept for the time needed to handle the request and for subsequent obligations.</p>

<h2>7. Your rights</h2>
<p>As a data subject, you have the right to exercise, within the limits and conditions set out in Art. 15-22 GDPR:</p>
<ul>
  <li>access to your personal data;</li>
  <li>rectification of inaccurate data or completion of incomplete data;</li>
  <li>erasure ("right to be forgotten");</li>
  <li>restriction of processing;</li>
  <li>data portability;</li>
  <li>objection to processing based on legitimate interest;</li>
  <li>withdrawal of consent at any time, without affecting the lawfulness of processing carried out before withdrawal.</li>
</ul>
<p>To exercise your rights you can write to <a href="mailto:info@paoloronco.it">info@paoloronco.it</a>. You also have the right to lodge a complaint with the Italian Data Protection Authority (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener">garanteprivacy.it</a>) or your local supervisory authority.</p>

<h2>8. Cookies</h2>
<p>The Site uses cookies and similar technologies. For full details on the types, purposes and consent management, see the <a href="/en/cookie">Cookie Policy</a>.</p>

<h2>9. Security</h2>
<p>The Controller adopts appropriate technical and organizational measures to protect data against unauthorized access, loss or disclosure, including traffic encryption (HTTPS), perimeter protection and traffic filtering through the security provider.</p>

<h2>10. Changes to this notice</h2>
<p>The Controller reserves the right to amend or update this notice, including following regulatory changes or changes to the providers used. The current version is always published on this page, with the date of last update.</p>

<h2>11. Contact</h2>
<p>For any question regarding the processing of personal data: <a href="mailto:info@paoloronco.it">info@paoloronco.it</a>.</p>
`,
    },
  },

  // ============================================================ COOKIE
  cookie: {
    title: { it: 'Cookie Policy', en: 'Cookie Policy' },
    description: {
      it: 'Informativa sui cookie e tecnologie simili utilizzati da paoloronco.it.',
      en: 'Notice on cookies and similar technologies used by paoloronco.it.',
    },
    html: {
      it: `
<p>La presente Cookie Policy illustra cosa sono i cookie, quali vengono utilizzati dal sito <strong>paoloronco.it</strong> e come gestire le preferenze. Costituisce parte integrante della <a href="/privacy">Privacy Policy</a>.</p>

<h2>1. Cosa sono i cookie</h2>
<p>I cookie sono piccoli file di testo che i siti visitati inviano al dispositivo dell'utente, dove vengono memorizzati per essere ritrasmessi agli stessi siti alla visita successiva. Tecnologie simili (es. local storage, pixel) possono svolgere funzioni analoghe. I cookie si distinguono in <strong>tecnici</strong> (necessari al funzionamento) e di <strong>analisi/profilazione</strong> (soggetti a consenso).</p>

<h2>2. Gestione del consenso</h2>
<p>Al primo accesso viene mostrato un banner tramite la piattaforma di gestione del consenso <strong>CookieYes</strong>, che consente di accettare, rifiutare o personalizzare l'uso dei cookie non necessari. I cookie diversi da quelli tecnici vengono installati solo previo consenso. È possibile modificare o revocare le scelte in qualsiasi momento riaprendo il pannello delle preferenze cookie dal banner.</p>

<h2>3. Tipologie di cookie utilizzati</h2>
<h3>Cookie tecnici e necessari</h3>
<p>Indispensabili al corretto funzionamento del Sito e alla memorizzazione delle preferenze (incluse quelle sui cookie e sulla lingua). Non richiedono consenso. Rientrano in questa categoria il cookie del CMP CookieYes e le preferenze salvate localmente dal browser (es. lingua, vista delle competenze).</p>
<h3>Cookie analitici e di statistica</h3>
<p>Utilizzati, previo consenso, per raccogliere informazioni in forma aggregata sull'uso del Sito (pagine visitate, durata, provenienza) al fine di migliorarne i contenuti. Sono erogati da Google Analytics e Microsoft Clarity e attivati in base alle preferenze espresse tramite CookieYes.</p>

<h2>4. Elenco dei principali cookie/servizi</h2>
<table>
  <thead><tr><th>Servizio</th><th>Fornitore</th><th>Finalità</th></tr></thead>
  <tbody>
    <tr><td>CookieYes</td><td>CookieYes Limited</td><td>Memorizzazione delle preferenze sul consenso (tecnico)</td></tr>
    <tr><td>Google Analytics (es. _ga, _ga_*)</td><td>Google</td><td>Statistiche di utilizzo (analitico)</td></tr>
    <tr><td>Microsoft Clarity (es. _clck, _clsk)</td><td>Microsoft</td><td>Analisi di utilizzo e mappe di interazione (analitico), ove attivo</td></tr>
  </tbody>
</table>
<p>Durata e dettaglio dei singoli cookie sono indicati nel pannello delle preferenze del banner, che riflette lo stato effettivo del Sito al momento della visita.</p>

<h2>5. Come gestire o disattivare i cookie</h2>
<p>Oltre al pannello delle preferenze del Sito, è possibile gestire o eliminare i cookie tramite le impostazioni del proprio browser. La disattivazione dei cookie tecnici può compromettere alcune funzionalità. Per approfondire:</p>
<ul>
  <li><a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener">Google — Tipi di cookie</a> · <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Privacy Google</a></li>
  <li><a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener">Informativa privacy Microsoft</a></li>
  <li><a href="https://www.cookieyes.com/privacy-policy/" target="_blank" rel="noopener">Privacy CookieYes</a></li>
</ul>

<h2>6. Modifiche</h2>
<p>La presente Cookie Policy può essere aggiornata in caso di variazioni dei servizi utilizzati o della normativa. La data di ultimo aggiornamento è indicata in cima alla pagina.</p>
`,
      en: `
<p>This Cookie Policy explains what cookies are, which ones are used by <strong>paoloronco.it</strong> and how to manage your preferences. It forms an integral part of the <a href="/en/privacy">Privacy Policy</a>.</p>

<h2>1. What cookies are</h2>
<p>Cookies are small text files that visited websites send to the user's device, where they are stored and re-sent to the same sites on a later visit. Similar technologies (e.g. local storage, pixels) may perform analogous functions. Cookies are divided into <strong>technical</strong> (necessary for operation) and <strong>analytics/profiling</strong> (subject to consent).</p>

<h2>2. Consent management</h2>
<p>On first access, a banner is shown through the consent management platform <strong>CookieYes</strong>, which lets you accept, reject or customize the use of non-necessary cookies. Cookies other than technical ones are installed only after consent. You can change or withdraw your choices at any time by reopening the cookie preferences panel from the banner.</p>

<h2>3. Types of cookies used</h2>
<h3>Technical and necessary cookies</h3>
<p>Essential for the proper functioning of the Site and for storing preferences (including cookie and language choices). They do not require consent. This category includes the CookieYes CMP cookie and preferences stored locally by the browser (e.g. language, skills view).</p>
<h3>Analytics and statistical cookies</h3>
<p>Used, subject to consent, to collect aggregate information about the use of the Site (pages visited, duration, source) in order to improve its content. They are provided by Google Analytics and Microsoft Clarity and enabled according to the preferences expressed through CookieYes.</p>

<h2>4. Main cookies/services</h2>
<table>
  <thead><tr><th>Service</th><th>Provider</th><th>Purpose</th></tr></thead>
  <tbody>
    <tr><td>CookieYes</td><td>CookieYes Limited</td><td>Stores consent preferences (technical)</td></tr>
    <tr><td>Google Analytics (e.g. _ga, _ga_*)</td><td>Google</td><td>Usage statistics (analytics)</td></tr>
    <tr><td>Microsoft Clarity (e.g. _clck, _clsk)</td><td>Microsoft</td><td>Usage analytics and interaction maps (analytics), where active</td></tr>
  </tbody>
</table>
<p>The duration and details of individual cookies are shown in the banner's preferences panel, which reflects the actual state of the Site at the time of the visit.</p>

<h2>5. How to manage or disable cookies</h2>
<p>In addition to the Site's preferences panel, you can manage or delete cookies through your browser settings. Disabling technical cookies may impair some features. For more information:</p>
<ul>
  <li><a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener">Google — Types of cookies</a> · <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Privacy</a></li>
  <li><a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener">Microsoft Privacy Statement</a></li>
  <li><a href="https://www.cookieyes.com/privacy-policy/" target="_blank" rel="noopener">CookieYes Privacy</a></li>
</ul>

<h2>6. Changes</h2>
<p>This Cookie Policy may be updated if the services used or applicable law change. The date of last update is shown at the top of the page.</p>
`,
    },
  },

  // ============================================================ TERMS
  terms: {
    title: { it: 'Termini e Condizioni', en: 'Terms & Conditions' },
    description: {
      it: "Termini e condizioni d'uso del sito paoloronco.it.",
      en: 'Terms and conditions of use of paoloronco.it.',
    },
    html: {
      it: `
<p>I presenti Termini e Condizioni ("Termini") disciplinano l'accesso e l'utilizzo del sito <strong>paoloronco.it</strong> (il "Sito"). Navigando il Sito, l'utente dichiara di aver letto e accettato i presenti Termini.</p>

<h2>1. Oggetto</h2>
<p>Il Sito è uno spazio personale di Paolo Ronco a carattere divulgativo e di portfolio, che ospita articoli, progetti e informazioni professionali. I contenuti sono offerti a titolo informativo.</p>

<h2>2. Proprietà intellettuale</h2>
<p>Salvo diversa indicazione, i testi, la grafica, il codice e gli altri contenuti del Sito sono di proprietà di Paolo Ronco o utilizzati con licenza, e sono protetti dalle norme sul diritto d'autore e sulla proprietà intellettuale. È vietata la riproduzione, distribuzione o modifica non autorizzata. Eventuali porzioni di codice rilasciate come open source sono regolate dalle rispettive licenze indicate nei relativi repository. Marchi e loghi di terzi (es. provider, certificazioni) appartengono ai rispettivi titolari e sono mostrati a fini puramente identificativi.</p>

<h2>3. Uso consentito</h2>
<p>L'utente si impegna a utilizzare il Sito nel rispetto della legge e dei presenti Termini, astenendosi da attività che possano danneggiarne il funzionamento, la sicurezza o l'integrità (es. accessi non autorizzati, scraping massivo, tentativi di intrusione, diffusione di malware).</p>

<h2>4. Contenuti e disclaimer</h2>
<p>I contenuti del Sito, inclusi quelli di carattere tecnico e di sicurezza informatica, sono forniti "così come sono", a scopo informativo ed educativo, e riflettono opinioni ed esperienze personali dell'autore. Non costituiscono consulenza professionale, legale o di sicurezza. Le tecniche e gli strumenti eventualmente descritti sono presentati a fini didattici e di ricerca difensiva: l'utente è l'unico responsabile dell'uso che ne fa e deve agire esclusivamente in contesti autorizzati e nel rispetto della legge. L'autore non garantisce l'accuratezza, la completezza o l'aggiornamento dei contenuti.</p>

<h2>5. Link esterni</h2>
<p>Il Sito può contenere collegamenti a siti di terzi. L'autore non controlla tali siti e non è responsabile dei loro contenuti, delle loro politiche o della loro disponibilità.</p>

<h2>6. Limitazione di responsabilità</h2>
<p>Nei limiti consentiti dalla legge, l'autore non è responsabile per danni diretti o indiretti derivanti dall'accesso, dall'uso o dall'impossibilità di utilizzare il Sito o i suoi contenuti, né per eventuali interruzioni, errori o indisponibilità del servizio.</p>

<h2>7. Dati personali e cookie</h2>
<p>Il trattamento dei dati personali è descritto nella <a href="/privacy">Privacy Policy</a>; l'uso dei cookie nella <a href="/cookie">Cookie Policy</a>.</p>

<h2>8. Legge applicabile e foro competente</h2>
<p>I presenti Termini sono regolati dalla legge italiana. Per le controversie con utenti consumatori è competente il foro del luogo di residenza o domicilio elettivo del consumatore; negli altri casi si applica il foro competente secondo le norme di legge.</p>

<h2>9. Modifiche</h2>
<p>L'autore si riserva di modificare i presenti Termini in qualsiasi momento. La versione vigente è quella pubblicata su questa pagina, con indicazione della data di ultimo aggiornamento.</p>

<h2>10. Contatti</h2>
<p>Per qualsiasi comunicazione relativa ai presenti Termini: <a href="mailto:info@paoloronco.it">info@paoloronco.it</a>.</p>
`,
      en: `
<p>These Terms & Conditions ("Terms") govern access to and use of the website <strong>paoloronco.it</strong> (the "Site"). By browsing the Site, the user declares to have read and accepted these Terms.</p>

<h2>1. Purpose</h2>
<p>The Site is a personal space of Paolo Ronco, informational and portfolio in nature, hosting articles, projects and professional information. The content is provided for informational purposes.</p>

<h2>2. Intellectual property</h2>
<p>Unless otherwise stated, the texts, graphics, code and other content of the Site are owned by Paolo Ronco or used under license, and are protected by copyright and intellectual property laws. Unauthorized reproduction, distribution or modification is prohibited. Any portions of code released as open source are governed by the respective licenses indicated in their repositories. Third-party trademarks and logos (e.g. providers, certifications) belong to their respective owners and are shown for identification purposes only.</p>

<h2>3. Permitted use</h2>
<p>The user agrees to use the Site in compliance with the law and these Terms, refraining from activities that could harm its operation, security or integrity (e.g. unauthorized access, mass scraping, intrusion attempts, distribution of malware).</p>

<h2>4. Content and disclaimer</h2>
<p>The content of the Site, including technical and cybersecurity content, is provided "as is", for informational and educational purposes, and reflects the author's personal opinions and experience. It does not constitute professional, legal or security advice. Any techniques and tools described are presented for educational and defensive-research purposes: the user is solely responsible for their use and must act only in authorized contexts and in compliance with the law. The author does not warrant the accuracy, completeness or timeliness of the content.</p>

<h2>5. External links</h2>
<p>The Site may contain links to third-party sites. The author does not control such sites and is not responsible for their content, policies or availability.</p>

<h2>6. Limitation of liability</h2>
<p>To the extent permitted by law, the author shall not be liable for any direct or indirect damages arising from access to, use of, or inability to use the Site or its content, nor for any interruptions, errors or unavailability of the service.</p>

<h2>7. Personal data and cookies</h2>
<p>The processing of personal data is described in the <a href="/en/privacy">Privacy Policy</a>; the use of cookies in the <a href="/en/cookie">Cookie Policy</a>.</p>

<h2>8. Governing law and jurisdiction</h2>
<p>These Terms are governed by Italian law. For disputes with consumer users, the court of the consumer's place of residence or elected domicile has jurisdiction; in other cases, the competent court under applicable law applies.</p>

<h2>9. Changes</h2>
<p>The author reserves the right to modify these Terms at any time. The current version is the one published on this page, with the date of last update.</p>

<h2>10. Contact</h2>
<p>For any communication regarding these Terms: <a href="mailto:info@paoloronco.it">info@paoloronco.it</a>.</p>
`,
    },
  },
};
