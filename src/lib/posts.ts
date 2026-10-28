import { getCollection, type CollectionEntry } from 'astro:content';
import { localizePath, useTranslations, type Lang } from '../i18n/ui';

// Gli articoli stanno in src/content/posts/<lingua>/: l'id è quindi 'it/nome-file' o 'en/nome-file'.
// Due file con lo stesso nome nelle due cartelle sono uno la traduzione dell'altro.

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

export async function getTranslation(post: CollectionEntry<'posts'>, lang: Lang) {
  const posts = await getPublishedPosts(lang);
  return posts.find((other) => getPostSlug(other) === getPostSlug(post));
}

export function formatDate(date: Date, lang: Lang) {
  return date.toLocaleDateString(useTranslations(lang).dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
