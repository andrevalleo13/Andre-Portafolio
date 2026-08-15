/**
 * ── i18n: Utility Functions ───────────────────────────
 * 
 * Helpers to extract the current language from a URL
 * and to retrieve translated strings from ui.ts.
 */

import { ui, defaultLang, type Lang } from './ui';

/**
 * Extract the language prefix from the current URL.
 * 
 *   /es/about  →  'es'
 *   /about     →  'en'  (default)
 */
export function getLangFromUrl(url: URL): Lang {
  const [, langSegment] = url.pathname.split('/');
  if (langSegment in ui) return langSegment as Lang;
  return defaultLang;
}

/**
 * Returns a `t()` function scoped to the given language.
 * 
 * Usage in Astro components:
 *   const lang = getLangFromUrl(Astro.url);
 *   const t = useTranslations(lang);
 *   t('hero.descriptor')  →  'Finance · Entrepreneurship · Technology'
 */
export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

/**
 * Build a localized path.
 * 
 *   getLocalePath('/about', 'es')  →  '/es/about'
 *   getLocalePath('/about', 'en')  →  '/about'
 */
export function getLocalePath(path: string, lang: Lang): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}

/**
 * Get the alternate language path for the current URL.
 * Used for the EN/ES toggle links.
 * 
 *   getAlternateLangPath('/es/about')  →  '/about'
 *   getAlternateLangPath('/about')     →  '/es/about'
 */
export function getAlternateLangPath(pathname: string): { lang: Lang; href: string } {
  const [, langSegment, ...rest] = pathname.split('/');

  if (langSegment in ui && langSegment !== defaultLang) {
    // Currently in non-default lang → switch to default
    const basePath = '/' + rest.join('/') || '/';
    return { lang: defaultLang, href: basePath };
  }

  // Currently in default lang → switch to 'es'
  const targetLang: Lang = 'es';
  return { lang: targetLang, href: `/${targetLang}${pathname === '/' ? '' : pathname}` || `/${targetLang}` };
}
