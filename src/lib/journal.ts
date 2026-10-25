/**
 * ── Journal: helpers ──────────────────────────────────
 *
 * Memos ordenados por fecha, slug sin sufijos de idioma, URL y un
 * extracto en texto plano sacado del primer párrafo del markdown.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { getLocalePath } from '../i18n/utils';
import type { Lang } from '../i18n/ui';

export type Memo = CollectionEntry<'journal'>;

export const memoSlug = (id: string) => id.replace(/^es-|-es$/g, '');

export const memoHref = (memo: Memo, lang: Lang) => getLocalePath(`/journal/${memoSlug(memo.id)}`, lang);

export const memoDate = (d: Date) => d.toISOString().split('T')[0].replace(/-/g, '.');

export async function getMemos(lang: Lang): Promise<Memo[]> {
  return (await getCollection('journal', ({ data }) => data.lang === lang && data.draft !== true))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Primer párrafo de texto (sin títulos, listas ni markdown), recortado. */
export function excerpt(memo: Memo, max = 190): string {
  const paragraph = (memo.body ?? '')
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block && !/^(#|-|\*|\d+\.|>|!\[)/.test(block));
  if (!paragraph) return '';
  const plain = paragraph
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ');
  return plain.length > max ? `${plain.slice(0, max).replace(/\s+\S*$/, '')}…` : plain;
}

/** Rutas estáticas de los memos, cada uno con el siguiente (más antiguo). */
export async function memoPaths(lang: Lang) {
  const memos = await getMemos(lang);
  return memos.map((memo, i) => ({
    params: { slug: memoSlug(memo.id) },
    props: { memo, n: memos.length - i, next: memos[i + 1] },
  }));
}
