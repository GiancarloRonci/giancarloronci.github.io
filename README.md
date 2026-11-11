# giancarloronci.github.io

Sito personale di Giancarlo Ronci, costruito con [Astro](https://astro.build) e pubblicato su GitHub Pages.

## Comandi

| Comando           | Cosa fa                                                        |
| ----------------- | -------------------------------------------------------------- |
| `npm install`     | Installa le dipendenze (la prima volta)                        |
| `npm run dev`     | Avvia il sito in locale su http://localhost:4321, bozze incluse |
| `npm run build`   | Genera il sito statico in `dist/`                              |
| `npm run preview` | Mostra in locale la build di produzione                        |

## Lingue

Il sito è in inglese (lingua principale, indirizzi senza prefisso: `/about/`) e in italiano
(indirizzi sotto `/it/`: `/it/about/`). Il selettore EN/IT nel menu porta alla stessa pagina nell'altra lingua.

## Dove modificare i contenuti

| Cosa                                    | Inglese                        | Italiano                          |
| --------------------------------------- | ------------------------------ | --------------------------------- |
| Home (bio, aree di attività)            | `src/pages/index.astro`        | `src/pages/it/index.astro`        |
| CV: esperienze, formazione, competenze  | `src/data/cv.ts` (`en`)        | `src/data/cv.ts` (`it`)           |
| Pagina "About" / "Chi sono"             | `src/pages/about.md`           | `src/pages/it/about.md`           |
| Articoli                                | `src/content/posts/en/*.md`    | `src/content/posts/it/*.md`       |
| Menu, profilo, etichette                | `src/i18n/ui.ts` (`en`)        | `src/i18n/ui.ts` (`it`)           |

Comuni alle due lingue:

| Cosa                                    | File                                    |
| --------------------------------------- | --------------------------------------- |
| Voci del menu, contatti, link social    | `src/consts.ts`                         |
| Stili                                   | `src/styles/global.css`                 |
| Immagini e file scaricabili             | `public/assets/`                        |

Se modifichi un testo in una lingua, ricordati di aggiornare anche l'altra.

### CV

La pagina CV (`/cv/`, `/it/cv/`) e le sezioni carriera e formazione della home leggono i dati da
`src/data/cv.ts`: aggiungi o modifica lì esperienze, formazione e competenze.

Il PDF nasce dalla pagina stessa: il pulsante "Save CV as PDF" / "Salva il CV in PDF" apre la stampa del
browser, dove si sceglie "Salva come PDF". È quindi sempre allineato al sito e nella lingua della pagina.
L'impaginazione è negli stili `@media print` in fondo a `src/styles/global.css`.

### Nuovo articolo

Duplica `src/content/posts/en/esempio-articolo.md` (o la versione in `it/`) e compila l'intestazione:

```yaml
---
title: "Titolo"
description: "Sintesi di una riga"
date: 2026-10-28
tags: ["Data Governance"]
draft: false
---
```

Il nome del file diventa l'indirizzo: `src/content/posts/en/data-mesh.md` → `/posts/data-mesh/`,
`src/content/posts/it/data-mesh.md` → `/it/posts/data-mesh/`.
Con `draft: true` l'articolo si vede solo con `npm run dev`.

**Traduzioni:** per i nuovi articoli, il file inglese ha un nome in inglese e quello italiano un nome in
italiano, così ogni versione ha l'indirizzo nella sua lingua. Le due versioni si collegano con lo stesso
valore di `translationKey` nell'intestazione:

```yaml
# src/content/posts/it/catena-dati-marketing.md  →  /it/posts/catena-dati-marketing/
translationKey: "marketing-data-chain"

# src/content/posts/en/marketing-data-chain.md   →  /posts/marketing-data-chain/
translationKey: "marketing-data-chain"
```

Senza `translationKey`, due file con lo stesso nome in `en/` e `it/` sono lo stesso articolo nelle due
lingue: è il caso degli articoli pubblicati prima di questa regola, che restano così per non cambiare
indirizzi già condivisi. Il selettore EN/IT collega le due versioni. Un articolo può anche esistere in una
sola lingua: in quel caso il selettore porta all'elenco articoli dell'altra lingua.

## Pubblicazione

Ogni push su `master` avvia il workflow `.github/workflows/deploy.yml`, che esegue la build e pubblica su GitHub Pages.
