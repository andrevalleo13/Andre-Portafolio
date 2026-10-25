/**
 * ── Work: helpers ─────────────────────────────────────
 *
 * Orden de los proyectos (lotes) y slug sin prefijo de idioma.
 * Compartido por el home, el índice de Work y las páginas de caso.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

/** Orden de los lotes; lo que no esté aquí va al final. */
const ORDER = ['cord', 'flouvia'];

export const workSlug = (id: string) => id.replace(/^es-/, '');

export async function getWork(lang: Lang): Promise<CollectionEntry<'work'>[]> {
  const rank = (id: string) => {
    const i = ORDER.indexOf(workSlug(id));
    return i === -1 ? ORDER.length : i;
  };
  return (await getCollection('work', ({ data }) => data.lang === lang && data.draft !== true))
    .sort((a, b) => rank(a.id) - rank(b.id));
}

/** Rutas estáticas de los casos, cada uno con su lote y el siguiente. */
export async function workPaths(lang: Lang) {
  const work = await getWork(lang);
  return work.map((project, i) => ({
    params: { id: workSlug(project.id) },
    props: {
      project,
      lot: i + 1,
      next: work.length > 1 ? work[(i + 1) % work.length] : undefined,
      nextLot: work.length > 1 ? ((i + 1) % work.length) + 1 : undefined,
    },
  }));
}
