# Contenuti del sito

Questa è l'area di lavoro editoriale del sito. Da qui puoi trovare, modificare e aggiungere i contenuti senza entrare nelle cartelle del codice applicativo.

## Accesso rapido

| Contenuto | Dove si modifica | Come si aggiunge |
|---|---|---|
| Articoli in italiano | [`articles/it/`](./articles/it/) | copia [`articles/_template.md.txt`](./articles/_template.md.txt) |
| Articoli in inglese | [`articles/en/`](./articles/en/) | usa lo stesso nome file della versione italiana |
| Progetti in italiano | [`projects/it/`](./projects/it/) | copia [`projects/_template.md.txt`](./projects/_template.md.txt) |
| Progetti in inglese | [`projects/en/`](./projects/en/) | usa lo stesso nome file della versione italiana |
| Profilo e navigazione | [`site/profile.ts`](./site/profile.ts) | modifica i valori esistenti |
| Competenze | [`site/skills.ts`](./site/skills.ts) | aggiungi o modifica categorie e skill |
| CV | [`site/cv.json`](./site/cv.json) | modifica il JSON mantenendo la struttura |
| Certificazioni | [`site/certificate-assets.ts`](./site/certificate-assets.ts) | aggiungi una voce all'elenco |
| Testi legali | [`site/legal.ts`](./site/legal.ts) | modifica la sezione italiana o inglese |
| Traduzioni dell'interfaccia | [`translations/ui.ts`](./translations/ui.ts) | aggiungi la stessa chiave in `it` e `en` |

Le immagini degli articoli sono in [`public/posts/`](../public/posts/), i PDF dei certificati in [`public/certificati/`](../public/certificati/) e i loghi in [`public/logos/`](../public/logos/).

## Regole semplici

- Usa nomi file minuscoli con trattini per i nuovi articoli, per esempio `mio-nuovo-articolo.md`.
- Mantieni lo stesso nome file tra italiano e inglese: serve al selettore della lingua.
- Non rimuovere i delimitatori `---` o i campi obbligatori all'inizio dei Markdown.
- Imposta `draft: true` finché un articolo o progetto non è pronto.
- Prima di pubblicare esegui `npm run check` e `npm run build` dalla root della repository.

Le regole tecniche di validazione restano in [`src/content.config.ts`](../src/content.config.ts); normalmente non serve modificarle.
