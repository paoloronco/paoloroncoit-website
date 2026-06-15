import { ui, defaultLang, type Lang } from './ui';

export const languages: Record<Lang, string> = { it: 'Italiano', en: 'English' };
export { defaultLang };
export type { Lang };

/** Ricava la lingua dall'URL: /en/... → 'en', altrimenti 'it'. */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg === 'en') return 'en';
  return defaultLang;
}

/** Traduzioni per la lingua data, con fallback su IT. */
export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['it']): string {
    return (ui[lang] as Record<string, string>)[key] ?? ui[defaultLang][key];
  };
}

/** Rimuove l'eventuale prefisso /en, restituendo il path "canonico" IT. */
export function stripLangPrefix(pathname: string): string {
  if (pathname === '/en' || pathname === '/en/') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3);
  return pathname;
}

/** Da un path canonico (IT) produce il path nella lingua richiesta. */
export function localizePath(path: string, lang: Lang): string {
  const clean = stripLangPrefix(path);
  if (lang === defaultLang) return clean;
  if (clean === '/') return '/en/';
  return '/en' + clean;
}

/** Content collections: l'id è "it/slug" o "en/slug". */
export const entrySlug = (id: string) => id.replace(/^(it|en)\//, '');
export const entryLang = (id: string): Lang => (id.startsWith('en/') ? 'en' : 'it');
