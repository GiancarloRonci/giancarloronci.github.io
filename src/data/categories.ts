// Categorie del blog: elenco fisso delle aree di Data Management & Data Analytics.
// Ogni articolo ne indica una o più nel frontmatter (`categories: [data-governance, ...]`),
// usando lo slug. Per aggiungere una categoria basta aggiungerla qui.
// I tag restano liberi; le categorie no, così l'elenco resta ordinato.

export const CATEGORIES = [
  {
    slug: 'data-strategy',
    label: { en: 'Data Strategy & Organization', it: 'Data Strategy & Organizzazione' },
    description: {
      en: 'Strategy, operating models, roles, priorities and leadership of data teams.',
      it: 'Strategia, modelli operativi, ruoli, priorità e leadership dei team dati.',
    },
  },
  {
    slug: 'data-governance',
    label: { en: 'Data Governance', it: 'Data Governance' },
    description: {
      en: 'Ownership, definitions, policies and the rules that make data trustworthy.',
      it: 'Responsabilità, definizioni, policy e regole che rendono i dati affidabili.',
    },
  },
  {
    slug: 'data-quality',
    label: { en: 'Data Quality', it: 'Data Quality' },
    description: {
      en: 'Testing, monitoring and the processes that keep data correct, complete and on time.',
      it: 'Test, monitoraggio e processi che mantengono i dati corretti, completi e puntuali.',
    },
  },
  {
    slug: 'data-architecture',
    label: { en: 'Data Architecture & Platforms', it: 'Architetture & Piattaforme dati' },
    description: {
      en: 'Cloud data platforms, architectural choices and the technologies behind them.',
      it: 'Piattaforme dati in cloud, scelte architetturali e tecnologie.',
    },
  },
  {
    slug: 'data-engineering',
    label: { en: 'Data Engineering', it: 'Data Engineering' },
    description: {
      en: 'Pipelines, integration, orchestration and the craft of moving data reliably.',
      it: 'Pipeline, integrazione, orchestrazione e il mestiere di spostare i dati in modo affidabile.',
    },
  },
  {
    slug: 'data-modeling',
    label: { en: 'Data Modeling & Data Warehousing', it: 'Data Modeling & Data Warehousing' },
    description: {
      en: 'Dimensional modeling, data warehouse design and analytics engineering.',
      it: 'Modellazione dimensionale, progettazione di data warehouse e analytics engineering.',
    },
  },
  {
    slug: 'metadata-semantic-layer',
    label: { en: 'Metadata & Semantic Layer', it: 'Metadati & Semantic Layer' },
    description: {
      en: 'Catalogs, lineage, business glossaries and shared metric definitions.',
      it: 'Cataloghi, lineage, glossari di business e definizioni condivise delle metriche.',
    },
  },
  {
    slug: 'bi-analytics',
    label: { en: 'Business Intelligence & Analytics', it: 'Business Intelligence & Analytics' },
    description: {
      en: 'Reporting, dashboards, KPIs and turning data into decisions.',
      it: 'Reportistica, dashboard, KPI e come trasformare i dati in decisioni.',
    },
  },
  {
    slug: 'ai-analytics',
    label: { en: 'AI & Analytics', it: 'AI & Analytics' },
    description: {
      en: 'How AI changes data analysis, and what data AI needs to deliver value.',
      it: 'Come l’AI cambia l’analisi dei dati, e quali dati servono perché l’AI generi valore.',
    },
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export const CATEGORY_SLUGS = CATEGORIES.map((category) => category.slug) as [CategorySlug, ...CategorySlug[]];

export function getCategory(slug: CategorySlug) {
  return CATEGORIES.find((category) => category.slug === slug)!;
}
