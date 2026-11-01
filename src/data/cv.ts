import type { Lang } from '../i18n/ui';

// Dati del CV: li usano la pagina CV (/cv/, /it/cv/) e la home.
// Ogni voce ha la stessa struttura in inglese e in italiano: se aggiungi un'esperienza in una lingua,
// aggiungila anche nell'altra.

export interface CvEntry {
  period: string;
  title: string;
  description?: string;
  // highlights e technologies si vedono solo nella pagina CV, la home mostra la versione compatta
  highlights?: string[];
  technologies?: string[];
  logo?: string;
  logoAlt?: string;
}

export interface CvExpertise {
  title: string;
  description: string;
}

export interface Cv {
  summary: string[];
  expertise: CvExpertise[];
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

// Le tecnologie non si traducono: sono condivise tra le due lingue
const TECH = {
  soldo: [
    'AWS',
    'Amazon Redshift',
    'MySQL Aurora',
    'MySQL',
    'Pentaho Kettle',
    'Stored Procedures',
    'Tableau',
    'SOS Berlin Job Scheduler',
    'Python',
    'R',
    'XGBoost',
    'Decision Trees',
    'TensorFlow',
    'Agile (Scrum)',
    'Jira',
  ],
  altran: [
    'Teradata',
    'SQL Server',
    'Oracle',
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'IBM DataStage',
    'Pentaho Kettle',
    'SAS Visual Analytics',
    'Microsoft Power BI',
    'SSRS',
    'SAS Data Federation',
    'Teradata QueryGrid',
    'Erwin Data Modeler',
    'T-SQL',
    'REST API',
    'JSON',
    'Apache HDFS',
    'Apache Kafka',
    'Apache Spark',
    'Unix',
    'Linux',
    'Windows',
  ],
  nttData: [
    'Oracle (PL/SQL)',
    'Oracle Data Integrator',
    'Oracle Warehouse Builder',
    'OBIEE',
    'Oracle APEX',
    'Oracle WebLogic',
    'Oracle Forms',
    'IBM DB2',
    'IBM DataStage',
    'IBM Cognos',
    'Informatica PowerCenter',
    'Microsoft Analysis Server',
  ],
  dataSystem: [
    'Oracle',
    'PL/SQL',
    'MS SQL Server',
    'Oracle Forms',
    'Sybase PowerBuilder',
  ],
};

export const CV: Record<Lang, Cv> = {
  en: {
    summary: [
      'Experience in Business Intelligence, Data Warehousing, Data Engineering and Data Analytics, from both a functional and a technical perspective. Since 2017, leading cross-functional teams and managing complex projects, consistently delivering high-quality, forward-thinking solutions that give business units accurate and timely insights.',
      'The vision: integrated data ecosystems that support business growth and optimize decision-making processes, balancing strategic vision with advanced technical skills.',
    ],
    expertise: [
      {
        title: 'Leadership and Project Management',
        description:
          'Coordinating teams of data engineers, data analysts and BI developers, with agile methodologies and goal-oriented management, to ensure timely and accurate delivery of data solutions.',
      },
      {
        title: 'Business Intelligence and Data Strategy',
        description:
          'Designing and implementing BI strategies that transform business data into actionable insights and support strategic decision making.',
      },
      {
        title: 'Data Warehousing and Data Engineering',
        description:
          'Designing scalable data warehouse architectures and developing efficient ETL processes optimized for advanced data integration and analytics.',
      },
      {
        title: 'Machine Learning and AI applied to Data Analytics',
        description:
          'Developing machine learning models for fraud detection, churn prediction and anti-money laundering, with a focus on real-time solutions.',
      },
      {
        title: 'Consulting experience and strategic vision',
        description:
          'A background at NTT Data and Altran, on projects of all sizes and complexities, brought to companies building their data management foundations.',
      },
      {
        title: 'Communication and team engagement',
        description:
          'A structured approach, including in remote work, that emphasizes effective communication and team engagement while maintaining high productivity and morale.',
      },
    ],
    experience: [
      {
        period: 'Sep 2017 – Present',
        title: 'Head of Data Management & Data Warehouse · Soldo · Italy',
        logo: '/assets/images/companies/soldo.svg',
        logoAlt: 'Soldo logo',
        description:
          'Leading all managerial and technical aspects of Data Engineering, Data Warehousing, Business Intelligence / Analytics and Data Management, keeping data infrastructure aligned with business needs, and leading the internal team dedicated to Data Management and Analytics.',
        highlights: [
          'Planning and evolution of the company Data Warehouse, with scalable solutions that optimize data accessibility and performance',
          'Bridge between technical teams and business stakeholders, so that data exploration, analysis and visualization support strategic decisions',
          'Responsibility for data architectures, transformation processes and real-time streaming, enabling advanced analytics and BI capabilities',
          'Reporting systems focused on data visualization and user experience, providing clear and actionable insights to business users through Tableau',
          'Design and optimization of data pipelines and robust data governance on AWS, Amazon Redshift and MySQL Aurora',
          'Machine learning and data science solutions, in particular fraud detection on financial transactions, with improved model accuracy, reduced processing time and increased operational efficiency',
        ],
        technologies: TECH.soldo,
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
        period: 'Nov 2013 – Sep 2017',
        title: 'Data Warehouse BI Technical and Functional Analyst, DWH Architect · Altran S.p.A.',
        description:
          'Technical and functional analysis in Data Warehousing and Business Intelligence and design of data warehouse systems, including highly complex ones, also acting as team leader and technical manager.',
        highlights: [
          'Team leadership',
          'Business requirements analysis',
          'Testing and Data Quality',
          'Management of the project data model',
          'Development activities on the ETL and reporting layers',
          'Data Warehouse design: loading techniques, optimized partitioning, indexing, data mart design and optimization of OLAP layers',
        ],
        technologies: TECH.altran,
      },
      {
        period: 'Nov 2013 – Sep 2017',
        title: 'BI Data Warehouse Architect, Technical & Project Manager · Altran S.p.A.',
        description:
          'Managing the data warehouse architectures of the projects, with schedules and activity estimates, coordinating the analysis and development groups and handling the relationship with the end customer.',
        highlights: [
          'Project start-up, publication of deliverables and of business case documents',
          'Development and implementation of feasibility studies',
          'Data Warehouse design, interfacing it with Big Data technologies',
          'Promoting communication and shared understanding in the project team, allocating resources to activities and closely monitoring the performance of all tasks',
        ],
      },
      {
        period: 'Oct 2005 – Nov 2013',
        title: 'Data Warehouse and Business Intelligence Technical Analyst & Developer · NTT DATA Italia',
        description:
          'Technical analysis and software development in Data Warehousing and Business Intelligence: process design, data acquisition and processing, database design, reporting planning and development.',
        highlights: [
          'Technical analysis',
          'Business requirements analysis',
          'Testing and Data Quality',
          'Management of the project data model',
          'Development activities',
          'Data Mining activities',
        ],
        technologies: TECH.nttData,
      },
      {
        period: 'Aug 2001 – Oct 2005',
        title: 'Analyst Developer · 3F DATA SYSTEM S.p.A.',
        description:
          'Oracle analyst programmer in Rome and developer of graphical user interfaces for storing and processing data.',
        highlights: [
          'Handling databases through PL/SQL procedures, functions and triggers',
          'Data replication through the implementation of snapshots',
          'Relational / procedural data architectures and data warehouse approach',
        ],
        technologies: TECH.dataSystem,
      },
    ],
    education: [
      {
        period: '1997 – 2004',
        title: 'Degree in Electronic Engineering · Sapienza University of Rome',
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
    summary: [
      'Esperienza in Business Intelligence, Data Warehousing, Data Engineering e Data Analytics, sia dal punto di vista funzionale sia da quello tecnico. Dal 2017 guida team cross-funzionali e gestisce progetti complessi, realizzando con costanza soluzioni di qualità e orientate al futuro che forniscono alle business unit informazioni accurate e tempestive.',
      'La visione: ecosistemi di dati integrati che sostengono la crescita del business e ottimizzano i processi decisionali, in equilibrio tra visione strategica e competenze tecniche avanzate.',
    ],
    expertise: [
      {
        title: 'Leadership e Project Management',
        description:
          'Coordinamento di team di data engineer, data analyst e sviluppatori BI, con metodologie agili e gestione per obiettivi, per garantire una delivery puntuale e accurata delle soluzioni dati.',
      },
      {
        title: 'Business Intelligence e Data Strategy',
        description:
          'Progettazione e implementazione di strategie BI che trasformano i dati di business in informazioni utili all’azione e supportano le decisioni strategiche.',
      },
      {
        title: 'Data Warehousing e Data Engineering',
        description:
          'Progettazione di architetture di data warehouse scalabili e sviluppo di processi ETL efficienti, ottimizzati per l’integrazione avanzata dei dati e per gli analytics.',
      },
      {
        title: 'Machine Learning e AI applicati alla Data Analytics',
        description:
          'Sviluppo di modelli di machine learning per fraud detection, churn prediction e antiriciclaggio, con un’attenzione particolare alle soluzioni real-time.',
      },
      {
        title: 'Esperienza di consulenza e visione strategica',
        description:
          'Un percorso in NTT Data e Altran, su progetti di ogni dimensione e complessità, messo a disposizione delle aziende che costruiscono le basi del proprio data management.',
      },
      {
        title: 'Comunicazione e coinvolgimento del team',
        description:
          'Un approccio strutturato, anche nel lavoro da remoto, che punta su comunicazione efficace e coinvolgimento del team, mantenendo alte produttività e motivazione.',
      },
    ],
    experience: [
      {
        period: 'Set 2017 – Oggi',
        title: 'Head of Data Management & Data Warehouse · Soldo · Italia',
        logo: '/assets/images/companies/soldo.svg',
        logoAlt: 'Logo Soldo',
        description:
          'Guida tutti gli aspetti manageriali e tecnici di Data Engineering, Data Warehousing, Business Intelligence / Analytics e Data Management, mantenendo le infrastrutture dati allineate alle esigenze del business, e dirige il team interno dedicato a Data Management e Analytics.',
        highlights: [
          'Pianificazione ed evoluzione del Data Warehouse aziendale, con soluzioni scalabili che ottimizzano accessibilità dei dati e prestazioni',
          'Raccordo tra team tecnici e stakeholder di business, perché esplorazione, analisi e visualizzazione dei dati supportino le decisioni strategiche',
          'Responsabilità di architetture dati, processi di trasformazione e streaming real-time, per abilitare analytics avanzati e BI',
          'Sistemi di reportistica incentrati su data visualization e user experience, per dare agli utenti di business informazioni chiare e utili all’azione tramite Tableau',
          'Progettazione e ottimizzazione delle pipeline dati e solida data governance su AWS, Amazon Redshift e MySQL Aurora',
          'Soluzioni di machine learning e data science, in particolare per la fraud detection sulle transazioni finanziarie, con maggiore accuratezza dei modelli, tempi di elaborazione ridotti e più efficienza operativa',
        ],
        technologies: TECH.soldo,
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
        period: 'Nov 2013 – Set 2017',
        title: 'Data Warehouse BI Technical and Functional Analyst, DWH Architect · Altran S.p.A.',
        description:
          'Analisi tecnica e funzionale in ambito Data Warehousing e Business Intelligence e progettazione di sistemi di data warehouse, anche ad alta complessità, con ruolo di team leader e responsabile tecnico.',
        highlights: [
          'Team leadership',
          'Analisi dei requisiti di business',
          'Testing e Data Quality',
          'Gestione del modello dati di progetto',
          'Attività di sviluppo sui livelli ETL e di reporting',
          'Progettazione del Data Warehouse: tecniche di caricamento, partizionamento ottimizzato, indicizzazione, progettazione dei data mart e ottimizzazione dei livelli OLAP',
        ],
        technologies: TECH.altran,
      },
      {
        period: 'Nov 2013 – Set 2017',
        title: 'BI Data Warehouse Architect, Technical & Project Manager · Altran S.p.A.',
        description:
          'Gestione delle architetture di data warehouse dei progetti, con pianificazione e stima delle attività, coordinamento dei gruppi di analisi e sviluppo e gestione del rapporto con il cliente finale.',
        highlights: [
          'Avvio del progetto, pubblicazione dei deliverable e dei documenti di business case',
          'Sviluppo e realizzazione di studi di fattibilità',
          'Progettazione del Data Warehouse e interfacciamento con le tecnologie Big Data',
          'Promozione della comunicazione e della comprensione reciproca nel team di progetto, assegnazione delle risorse alle attività e monitoraggio ravvicinato di tutti i task',
        ],
      },
      {
        period: 'Ott 2005 – Nov 2013',
        title: 'Data Warehouse and Business Intelligence Technical Analyst & Developer · NTT DATA Italia',
        description:
          'Analisi tecnica e sviluppo software in ambito Data Warehousing e Business Intelligence: progettazione dei processi, acquisizione ed elaborazione dei dati, progettazione di database, pianificazione e sviluppo della reportistica.',
        highlights: [
          'Analisi tecnica',
          'Analisi dei requisiti di business',
          'Testing e Data Quality',
          'Gestione del modello dati di progetto',
          'Attività di sviluppo',
          'Attività di Data Mining',
        ],
        technologies: TECH.nttData,
      },
      {
        period: 'Ago 2001 – Ott 2005',
        title: 'Analyst Developer · 3F DATA SYSTEM S.p.A.',
        description:
          'Analista programmatore Oracle a Roma e sviluppatore di interfacce grafiche per l’archiviazione e l’elaborazione dei dati.',
        highlights: [
          'Gestione dei database tramite procedure, funzioni e trigger PL/SQL',
          'Replica dei dati tramite l’implementazione di snapshot',
          'Architetture dati relazionali / procedurali e approccio data warehouse',
        ],
        technologies: TECH.dataSystem,
      },
    ],
    education: [
      {
        period: '1997 – 2004',
        title: 'Laurea in Ingegneria Elettronica · Università La Sapienza di Roma',
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
