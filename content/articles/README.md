# Articoli e post

- [`it/`](./it/) contiene gli articoli italiani pubblicati su `/writing/...`.
- [`en/`](./en/) contiene le rispettive traduzioni pubblicate su `/en/writing/...`.
- [`_template.md.txt`](./_template.md.txt) è il modello per creare un articolo.

Per aggiungere un articolo, copia il modello in `it/<slug>.md`, rinominalo con uno slug descrittivo e compila frontmatter e testo. Quando esiste la traduzione, crea in `en/` un file con esattamente lo stesso nome. Usa `draft: true` per non pubblicare una bozza.

Le immagini richiamate dal Markdown vanno in `public/posts/<slug>/` e si usano con un percorso come `/posts/<slug>/immagine.png`.
