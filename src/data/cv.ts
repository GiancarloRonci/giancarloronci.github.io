import type { Lang } from '../i18n/ui';

// Dati del CV: li usano la pagina CV (/cv/, /it/cv/) e la home.
// Ogni voce ha la stessa struttura in inglese e in italiano: se aggiungi un'esperienza in una lingua,
// aggiungila anche nell'altra.

export interface CvEntry {
  period: string;
  title: string;
  description: string;
  highlights?: string[];
  logo?: string;
  logoAlt?: string;
}

export interface Cv {
  // PDF scaricabile, in public/. Il pulsante di download compare solo se il file esiste.
  pdf: string;
  experience: CvEntry[];
  education: CvEntry[];
  skills: string[];
}

const SKILLS = [
  'Data Strategy',
  'Data Management',
  'Data Warehouse',
  'Data Engineering',
  'Cloud Data Platforms',
  'Data Governance',
  'Data Quality',
  'Business Intelligence',
  'Advanced Analytics',
  'AI Enablement',
];

export const CV: Record<Lang, Cv> = {
  en: {
    pdf: '/assets/files/Giancarlo_Ronci_CV_EN.pdf',
    experience: [
      {
        period: 'Current',
        title: 'Head of Data Management & Data Warehouse · Soldo · Italy',
        logo: '/assets/images/companies/soldo.svg',
        logoAlt: 'Soldo logo',
        description:
          'Leading initiatives on data platform evolution, data warehouse architecture and analytics enablement in a fintech environment.',
        highlights: [
          'Modern cloud data architecture and data warehouse evolution',
          'Data engineering, orchestration and near real-time data pipelines',
          'Data governance, data quality and analytical data exposure',
        ],
      },
      {
        period: 'Advisory',
        title: 'Data & Analytics Coach & Advisor',
        description:
          'Supporting professionals, managers and organizations in strengthening their data capabilities through structured coaching and advisory.',
        highlights: [
          'Data Strategy and target operating model',
          'Coaching on data leadership, architecture and analytics maturity',
          'Practical guidance on BI, ML and AI adoption paths',
        ],
      },
      {
        period: 'Focus areas',
        title: 'Data Platform, Governance and Analytics Transformation',
        description:
          'Over the years, Giancarlo has worked across different layers of the data value chain, from modeling and warehousing to analytics delivery and organizational enablement.',
        highlights: [
          'Enterprise data warehouse and dimensional / analytical modeling',
          'Cloud services and ecosystem integration',
          'Business-facing analytics and data-driven decision support',
        ],
      },
    ],
    education: [
      {
        period: 'Academic background',
        title: 'Engineering, Data and Technology background',
        description:
          'Academic and professional development centered on technology, data systems and analytical problem solving, continuously expanded through practical work on platforms, architectures and applied analytics.',
      },
      {
        period: 'Continuous learning',
        title: 'Ongoing professional development',
        description:
          'Continuous focus on cloud data platforms, data engineering, data governance, machine learning, AI and managerial growth in Data & Analytics leadership.',
      },
    ],
    skills: SKILLS,
  },
  it: {
    pdf: '/assets/files/Giancarlo_Ronci_CV_IT.pdf',
    experience: [
      {
        period: 'Attuale',
        title: 'Head of Data Management & Data Warehouse · Soldo · Italia',
        logo: '/assets/images/companies/soldo.svg',
        logoAlt: 'Logo Soldo',
        description:
          'Guida le iniziative di evoluzione della data platform, dell’architettura del data warehouse e dell’analytics enablement in un contesto fintech.',
        highlights: [
          'Architettura dati cloud moderna ed evoluzione del data warehouse',
          'Data engineering, orchestrazione e pipeline dati near real-time',
          'Data governance, data quality ed esposizione dei dati per l’analisi',
        ],
      },
      {
        period: 'Advisory',
        title: 'Data & Analytics Coach & Advisor',
        description:
          'Affianca professionisti, manager e organizzazioni nel rafforzare le proprie competenze sui dati attraverso percorsi strutturati di coaching e advisory.',
        highlights: [
          'Data Strategy e target operating model',
          'Coaching su data leadership, architettura e maturità analitica',
          'Indicazioni pratiche sui percorsi di adozione di BI, ML e AI',
        ],
      },
      {
        period: 'Aree di focus',
        title: 'Data Platform, Governance e trasformazione Analytics',
        description:
          'Negli anni Giancarlo ha lavorato su diversi livelli della catena del valore del dato, dalla modellazione e dal warehousing fino alla delivery degli analytics e all’abilitazione organizzativa.',
        highlights: [
          'Enterprise data warehouse e modellazione dimensionale / analitica',
          'Servizi cloud e integrazione dell’ecosistema',
          'Analytics orientati al business e supporto alle decisioni data-driven',
        ],
      },
    ],
    education: [
      {
        period: 'Percorso accademico',
        title: 'Formazione in ingegneria, dati e tecnologia',
        description:
          'Un percorso accademico e professionale incentrato su tecnologia, sistemi dati e problem solving analitico, ampliato nel tempo attraverso il lavoro concreto su piattaforme, architetture e analytics applicati.',
      },
      {
        period: 'Formazione continua',
        title: 'Sviluppo professionale continuo',
        description:
          'Attenzione costante a data platform cloud, data engineering, data governance, machine learning, AI e crescita manageriale nella leadership Data & Analytics.',
      },
    ],
    skills: SKILLS,
  },
};
