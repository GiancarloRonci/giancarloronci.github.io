export const LANGUAGES = {
  en: 'English',
  it: 'Italiano',
} as const;

export type Lang = keyof typeof LANGUAGES;

export const DEFAULT_LANG: Lang = 'en';

// Testi dell'interfaccia (menu, profilo, etichette). I contenuti delle pagine stanno nei rispettivi file.
export const UI = {
  it: {
    tagline: 'Blog su Data Analytics e AI',
    description:
      'Un blog sulla Data Analytics e sul rapporto tra AI e Data Analytics: architetture, pratiche e strategie per trasformare i dati in valore per il business.',
    bio: 'Data & Analytics Coach e Advisor',
    location: 'Italia · Milano / Roma',
    navLabel: 'Navigazione principale',
    nav: { home: 'Home', posts: 'Blog', about: 'Chi sono', cv: 'CV' },
    switchTo: 'Leggi in italiano',
    rss: 'Feed RSS',
    postsTitle: 'Blog',
    postsDescription:
      'Articoli sulla Data Analytics e sul rapporto tra AI e Data Analytics: come l’AI cambia il modo di analizzare i dati, e quali dati servono perché l’AI generi valore.',
    noPosts: 'Nessun articolo pubblicato, per ora.',
    allPosts: '← Tutti gli articoli',
    updatedOn: 'aggiornato il',
    draft: 'bozza',
    cv: {
      title: 'Curriculum Vitae',
      description: 'Curriculum di Giancarlo Ronci: esperienza, formazione e competenze in Data & Analytics.',
      intro: 'Esperienza professionale, formazione e competenze principali.',
      download: 'Scarica il CV (PDF)',
      experience: 'Esperienza professionale',
      education: 'Formazione',
      skills: 'Competenze principali',
      contact: 'Contatti',
    },
    dateLocale: 'it-IT',
  },
  en: {
    tagline: 'Data Analytics & AI Blog',
    description:
      'A blog on Data Analytics and on the relationship between AI and Data Analytics: architectures, practices and strategies to turn data into business value.',
    bio: 'Data & Analytics Coach and Advisor',
    location: 'Italy · Milan / Rome area',
    navLabel: 'Main navigation',
    nav: { home: 'Home', posts: 'Blog', about: 'About', cv: 'CV' },
    switchTo: 'Read in English',
    rss: 'RSS feed',
    postsTitle: 'Blog',
    postsDescription:
      'Articles on Data Analytics and on the relationship between AI and Data Analytics: how AI changes the way we analyse data, and what data AI needs to deliver value.',
    noPosts: 'No articles published yet.',
    allPosts: '← All articles',
    updatedOn: 'updated on',
    draft: 'draft',
    cv: {
      title: 'Curriculum Vitae',
      description: 'Curriculum of Giancarlo Ronci: experience, education and skills in Data & Analytics.',
      intro: 'Professional experience, education and core expertise.',
      download: 'Download CV (PDF)',
      experience: 'Professional Career',
      education: 'Education',
      skills: 'Core expertise',
      contact: 'Contact',
    },
    dateLocale: 'en-GB',
  },
} satisfies Record<Lang, unknown>;

export function getLang(locale: string | undefined): Lang {
  return locale && locale in LANGUAGES ? (locale as Lang) : DEFAULT_LANG;
}

export function useTranslations(lang: Lang) {
  return UI[lang];
}

// '/about/' -> '/it/about/' per l'italiano; la lingua principale (inglese) resta senza prefisso
export function localizePath(path: string, lang: Lang) {
  return lang === DEFAULT_LANG ? path : `/${lang}${path}`;
}

// Stessa pagina nell'altra lingua: '/it/about/' -> '/about/' e viceversa
export function translatePath(path: string, lang: Lang) {
  const prefix = new RegExp(`^/(${Object.keys(LANGUAGES).join('|')})(?=/|$)`);
  const basePath = path.replace(prefix, '') || '/';
  return localizePath(basePath, lang);
}
