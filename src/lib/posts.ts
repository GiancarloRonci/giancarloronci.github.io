import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { getCollection, type CollectionEntry } from 'astro:content';
import { localizePath, useTranslations, type Lang } from '../i18n/ui';
import { CATEGORIES, type CategorySlug } from '../data/categories';

// Gli articoli stanno in src/content/posts/<lingua>/: l'id è quindi 'it/nome-file' o 'en/nome-file'.
// Due articoli sono uno la traduzione dell'altro se hanno la stessa translationKey nell'intestazione
// o, in mancanza, lo stesso nome di file nelle due cartelle.

export function getPostLang(post: CollectionEntry<'posts'>) {
  return post.id.split('/')[0] as Lang;
}

export function getPostSlug(post: CollectionEntry<'posts'>) {
  return post.id.split('/').slice(1).join('/');
}

export function getPostUrl(post: CollectionEntry<'posts'>) {
  return localizePath(`/posts/${getPostSlug(post)}/`, getPostLang(post));
}

// Articoli pubblicati in una lingua, dal più recente. Le bozze compaiono solo con `npm run dev`.
export async function getPublishedPosts(lang: Lang) {
  const posts = await getCollection(
    'posts',
    (post) => getPostLang(post) === lang && (import.meta.env.DEV || !post.data.draft),
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// Data e ora dell'ultima modifica di un articolo: l'ultimo commit che ha toccato il suo file.
// Un file non ancora committato usa la data di modifica sul disco; se git non è disponibile,
// si ripiega su `updated` o `date` dell'intestazione. Nel workflow di deploy serve la storia
// completa (fetch-depth: 0), altrimenti tutti gli articoli avrebbero l'ora dell'ultimo push.
const lastModifiedCache = new Map<string, Date>();

export function getLastModified(post: CollectionEntry<'posts'>) {
  const cached = lastModifiedCache.get(post.id);
  if (cached) return cached;

  let result = post.data.updated ?? post.data.date;
  if (post.filePath) {
    try {
      const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', post.filePath], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
      result = out ? new Date(out) : statSync(post.filePath).mtime;
    } catch {
      // git non disponibile: resta la data dell'intestazione
    }
  }

  lastModifiedCache.set(post.id, result);
  return result;
}

// Articoli pubblicati in una lingua, dal modificato più di recente
export async function getRecentlyUpdatedPosts(lang: Lang) {
  const posts = await getPublishedPosts(lang);
  return [...posts].sort((a, b) => getLastModified(b).valueOf() - getLastModified(a).valueOf());
}

function getTranslationKey(post: CollectionEntry<'posts'>) {
  return post.data.translationKey ?? getPostSlug(post);
}

export async function getTranslation(post: CollectionEntry<'posts'>, lang: Lang) {
  const posts = await getPublishedPosts(lang);
  return posts.find((other) => getTranslationKey(other) === getTranslationKey(post));
}

// Immagine per l'anteprima sui social: i social non leggono gli SVG, quindi si usa il PNG gemello
export function getSocialImage(src: string) {
  return src.replace(/\.svg$/, '.png');
}

export function getCategoryUrl(slug: CategorySlug, lang: Lang) {
  return localizePath(`/posts/category/${slug}/`, lang);
}

// Categorie che hanno almeno un articolo pubblicato nella lingua, nell'ordine di CATEGORIES
export async function getUsedCategories(lang: Lang) {
  const posts = await getPublishedPosts(lang);
  return CATEGORIES.map((category) => ({
    ...category,
    posts: posts.filter((post) => post.data.categories.includes(category.slug)),
  })).filter((category) => category.posts.length > 0);
}

export function formatDate(date: Date, lang: Lang) {
  return date.toLocaleDateString(useTranslations(lang).dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Data e ora, sempre nel fuso italiano: la build gira su un server in UTC
export function formatDateTime(date: Date, lang: Lang) {
  const t = useTranslations(lang);
  const day = date.toLocaleDateString(t.dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Rome',
  });
  const time = date.toLocaleTimeString(t.dateLocale, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Rome',
  });
  return `${day} ${t.at} ${time}`;
}
