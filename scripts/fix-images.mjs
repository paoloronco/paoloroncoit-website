import fs from 'node:fs';
const p = 'src/content/writing/it/';
const reps = [
  ['ai-instagram-reels-automazione-avanzata-con-make-com-openai-e-google-cloud', 'https://portfolio.paoloronco.it/wp-content/uploads/2025/03/image-1024x290.png', '/posts/ai-instagram-reels-automazione-avanzata-con-make-com-openai-e-google-cloud/image-1024x290.png'],
  ['automatizzare-wordpress-con-make-com-dal-post-al-voiceover-in-cloud', 'https://portfolio.paoloronco.it/wp-content/uploads/2025/04/image-1024x493.png', '/posts/automatizzare-wordpress-con-make-com-dal-post-al-voiceover-in-cloud/image-1024x493.png'],
  ['pr-utilities-net-utility-e-software-it-accessibili-a-tutti', 'https://prportfolio.paoloronco.it/wp-content/uploads/2024/03/image-1024x539.png', '/posts/pr-utilities-net-utility-e-software-it-accessibili-a-tutti/image-1024x539.png'],
  ['tabs-session-saver-il-tuo-compagno-ideale-per-gestire-le-tue-sessioni-di-navigazione', 'https://portfolio.paoloronco.it/wp-content/uploads/2025/04/image-1-1024x640.png', '/posts/tabs-session-saver-il-tuo-compagno-ideale-per-gestire-le-tue-sessioni-di-navigazione/image-1-1024x640.png'],
];
for (const [slug, from, to] of reps) {
  const f = p + slug + '.md';
  let c = fs.readFileSync(f, 'utf8');
  const had = c.includes(from);
  c = c.split(from).join(to);
  fs.writeFileSync(f, c);
  console.log((had ? 'rewrote ' : 'NOT FOUND ') + slug);
}
const ef = p + 'email-signature-creator-il-miomodello-chatgpt-market-per-generare-firme-email-personalizzate.md';
let e = fs.readFileSync(ef, 'utf8');
e = e.replace(/!\[[^\]]*\]\(https:\/\/www\.paoloronco\.it\/images\/1\)/g, '').replace(/\n{3,}/g, '\n\n');
fs.writeFileSync(ef, e);
console.log('cleaned email-signature broken img');
