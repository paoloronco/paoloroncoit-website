import { enterpriseSecurityArea } from '@/data/site';

export const defaultLang = 'it';
export type Lang = 'it' | 'en';

// Tutte le stringhe UI del sito, per lingua. Fallback automatico su IT.
export const ui = {
  it: {
    // generali / nav
    'nav.cv': 'CV',
    'nav.projects': 'Projects',
    'nav.writing': 'Articoli',
    'nav.skills': 'Competenze',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'header.search': 'Cerca o chiedi',
    'header.openPalette': "Cerca o chiedi all'AI",
    'a11y.skip': 'Salta al contenuto',
    'footer.rights': 'costruito con Astro, statico, edge-deployed',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Termini e Condizioni',
    'footer.cookie': 'Cookie Policy',
    'footer.legal': 'Note legali',
    'legal.updated': 'Ultimo aggiornamento',
    'lang.switch': 'Lingua',

    // home
    'home.intro':
      `Sono un Cybersecurity Analyst presso Deloitte, dove lavoro su progetti di cybersecurity in contesti enterprise, dalle Security Operations e dalle piattaforme SIEM fino agli assessment e alla valutazione dei controlli di sicurezza.

Parallelamente all'attività professionale sviluppo e gestisco progetti personali in ambito cloud computing, Linux, networking, virtualizzazione, sviluppo software e automazione. Queste attività mi permettono di sperimentare tecnologie differenti, approfondirne il funzionamento e applicarle a problemi concreti.

Seguo con particolare interesse l'evoluzione della cybersecurity, le metodologie DevSecOps e l'intelligenza artificiale, soprattutto nelle loro applicazioni pratiche e nell'integrazione con sistemi e servizi esistenti.`,
    'home.ctaWork': 'Esplora i progetti →',
    'home.ctaWriting': 'Leggi gli articoli',
    'home.status': 'Disponibile per collaborazioni',
    'home.whatIDo': 'Cosa faccio',
    'home.areasTitle': 'Le mie',
    'home.areasAccent': 'aree',
    'home.areasSub': 'Quattro ambiti che si intrecciano: sicurezza, AI applicata, automazione e cloud.',
    'home.stackEyebrow': 'stack',
    'home.stackTitle': 'Strumenti che',
    'home.stackAccent': 'uso ogni giorno',
    'home.stackSub': 'Tecnologie e piattaforme con cui lavoro, in laboratorio e sul campo.',
    'home.featured': 'In',
    'home.featuredAccent': 'evidenza',
    'home.featuredEyebrow': 'progetti',
    'home.featuredSub': 'Una selezione di lavori: problema, soluzione, stack, risultato.',
    'home.recent': 'Dal',
    'home.recentAccent': 'blog',
    'home.recentEyebrow': 'articoli',
    'home.recentSub': 'Security in pratica, AI/LLM applicata, automazione e self-hosting.',
    'common.all': 'tutti →',

    // aree
    'area.security.t': 'Cyber Security',
    'area.security.d': 'Difesa di architetture e cloud: Zero Trust, IAM, detection con SIEM/SOAR ed EDR/XDR, gestione del rischio.',
    'area.ai.t': 'AI / LLM',
    'area.ai.d': 'AI applicata alla sicurezza: RAG, agenti, LLM self-hosted, AI red teaming e MCP.',
    'area.automation.t': 'Automazione',
    'area.automation.d': 'Workflow e pipeline che eliminano il lavoro ripetitivo: n8n, Zapier, Make, GitHub Actions, CI/CD.',
    'area.cloud.t': 'Cloud & DevSecOps',
    'area.cloud.d': 'Cloud multi-provider — Google Cloud, AWS, Azure, OCI — con la sicurezza dentro il ciclo di sviluppo.',

    // cv
    'cv.kicker': 'Curriculum',
    'cv.downloadPdf': '⬇ Scarica PDF',
    'cv.profile': 'Profilo professionale',
    'cv.intro':
      `Cybersecurity Analyst presso Deloitte, con esperienza in contesti enterprise nell'ambito delle Security Operations, delle tecnologie SIEM e dei security assessment, inclusa la valutazione dei controlli e della maturità di sicurezza.

Affianco all'esperienza professionale un approccio tecnico e multidisciplinare, che coltivo attraverso lo sviluppo e la gestione di progetti personali in ambito cloud computing, Linux, networking, virtualizzazione, sviluppo software e automazione. Queste attività mi permettono di sperimentare tecnologie differenti e consolidare competenze attraverso la loro applicazione pratica.

Dedico particolare attenzione all'evoluzione della cybersecurity, alle metodologie DevSecOps e alle opportunità offerte dall'intelligenza artificiale, approfondendone le applicazioni e l'integrazione con sistemi e servizi esistenti.`,
    'cv.experience': 'Esperienza',
    'cv.skills': 'Competenze',
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
      `Sono un Cybersecurity Analyst presso Deloitte, dove lavoro su progetti di cybersecurity in contesti enterprise, dalle Security Operations e dalle tecnologie SIEM fino agli assessment e alla valutazione dei controlli di sicurezza.`,
    'about.p2':
      `Il mio interesse per la tecnologia si estende oltre l'attività professionale. Attraverso progetti personali sviluppo e sperimento soluzioni in ambito cloud computing, Linux, networking, virtualizzazione, automazione e intelligenza artificiale. Gestisco inoltre un'infrastruttura homelab che utilizzo per configurare servizi, testare nuove tecnologie e approfondire aspetti legati alla sicurezza, al monitoraggio e alla continuità operativa.`,
    'about.p3':
      `Dedico particolare attenzione all'evoluzione della cybersecurity, alle metodologie DevSecOps e alle applicazioni pratiche dell'AI, soprattutto nell'automazione, nello sviluppo software e nell'integrazione tra sistemi differenti.`,
    'about.p4':
      `Su questo sito raccolgo i progetti che realizzo, le competenze sviluppate e gli articoli in cui documento esperimenti, implementazioni e soluzioni tecniche.`,
    'about.infra': 'La mia infrastruttura',
    'about.infraText':
      'Eseguo diversi servizi in autonomia — è una scelta di controllo e di minimizzazione del rischio, non un vezzo.',
    'about.diagramCaption': 'schema semplificato · il "personal SOC"',
    'about.contact': 'Contatti',
    'about.factsTitle': 'In breve',
    'about.roleLabel': 'Ruolo',
    'about.companyLabel': 'Azienda',
    'about.companyValue': `Deloitte · ${enterpriseSecurityArea}`,
    'about.locationLabel': 'Luogo',
    'about.locationValue': 'Torino, Italia',
    'about.focusLabel': 'Focus',
    'about.areasLabel': 'Aree',
    'about.writeMe': 'Scrivimi',

    // contact
    'contact.kicker': 'Contatti',
    'contact.title': 'Scrivimi',
    'contact.subtitle': 'Per collaborazioni, progetti o confronti su cybersecurity, AI e tecnologie.',
    'contact.email': 'Email',
    'contact.emailNote': '',
    'contact.socialTitle': 'Profili',
    'contact.openProfile': 'Apri profilo',
    'contact.githubNote': 'Codice, progetti e repository pubblici.',
    'contact.linkedinNote': 'Percorso professionale e contatti di lavoro.',
    'contact.hfNote': 'Modelli, dataset e sperimentazioni AI.',
    'contact.readyTensorNote': 'Pubblicazioni e progetti di AI e machine learning.',

    // ask
    'ask.kicker': 'AI Assistant · contenuti del sito',
    'ask.title': 'Chiedi pure',
    'ask.subtitle':
      'Un assistente che consulta i miei contenuti: articoli, progetti e competenze.',
    'ask.placeholder': 'Es. che esperienza hai con il cloud?',
    'ask.send': 'Invia',
    'ask.note':
      'ⓘ Le richieste passano dal proxy del sito a un workflow n8n self-hosted. I messaggi possono essere elaborati da fornitori esterni, in base ai modelli, alle API e ai servizi utilizzati dal workflow.',
    'ask.fallback':
      "Ops, qualcosa è andato storto. Riprova tra poco.",
    'chat.open': "Apri l'assistente AI",
    'chat.tagline': 'Assistente AI · contenuti del sito',
    'chat.greeting': 'Ciao 👋 Sono l\'assistente AI di Paolo. Chiedimi dei suoi progetti, articoli o competenze.',
    'chat.searching': 'Sto cercando…',
    'chat.found': 'Ecco cosa ho trovato:',
    'chat.empty': 'Non ho trovato risultati per questa richiesta.',
    'chat.error': 'Ops, qualcosa è andato storto. Riprova tra poco.',

    // skills
    'skills.kicker': 'Competenze',
    'skills.skillUnit': 'skill',
    'skills.inThisPage': 'In questa pagina',
    'skills.source': 'Fonte',
    'skills.handsOn': 'hands-on',
    'skills.view': 'Vista',
    'skills.modeDots': 'Livelli',
    'skills.modePct': 'Percentuale',

    // work
    'work.kicker': 'Projects',
    'work.subtitle': 'Progetti personali di sviluppo software, cybersecurity, AI, cloud e automazione, con dettagli su funzionalità, tecnologie e implementazione.',
    'work.all': 'tutti',
    'work.category': 'Categoria',
    'work.category.security': 'Sicurezza',
    'work.category.ai': 'AI',
    'work.category.automation': 'Automazione',
    'work.category.cloud': 'Cloud',
    'work.category.tool': 'Strumenti',
    'work.main': 'Progetti principali',
    'work.other': 'Altri progetti',
    'work.problem': 'Problema',
    'work.solution': 'Soluzione',
    'work.outcome': 'Risultato',
    'work.stack': 'Stack',
    'work.back': '← projects',
    'work.empty': 'Progetti in arrivo.',
    'writing.empty': 'Articoli in arrivo in questa lingua.',

    // writing
    'writing.kicker': 'Articoli',
    'writing.subtitle': 'Articoli, guide tecniche ed esperienze pratiche su cybersecurity, cloud computing, Linux, automazione e intelligenza artificiale. Condivido progetti, configurazioni, sperimentazioni e approfondimenti sulle tecnologie che utilizzo e studio.',
    'writing.toc': 'In questa pagina',
    'writing.back': '← writing',
    'writing.minRead': 'min di lettura',
    'writing.min': 'min',
    'writing.search': 'Cerca tra gli articoli…',
    'writing.allTags': 'tutti',
    'writing.noResults': 'Nessun articolo trovato.',
    'writing.count': 'articoli',
  },

  en: {
    'nav.cv': 'CV',
    'nav.projects': 'Projects',
    'nav.writing': 'Writing',
    'nav.skills': 'Skills',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'header.search': 'Search or ask',
    'header.openPalette': 'Search or ask the AI',
    'a11y.skip': 'Skip to content',
    'footer.rights': 'built with Astro, static, edge-deployed',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'footer.cookie': 'Cookie Policy',
    'footer.legal': 'Legal',
    'legal.updated': 'Last updated',
    'lang.switch': 'Language',

    'home.intro':
      `I'm a Cybersecurity Analyst at Deloitte, working on enterprise cybersecurity projects spanning Security Operations, SIEM platforms, security assessments, and security control evaluations.

Alongside my professional role, I develop and maintain independent projects involving cloud computing, Linux, networking, virtualization, software development, and automation. These projects allow me to experiment with different technologies, understand how they work, and apply them to practical challenges.

I'm particularly interested in the evolution of cybersecurity, DevSecOps practices, and artificial intelligence, especially their practical applications and integration with existing systems and services.`,
    'home.ctaWork': 'Explore the projects →',
    'home.ctaWriting': 'Read the articles',
    'home.status': 'Available for collaborations',
    'home.whatIDo': 'What I do',
    'home.areasTitle': 'My',
    'home.areasAccent': 'focus areas',
    'home.areasSub': 'Four areas that intertwine: security, applied AI, automation and cloud.',
    'home.stackEyebrow': 'stack',
    'home.stackTitle': 'Tools I',
    'home.stackAccent': 'use every day',
    'home.stackSub': 'Technologies and platforms I work with, in the lab and in the field.',
    'home.featured': 'In the',
    'home.featuredAccent': 'spotlight',
    'home.featuredEyebrow': 'projects',
    'home.featuredSub': 'A selection of projects: problem, solution, stack, outcome.',
    'home.recent': 'From the',
    'home.recentAccent': 'blog',
    'home.recentEyebrow': 'articles',
    'home.recentSub': 'Practical security, applied AI/LLM, automation and self-hosting.',
    'common.all': 'all →',

    'area.security.t': 'Cyber Security',
    'area.security.d': 'Securing architectures and cloud: Zero Trust, IAM, detection with SIEM/SOAR and EDR/XDR, risk management.',
    'area.ai.t': 'AI / LLM',
    'area.ai.d': 'AI applied to security: RAG, agents, self-hosted LLMs, AI red teaming and MCP.',
    'area.automation.t': 'Automation',
    'area.automation.d': 'Workflows and pipelines that remove repetitive work: n8n, Zapier, Make, GitHub Actions, CI/CD.',
    'area.cloud.t': 'Cloud & DevSecOps',
    'area.cloud.d': 'Multi-provider cloud — Google Cloud, AWS, Azure, OCI — with security baked into the dev cycle.',

    'cv.kicker': 'Résumé',
    'cv.downloadPdf': '⬇ Download PDF',
    'cv.profile': 'Professional profile',
    'cv.intro':
      `Cybersecurity Analyst at Deloitte, with experience in enterprise environments spanning Security Operations, SIEM technologies, and security assessments, including the evaluation of security controls and organizational security maturity.

Alongside my professional experience, I pursue a technical and multidisciplinary approach through independent projects involving cloud computing, Linux, networking, virtualization, software development, and automation. These projects allow me to experiment with different technologies and develop practical skills through hands-on implementation.

I'm particularly interested in the evolution of cybersecurity, DevSecOps practices, and artificial intelligence, focusing on their practical applications and integration with existing systems and services.`,
    'cv.experience': 'Experience',
    'cv.skills': 'Skills',
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
      `I'm a Cybersecurity Analyst at Deloitte, working on enterprise cybersecurity projects involving Security Operations, SIEM technologies, security assessments, and the evaluation of security controls.`,
    'about.p2':
      `My technical interests extend beyond my professional role. Through independent projects, I develop and experiment with cloud computing, Linux, networking, virtualization, automation, and artificial intelligence. I also maintain a personal homelab where I configure services, test technologies, and explore security, monitoring, and business continuity solutions.`,
    'about.p3':
      `I'm particularly interested in the evolution of cybersecurity, DevSecOps practices, and practical AI applications, especially in automation, software development, and system integration.`,
    'about.p4':
      `This website brings together my projects, technical skills, and articles documenting experiments, implementations, and solutions I've worked on.`,
    'about.infra': 'My infrastructure',
    'about.infraText':
      'I run several services on my own — a choice of control and risk minimization, not a gimmick.',
    'about.diagramCaption': 'simplified diagram · the "personal SOC"',
    'about.contact': 'Contact',
    'about.factsTitle': 'At a glance',
    'about.roleLabel': 'Role',
    'about.companyLabel': 'Company',
    'about.companyValue': `Deloitte · ${enterpriseSecurityArea}`,
    'about.locationLabel': 'Location',
    'about.locationValue': 'Turin, Italy',
    'about.focusLabel': 'Focus',
    'about.areasLabel': 'Areas',
    'about.writeMe': 'Write to me',

    'contact.kicker': 'Contact',
    'contact.title': 'Get in touch',
    'contact.subtitle': 'For collaborations, projects, or discussions about cybersecurity, AI, and technology.',
    'contact.email': 'Email',
    'contact.emailNote': '',
    'contact.socialTitle': 'Profiles',
    'contact.openProfile': 'Open profile',
    'contact.githubNote': 'Code, projects and public repositories.',
    'contact.linkedinNote': 'Professional background and work contacts.',
    'contact.hfNote': 'Models, datasets and AI experiments.',
    'contact.readyTensorNote': 'AI and machine learning publications and projects.',

    'ask.kicker': 'AI Assistant · site content',
    'ask.title': 'Ask away',
    'ask.subtitle':
      'An assistant that consults my content: articles, projects, and skills.',
    'ask.placeholder': 'E.g. what is your experience with cloud?',
    'ask.send': 'Send',
    'ask.note':
      'ⓘ Requests pass through the site\'s proxy to a self-hosted n8n workflow. Messages may be processed by external providers, depending on the models, APIs, and services used by the workflow.',
    'ask.fallback':
      'Oops, something went wrong. Please try again shortly.',
    'chat.open': 'Open the AI assistant',
    'chat.tagline': 'AI Assistant · site content',
    'chat.greeting': "Hi 👋 I'm Paolo's AI assistant. Ask me about his projects, articles or skills.",
    'chat.searching': 'Searching…',
    'chat.found': "Here's what I found:",
    'chat.empty': 'I found no results for this query.',
    'chat.error': 'Oops, something went wrong. Please try again shortly.',

    'skills.kicker': 'Skills',
    'skills.skillUnit': 'skills',
    'skills.inThisPage': 'On this page',
    'skills.source': 'Source',
    'skills.handsOn': 'hands-on',
    'skills.view': 'View',
    'skills.modeDots': 'Levels',
    'skills.modePct': 'Percent',

    'work.kicker': 'Projects',
    'work.subtitle': 'Independent projects across software development, cybersecurity, AI, cloud, and automation, with details on features, technologies, and implementation.',
    'work.all': 'all',
    'work.category': 'Category',
    'work.category.security': 'Security',
    'work.category.ai': 'AI',
    'work.category.automation': 'Automation',
    'work.category.cloud': 'Cloud',
    'work.category.tool': 'Tools',
    'work.main': 'Main projects',
    'work.other': 'Other projects',
    'work.problem': 'Problem',
    'work.solution': 'Solution',
    'work.outcome': 'Outcome',
    'work.stack': 'Stack',
    'work.back': '← projects',
    'work.empty': 'Projects coming soon.',
    'writing.empty': 'Articles coming soon in this language.',

    'writing.kicker': 'Articles',
    'writing.subtitle': 'Technical articles, guides, and hands-on experiences covering cybersecurity, cloud computing, Linux, automation, and artificial intelligence. I share projects, configurations, experiments, and insights into the technologies I work with and explore.',
    'writing.toc': 'On this page',
    'writing.back': '← writing',
    'writing.minRead': 'min read',
    'writing.min': 'min',
    'writing.search': 'Search articles…',
    'writing.allTags': 'all',
    'writing.noResults': 'No articles found.',
    'writing.count': 'articles',
  },
} as const;
