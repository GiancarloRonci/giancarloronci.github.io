export const SITE_TITLE = 'Giancarlo Ronci';

export const AUTHOR = {
  name: 'Giancarlo Ronci',
  avatar: '/assets/images/MyPic.jpeg',
  jobTitles: ['Data Management & Data Analytics Lead', 'Data & Analytics Coach and Advisor'],
  email: 'giancarlo.ronci@gmail.com',
  phone: '+39 331 828 0118',
  linkedin: 'https://www.linkedin.com/in/roncigiancarlo/',
  github: 'https://github.com/GiancarloRonci',
};

// Menu di navigazione principale. Le etichette sono in src/i18n/ui.ts (chiave `nav`),
// gli indirizzi vengono prefissati con /it/ per la versione italiana.
export const NAVIGATION = [
  { key: 'home', path: '/' },
  { key: 'posts', path: '/posts/' },
  { key: 'cv', path: '/cv/' },
  { key: 'about', path: '/about/' },
] as const;
