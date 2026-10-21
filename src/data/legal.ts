// Testi legali del sito — Privacy Policy, Termini e Condizioni, Cookie Policy.
// Bilingue IT/EN. Contenuto reso in .prose tramite set:html.
// NB: documento informativo allineato a GDPR (Reg. UE 2016/679) e normativa IT;
// per una conformità piena è consigliata una revisione legale.

import type { Lang } from '@/i18n/ui';
type LS = Record<Lang, string>;

export const legalUpdated = '2026-10-21';

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
      it: 'Informativa privacy di paoloronco.it: contatti, assistente AI, analytics e gestione del consenso.',
      en: 'Privacy notice for paoloronco.it: contact details, AI assistant, analytics and consent choices.',
    },
    html: {
      it: `
<p>L'informativa completa di <strong>Paolo Ronco</strong>, aggiornata il 21 ottobre 2026 e pubblicata su Termly, è disponibile in inglese:</p>
<p><a href="/legal/privacy-policy.html" lang="en"><strong>Leggi la Privacy Policy completa →</strong></a></p>
<h2>Informazioni principali</h2>
<ul>
  <li><strong>Contatti:</strong> Paolo Ronco, Torino, Italia — <a href="mailto:info@paoloronco.it">info@paoloronco.it</a>.</li>
  <li><strong>Assistente AI facoltativo:</strong> utilizza OpenAI, Cohere, n8n e Qdrant locale e Cloud. n8n e Qdrant locale sono ospitati in Italia; la regione di Qdrant Cloud è ancora da verificare.</li>
  <li><strong>Conservazione del chatbot:</strong> domande, risposte, data e ora sono conservate senza una scadenza automatica nelle esecuzioni e in una data table n8n. Puoi chiedere accesso o cancellazione via email, fornendo il contesto necessario per individuare i messaggi.</li>
  <li><strong>Analytics:</strong> Google Analytics e Microsoft Clarity si attivano dopo il consenso. Puoi modificare o revocare le scelte dalle preferenze cookie nel footer.</li>
</ul>
<p>Questo riepilogo accompagna il <a href="/legal/privacy-policy.html">testo completo dell'informativa</a>, che descrive dati trattati, finalità, fornitori, trasferimenti e diritti. Consulta anche la <a href="/cookie">Cookie Policy</a> e l'inventario del CMP per le categorie di cookie rilevate.</p>
`,
      en: `
<p>The full Privacy Policy for <strong>Paolo Ronco</strong>, updated on October 21, 2026 and published in Termly, is available below:</p>
<p><a href="/legal/privacy-policy.html"><strong>Read the full Privacy Policy →</strong></a></p>
<h2>Key information</h2>
<ul>
  <li><strong>Contact:</strong> Paolo Ronco, Torino, Italy — <a href="mailto:info@paoloronco.it">info@paoloronco.it</a>.</li>
  <li><strong>Optional AI assistant:</strong> uses OpenAI, Cohere, n8n and local and Cloud Qdrant. n8n and local Qdrant are hosted in Italy; the Qdrant Cloud region has not yet been verified.</li>
  <li><strong>Chatbot retention:</strong> queries, responses, dates and times are retained indefinitely in n8n executions and a data table, without an automatic deletion deadline. You can request access or erasure by email, providing enough context to locate your messages.</li>
  <li><strong>Analytics:</strong> Google Analytics and Microsoft Clarity load after consent. You can change or withdraw your choices through the cookie preferences link in the footer.</li>
</ul>
<p>This summary accompanies the <a href="/legal/privacy-policy.html">full Privacy Policy</a>, which describes the data processed, purposes, providers, transfers and your rights. See also the <a href="/en/cookie">Cookie Policy</a> and the CMP inventory for detected cookie categories.</p>
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
<p>Al primo accesso viene mostrato un banner tramite la piattaforma di gestione del consenso <strong>Termly</strong>, che consente di accettare, rifiutare o personalizzare l'uso dei cookie non necessari. I cookie diversi da quelli tecnici vengono installati solo previo consenso. È possibile modificare o revocare le scelte in qualsiasi momento riaprendo il pannello delle preferenze cookie dal link «Preferenze cookie» nel footer.</p>

<h2>3. Tipologie di cookie utilizzati</h2>
<h3>Cookie tecnici e necessari</h3>
<p>Indispensabili al corretto funzionamento del Sito e alla memorizzazione delle preferenze (incluse quelle sui cookie e sulla lingua). Non richiedono consenso. Rientrano in questa categoria le preferenze del CMP Termly salvate nel local storage e le preferenze salvate localmente dal browser (es. lingua, vista delle competenze).</p>
<h3>Cookie analitici e di statistica</h3>
<p>Utilizzati, previo consenso, per raccogliere informazioni in forma aggregata sull'uso del Sito (pagine visitate, durata, provenienza) al fine di migliorarne i contenuti. Sono erogati da Google Analytics e Microsoft Clarity e attivati in base alle preferenze espresse tramite Termly.</p>

<h2>4. Elenco dei principali cookie/servizi</h2>
<table>
  <thead><tr><th>Servizio</th><th>Fornitore</th><th>Finalità</th></tr></thead>
  <tbody>
    <tr><td>Termly</td><td>Termly</td><td>Memorizzazione delle preferenze sul consenso (tecnico)</td></tr>
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
  <li><a href="https://termly.io/our-privacy-policy/" target="_blank" rel="noopener">Privacy Termly</a></li>
</ul>

<h2>6. Modifiche</h2>
<p>La presente Cookie Policy può essere aggiornata in caso di variazioni dei servizi utilizzati o della normativa. La data di ultimo aggiornamento è indicata in cima alla pagina.</p>
`,
      en: `
<p>This Cookie Policy explains what cookies are, which ones are used by <strong>paoloronco.it</strong> and how to manage your preferences. It forms an integral part of the <a href="/en/privacy">Privacy Policy</a>.</p>

<h2>1. What cookies are</h2>
<p>Cookies are small text files that visited websites send to the user's device, where they are stored and re-sent to the same sites on a later visit. Similar technologies (e.g. local storage, pixels) may perform analogous functions. Cookies are divided into <strong>technical</strong> (necessary for operation) and <strong>analytics/profiling</strong> (subject to consent).</p>

<h2>2. Consent management</h2>
<p>On first access, a banner is shown through the consent management platform <strong>Termly</strong>, which lets you accept, reject or customize the use of non-necessary cookies. Cookies other than technical ones are installed only after consent. You can change or withdraw your choices at any time by reopening the cookie preferences panel using the “Consent preferences” link in the footer.</p>

<h2>3. Types of cookies used</h2>
<h3>Technical and necessary cookies</h3>
<p>Essential for the proper functioning of the Site and for storing preferences (including cookie and language choices). They do not require consent. This category includes Termly CMP preferences saved in local storage and preferences stored locally by the browser (e.g. language, skills view).</p>
<h3>Analytics and statistical cookies</h3>
<p>Used, subject to consent, to collect aggregate information about the use of the Site (pages visited, duration, source) in order to improve its content. They are provided by Google Analytics and Microsoft Clarity and enabled according to the preferences expressed through Termly.</p>

<h2>4. Main cookies/services</h2>
<table>
  <thead><tr><th>Service</th><th>Provider</th><th>Purpose</th></tr></thead>
  <tbody>
    <tr><td>Termly</td><td>Termly</td><td>Stores consent preferences (technical)</td></tr>
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
  <li><a href="https://termly.io/our-privacy-policy/" target="_blank" rel="noopener">Termly Privacy</a></li>
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
