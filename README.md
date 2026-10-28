# giancarloronci.github.io

Sito personale di Giancarlo Ronci, costruito con [Astro](https://astro.build) e pubblicato su GitHub Pages.

## Comandi

| Comando           | Cosa fa                                                        |
| ----------------- | -------------------------------------------------------------- |
| `npm install`     | Installa le dipendenze (la prima volta)                        |
| `npm run dev`     | Avvia il sito in locale su http://localhost:4321, bozze incluse |
| `npm run build`   | Genera il sito statico in `dist/`                              |
| `npm run preview` | Mostra in locale la build di produzione                        |

## Dove modificare i contenuti

| Cosa                                    | File                                    |
| --------------------------------------- | --------------------------------------- |
| Home (bio, carriera, formazione)        | `src/pages/index.astro`                 |
| Pagina "Chi sono"                       | `src/pages/about.md`                    |
| Articoli                                | `src/content/posts/*.md`                |
| Menu, contatti, dati dell'autore        | `src/consts.ts`                         |
| Stili                                   | `src/styles/global.css`                 |
| Immagini e file scaricabili (es. CV)    | `public/assets/`                        |

### Nuovo articolo

Duplica `src/content/posts/esempio-articolo.md` e compila l'intestazione:

```yaml
---
title: "Titolo"
description: "Sintesi di una riga"
date: 2026-10-28
tags: ["Data Governance"]
draft: false
---
```

Il nome del file diventa l'indirizzo: `src/content/posts/data-mesh.md` → `/posts/data-mesh/`.
Con `draft: true` l'articolo si vede solo con `npm run dev`.

## Pubblicazione

Ogni push su `master` avvia il workflow `.github/workflows/deploy.yml`, che esegue la build e pubblica su GitHub Pages.
