export const LANGUAGES = {
  en: 'English',
  it: 'Italiano',
} as const;

export type Lang = keyof typeof LANGUAGES;

export const DEFAULT_LANG: Lang = 'en';

// Testi dell'interfaccia (menu, profilo, etichette). I contenuti delle pagine stanno nei rispettivi file.
export const UI = {
  it: {
    tagline: 'Data & Analytics Coaching and Advisory',
    description:
      'Architetture, strumenti, concetti, tecniche e strategie per massimizzare l’impatto di Data e Analytics sul business.',
    bio: 'Data & Analytics Coach e Advisor',
    location: 'Italia · Milano / Roma',
    navLabel: 'Navigazione principale',
    nav: { home: 'Home', posts: 'Articoli', about: 'Chi sono', cv: 'CV' },
    switchTo: 'Leggi in italiano',
    rss: 'Feed RSS',
    postsTitle: 'Articoli',
    postsDescription: 'Articoli e riflessioni su Data, Analytics e AI.',
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
    tagline: 'Data & Analytics Coaching and Advisory',
    description:
      'Architectures, Tools, Concepts, Techniques and Strategies for Optimizing the Impact of Data and Analytics on Business.',
    bio: 'Data & Analytics Coach and Advisor',
    location: 'Italy · Milan / Rome area',
    navLabel: 'Main navigation',
    nav: { home: 'Home', posts: 'Articles', about: 'About', cv: 'CV' },
    switchTo: 'Read in English',
    rss: 'RSS feed',
    postsTitle: 'Articles',
    postsDescription: 'Articles and reflections on Data, Analytics and AI.',
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
