import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE_TITLE } from '../consts';
import { useTranslations, type Lang } from '../i18n/ui';
import { getPostUrl, getPublishedPosts } from './posts';

export async function buildFeed(context: APIContext, lang: Lang) {
  const posts = await getPublishedPosts(lang);
  return rss({
    title: SITE_TITLE,
    description: useTranslations(lang).description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: getPostUrl(post),
    })),
    customData: `<language>${lang}</language>`,
  });
}
