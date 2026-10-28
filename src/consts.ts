export const SITE_TITLE = 'Giancarlo Ronci';

export const AUTHOR = {
  name: 'Giancarlo Ronci',
  avatar: '/assets/images/MyPic.jpeg',
  email: 'giancarlo.ronci@gmail.com',
  linkedin: 'https://www.linkedin.com/in/roncigiancarlo/',
  github: 'https://github.com/GiancarloRonci',
};

// Menu di navigazione principale. Le etichette sono in src/i18n/ui.ts (chiave `nav`),
// gli indirizzi vengono prefissati con /it/ per la versione italiana.
export const NAVIGATION = [
  { key: 'home', path: '/' },
  { key: 'posts', path: '/posts/' },
  { key: 'about', path: '/about/' },
  // Riattivare quando il PDF è in public/assets/files/
  // { key: 'cv', path: '/assets/files/Giancarlo_Ronci_CV.pdf', shared: true },
] as const;
