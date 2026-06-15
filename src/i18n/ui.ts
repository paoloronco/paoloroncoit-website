export const defaultLang = 'it';
export type Lang = 'it' | 'en';

// Tutte le stringhe UI del sito, per lingua. Fallback automatico su IT.
export const ui = {
  it: {
    // generali / nav
    'nav.cv': 'CV',
    'nav.work': 'Work',
    'nav.writing': 'Writing',
    'nav.skills': 'Skills',
    'nav.about': 'About',
    'header.search': 'cerca · naviga · chiedi',
    'header.openPalette': 'Apri command palette',
    'a11y.skip': 'Salta al contenuto',
    'footer.rights': 'costruito con Astro, statico, edge-deployed · 0 tracker',
    'lang.switch': 'Lingua',

    // home
    'home.intro':
      'Cyber Security Analyst in Deloitte, area Cloud & Infrastructure. Mi occupo di sicurezza e infrastrutture e, nel tempo libero, sperimento con AI, automazioni e servizi che ospito da solo. Ogni esperienza ha contribuito a formare il professionista che sono oggi.',
    'home.ctaWork': 'Esplora i progetti →',
    'home.ctaWriting': 'Leggi gli articoli',
    'home.whatIDo': 'Cosa faccio',
    'home.featured': 'Progetti in evidenza',
    'home.recent': 'Articoli recenti',
    'common.all': 'tutti →',

    // aree
    'area.security.t': 'Cyber Security',
    'area.security.d': 'Threat detection, hardening, incident response.',
    'area.ai.t': 'AI / LLM',
    'area.ai.d': 'RAG, agenti e modelli self-hosted, applicati sul serio.',
    'area.automation.t': 'Automazione',
    'area.automation.d': 'Workflow n8n e pipeline che tolgono lavoro ripetitivo.',
    'area.cloud.t': 'Cloud & DevSecOps',
    'area.cloud.d': 'Container, CI/CD e sicurezza dentro il ciclo di sviluppo.',

    // cv
    'cv.kicker': 'Curriculum',
    'cv.downloadPdf': '⬇ Scarica PDF',
    'cv.experience': 'Esperienza',
    'cv.skills': 'Competenze',
    'cv.skillsCard': 'Competenze tecniche complete',
    'cv.skillsCardDesc': 'Security · Cloud · Networking · DevOps · Automazione · AI — con livelli e strumenti.',
    'cv.certs': 'Certificazioni',
    'cv.education': 'Formazione',
    'cv.languages': 'Lingue',
    'edu.corso': 'Corso',
    'edu.laurea': 'Laurea triennale',
    'edu.diploma': 'Diploma',
    'lang.it': 'Italiano',
    'lang.en': 'Inglese',
    'lang.es': 'Spagnolo',
    'level.native': 'Madrelingua',
    'level.advanced': 'Avanzato',
    'level.basic': 'Base',

    // about
    'about.kicker': 'Chi sono',
    'about.p1':
      "Sono un Cyber Security Analyst in Deloitte, nell'area Cloud & Infrastructure. Prima ho lavorato come System Administrator e in diversi ruoli legati ai servizi IT, partendo da Torino.",
    'about.p2':
      '«Ogni esperienza che ho vissuto ha contribuito a formare la persona e il professionista che sono oggi.» Mi muovo tra sicurezza, infrastrutture e una forte curiosità per AI, automazione e tutto ciò che posso ospitare e capire a fondo.',
    'about.p3':
      'Credo nelle prove più che nelle dichiarazioni: gran parte di ciò che faccio è verificabile — codice aperto, certificazioni, servizi che mantengo io.',
    'about.infra': 'La mia infrastruttura',
    'about.infraText':
      'Eseguo diversi servizi in autonomia — è una scelta di controllo e di minimizzazione del rischio, non un vezzo.',
    'about.diagramCaption': 'schema semplificato · il "personal SOC"',
    'about.contact': 'Contatti',

    // contact
    'contact.kicker': 'Contatti',
    'contact.title': 'Scrivimi',
    'contact.subtitle': 'Per collaborazioni, consulenze o due chiacchiere tecniche.',
    'contact.email': 'Email',
    'contact.pgpText': 'Per comunicazioni sensibili, usa la mia chiave pubblica. Chiave da pubblicare.',

    // ask
    'ask.kicker': 'AI Assistant · self-hosted',
    'ask.title': 'Chiedi pure',
    'ask.subtitle':
      'Un assistente addestrato sui miei articoli e progetti. Gira su infrastruttura mia (n8n), raggiunto dal sito solo tramite un proxy. Nessun dato passa da SaaS di terzi.',
    'ask.placeholder': 'Es. che esperienza hai con il cloud?',
    'ask.send': 'Invia',
    'ask.note':
      'ⓘ MVP: l\'endpoint è da collegare. In fase 2 → POST verso l\'edge proxy /api/ask → webhook n8n (streaming).',
    'ask.fallback':
      "L'assistente non è ancora collegato in questo MVP. Quando l'edge proxy sarà attivo, qui arriverà la risposta in streaming dal workflow n8n.",
    'chat.open': "Apri l'assistente AI",
    'chat.tagline': 'Assistente AI · self-hosted',
    'chat.greeting': 'Ciao 👋 Sono l\'assistente AI di Paolo. Chiedimi dei suoi progetti, articoli o competenze.',

    // skills
    'skills.kicker': 'Competenze',
    'skills.skillUnit': 'skill',
    'skills.inThisPage': 'In questa pagina',
    'skills.source': 'Fonte',
    'skills.handsOn': 'hands-on',

    // work
    'work.kicker': 'Portfolio',
    'work.subtitle': 'Non un elenco: ogni progetto è un case file — problema, soluzione, stack, risultato.',
    'work.all': 'tutti',
    'work.problem': 'Problema',
    'work.solution': 'Soluzione',
    'work.outcome': 'Risultato',
    'work.stack': 'Stack',
    'work.back': '← work',
    'work.empty': 'Progetti in arrivo.',
    'writing.empty': 'Articoli in arrivo in questa lingua.',

    // writing
    'writing.kicker': 'Articoli',
    'writing.subtitle': 'Security in pratica · AI/LLM applicata · automazione & DevSecOps.',
    'writing.toc': 'In questa pagina',
    'writing.back': '← writing',
    'writing.minRead': 'min di lettura',
  },

  en: {
    'nav.cv': 'CV',
    'nav.work': 'Work',
    'nav.writing': 'Writing',
    'nav.skills': 'Skills',
    'nav.about': 'About',
    'header.search': 'search · navigate · ask',
    'header.openPalette': 'Open command palette',
    'a11y.skip': 'Skip to content',
    'footer.rights': 'built with Astro, static, edge-deployed · 0 trackers',
    'lang.switch': 'Language',

    'home.intro':
      'Cyber Security Analyst at Deloitte, Cloud & Infrastructure. I work on security and infrastructure and, in my spare time, experiment with AI, automation and services I self-host. Every experience helped shape the professional I am today.',
    'home.ctaWork': 'Explore the projects →',
    'home.ctaWriting': 'Read the articles',
    'home.whatIDo': 'What I do',
    'home.featured': 'Featured projects',
    'home.recent': 'Recent articles',
    'common.all': 'all →',

    'area.security.t': 'Cyber Security',
    'area.security.d': 'Threat detection, hardening, incident response.',
    'area.ai.t': 'AI / LLM',
    'area.ai.d': 'RAG, agents and self-hosted models, applied for real.',
    'area.automation.t': 'Automation',
    'area.automation.d': 'n8n workflows and pipelines that remove repetitive work.',
    'area.cloud.t': 'Cloud & DevSecOps',
    'area.cloud.d': 'Containers, CI/CD and security inside the development cycle.',

    'cv.kicker': 'Résumé',
    'cv.downloadPdf': '⬇ Download PDF',
    'cv.experience': 'Experience',
    'cv.skills': 'Skills',
    'cv.skillsCard': 'Full technical skills',
    'cv.skillsCardDesc': 'Security · Cloud · Networking · DevOps · Automation · AI — with levels and tools.',
    'cv.certs': 'Certifications',
    'cv.education': 'Education',
    'cv.languages': 'Languages',
    'edu.corso': 'Course',
    'edu.laurea': "Bachelor's degree",
    'edu.diploma': 'Diploma',
    'lang.it': 'Italian',
    'lang.en': 'English',
    'lang.es': 'Spanish',
    'level.native': 'Native',
    'level.advanced': 'Advanced',
    'level.basic': 'Basic',

    'about.kicker': 'About me',
    'about.p1':
      'I am a Cyber Security Analyst at Deloitte, in the Cloud & Infrastructure area. Previously I worked as a System Administrator and in several IT-services roles, starting out in Turin.',
    'about.p2':
      '“Every experience I have lived has helped shape the person and professional I am today.” I move between security, infrastructure and a strong curiosity for AI, automation and everything I can host and understand in depth.',
    'about.p3':
      'I believe in evidence over claims: most of what I do is verifiable — open code, certifications, services I maintain myself.',
    'about.infra': 'My infrastructure',
    'about.infraText':
      'I run several services on my own — a choice of control and risk minimization, not a gimmick.',
    'about.diagramCaption': 'simplified diagram · the "personal SOC"',
    'about.contact': 'Contact',

    'contact.kicker': 'Contact',
    'contact.title': 'Get in touch',
    'contact.subtitle': 'For collaborations, consulting or a technical chat.',
    'contact.email': 'Email',
    'contact.pgpText': 'For sensitive communications, use my public key. Key to be published.',

    'ask.kicker': 'AI Assistant · self-hosted',
    'ask.title': 'Ask away',
    'ask.subtitle':
      'An assistant trained on my articles and projects. It runs on my own infrastructure (n8n), reached by the site only through a proxy. No data goes through third-party SaaS.',
    'ask.placeholder': 'E.g. what is your experience with cloud?',
    'ask.send': 'Send',
    'ask.note':
      'ⓘ MVP: the endpoint is still to be connected. In phase 2 → POST to the edge proxy /api/ask → n8n webhook (streaming).',
    'ask.fallback':
      'The assistant is not connected yet in this MVP. Once the edge proxy is live, the streamed answer from the n8n workflow will appear here.',
    'chat.open': 'Open the AI assistant',
    'chat.tagline': 'AI Assistant · self-hosted',
    'chat.greeting': "Hi 👋 I'm Paolo's AI assistant. Ask me about his projects, articles or skills.",

    'skills.kicker': 'Skills',
    'skills.skillUnit': 'skills',
    'skills.inThisPage': 'On this page',
    'skills.source': 'Source',
    'skills.handsOn': 'hands-on',

    'work.kicker': 'Portfolio',
    'work.subtitle': 'Not a list: every project is a case file — problem, solution, stack, outcome.',
    'work.all': 'all',
    'work.problem': 'Problem',
    'work.solution': 'Solution',
    'work.outcome': 'Outcome',
    'work.stack': 'Stack',
    'work.back': '← work',
    'work.empty': 'Projects coming soon.',
    'writing.empty': 'Articles coming soon in this language.',

    'writing.kicker': 'Articles',
    'writing.subtitle': 'Practical security · applied AI/LLM · automation & DevSecOps.',
    'writing.toc': 'On this page',
    'writing.back': '← writing',
    'writing.minRead': 'min read',
  },
} as const;
