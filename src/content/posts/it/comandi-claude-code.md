---
title: "Claude Code: i 30 comandi che uso davvero"
description: "Da /init a /rewind, da claude -p ai server MCP: i comandi di Claude Code divisi per momento di lavoro, con a cosa servono e quando usarli. E i cinque da imparare per primi."
date: 2026-11-15
categories: ["data-engineering", "ai-analytics"]
cover:
  src: "/assets/images/posts/comandi-claude-code.svg"
  alt: "Una finestra di terminale con un elenco di comandi che iniziano con la barra, uno dei quali evidenziato"
tags: ["Claude Code", "AI", "Produttività", "MCP"]
translationKey: "claude-code-commands"
updated: 2026-11-15
draft: false
---

Claude Code si può usare per settimane scrivendo solo richieste in linguaggio naturale. Funziona, ma si lascia sul tavolo buona parte dello strumento. I comandi, quelli che iniziano con la barra e quelli che si lanciano dal terminale, servono a fare le cose che una richiesta non può fare: liberare il contesto, tornare indietro di tre modifiche, decidere cosa l’agente può fare senza chiedere, collegarlo ai sistemi con cui lavori.

In questo articolo ho messo in fila i trenta che considero più utili, divisi per momento di lavoro. Non è l’elenco completo: digitando `/` in una sessione compare la lista di tutti i comandi disponibili, compresi quelli aggiunti da skill e plugin. È l’elenco di quelli che vale la pena conoscere.

Se cerchi il racconto di come uso Claude Code su pipeline e data warehouse, l’ho scritto in un [articolo precedente](/it/posts/claude-code-data-engineering/). Qui l’obiettivo è più pratico: una mappa da tenere a portata di mano.

## Avviare e riprendere le sessioni

Il primo gruppo riguarda come si entra in Claude Code e come si torna a una conversazione lasciata a metà.

| # | Comando | A cosa serve |
| --- | --- | --- |
| 1 | `claude` | Avvia una sessione interattiva nella cartella corrente. È il punto di partenza di tutto. |
| 2 | `claude -p "richiesta"` | Esegue una richiesta senza interfaccia e stampa la risposta. Serve per script, pipeline di CI e comandi da concatenare con altri strumenti. |
| 3 | `claude -c` | Riprende l’ultima conversazione della cartella corrente, con tutto il suo contesto. |
| 4 | `claude -r` e `/resume` | Mostra le conversazioni passate e permette di sceglierne una da riprendere. |

Il secondo comando è quello più sottovalutato. Con `-p` Claude Code diventa un programma come un altro, che riceve un input e restituisce un output: si può chiedere di riassumere il log di un job fallito, di controllare un file prima di un commit, di generare la descrizione di una pull request. Con `--output-format json` la risposta diventa leggibile anche da un altro programma.

## Gestire il contesto

Il contesto è la memoria di lavoro della sessione: tutto quello che Claude ha letto, scritto e deciso finora. È grande, ma non infinito, e quando si riempie di cose che non servono più le risposte peggiorano. Questi comandi servono a tenerlo in ordine.

| # | Comando | A cosa serve |
| --- | --- | --- |
| 5 | `/clear` | Svuota la conversazione e riparte da zero, nella stessa cartella. Da usare ogni volta che si cambia argomento. |
| 6 | `/compact` | Riassume la conversazione fin qui e libera spazio, mantenendo l’essenziale. Si può aggiungere un’istruzione su cosa conservare: `/compact tieni le decisioni sul modello dati`. |
| 7 | `/context` | Mostra quanto contesto è occupato e da cosa: conversazione, file letti, strumenti, server MCP. |
| 8 | `/rewind` (o `Esc` due volte) | Torna a un punto precedente della sessione, ripristinando la conversazione, il codice o entrambi. |

La regola che seguo è semplice: un compito, una conversazione. Quando un compito finisce, `/clear`. Se a metà di un compito lungo il contesto si riempie, `/compact` con un’indicazione su cosa conta. E `/context` quando le risposte iniziano a perdere colpi senza un motivo evidente: spesso il motivo è lì.

`/rewind` merita una nota a parte. Claude Code salva un punto di ripristino prima di ogni modifica ai file, quindi si può provare una strada, vedere che non funziona e tornare indietro senza toccare git. Non sostituisce il controllo di versione, perché non copre i comandi lanciati nel terminale, ma rende molto più economico sperimentare.

## Dare contesto al progetto

Il secondo modo di gestire il contesto è darne di migliore fin dall’inizio. Questi comandi servono a dire a Claude cosa sapere del progetto senza ripeterlo ogni volta.

| # | Comando | A cosa serve |
| --- | --- | --- |
| 9 | `/init` | Analizza il progetto e crea un file `CLAUDE.md` con struttura, comandi e convenzioni. Claude lo legge all’inizio di ogni sessione. |
| 10 | `/memory` | Apre i file `CLAUDE.md` per modificarli: quello del progetto, condiviso con il team, e quello personale. |
| 11 | `/add-dir` | Aggiunge un’altra cartella a quelle su cui Claude può lavorare, per esempio un secondo repository collegato. |
| 12 | `@file` | Nella richiesta, `@` seguito da un percorso inserisce quel file o quella cartella nel contesto. |

`/init` è il primo comando da lanciare in un progetto nuovo, e il file che produce è il primo da correggere. La versione generata descrive bene la struttura, ma non può sapere le cose che non sono scritte da nessuna parte: quale tabella non va mai interrogata senza filtro, quale test è lento, quale cartella è codice morto. Quelle vanno aggiunte a mano, ed è lì che il file inizia a valere qualcosa.

## Controllare cosa fa l’agente

Questo gruppo decide quanto Claude può fare da solo e con quale modello.

| # | Comando | A cosa serve |
| --- | --- | --- |
| 13 | `Shift+Tab` | Passa da una modalità di permesso all’altra: chiedere conferma, accettare le modifiche, plan mode. |
| 14 | `/permissions` | Mostra e modifica le regole su cosa è consentito, cosa va chiesto e cosa è vietato. |
| 15 | `/model` | Cambia modello durante la sessione. |
| 16 | `/config` | Apre le impostazioni: tema, notifiche, comportamento dell’interfaccia. |
| 17 | `!comando` | Esegue un comando nel terminale direttamente, senza passare da Claude, e ne mette l’output nella conversazione. |

La **plan mode**, a cui si arriva con `Shift+Tab`, è il comando che ha cambiato di più il mio modo di lavorare. In questa modalità Claude legge, esplora e propone un piano, ma non modifica nulla. Si discute il piano, lo si corregge, e solo dopo si passa all’esecuzione. Per qualunque compito che tocchi più di due file, vale i due minuti in più.

`/permissions` è il complemento. Le regole si scrivono una volta e si versionano nel progetto: i comandi di test sempre consentiti, i comandi che toccano la produzione sempre vietati. Le regole di divieto valgono in ogni modalità, anche nelle più permissive, ed è per questo che sono il posto giusto per i limiti che non si devono superare.

Il punto esclamativo, infine, è una scorciatoia piccola ma comoda: `!git status` o `!dbt ls` mostrano il risultato a te e a Claude insieme, senza aspettare che sia lui a decidere di lanciarli.

## Estendere Claude Code

Claude Code da solo legge file e lancia comandi. Questo gruppo serve a collegarlo ad altri sistemi e a insegnargli il modo di lavorare del team.

| # | Comando | A cosa serve |
| --- | --- | --- |
| 18 | `claude mcp add` | Aggiunge un server MCP dal terminale, per collegare Claude a un database, a un servizio o a uno strumento. |
| 19 | `/mcp` | Mostra i server MCP collegati, il loro stato e i loro strumenti, e gestisce le autenticazioni. |
| 20 | `/agents` | Crea e gestisce i subagenti: assistenti specializzati con istruzioni e strumenti propri, che lavorano su un compito isolato. |
| 21 | `/hooks` | Configura gli hook, script che Claude Code esegue in momenti precisi, per esempio prima di ogni comando, e che possono bloccarlo. |
| 22 | `/plugin` | Installa e gestisce plugin e marketplace: pacchetti che mettono insieme skill, agenti, hook e server MCP. |
| 23 | `/nome-skill` | Invoca una skill del progetto o di un plugin. Le skill stanno in `.claude/skills/` e si versionano con il codice. |

Le **skill** sono probabilmente lo strumento più utile per un team. Ogni procedura che oggi sta in una pagina wiki, come si aggiunge un modello, come si fa un rilascio, come si scrive un test, può diventare una skill che Claude carica da solo quando la richiesta corrisponde, o che si invoca a mano con il suo nome. Il vantaggio rispetto alla wiki è che la skill viene usata.

I server MCP sono il complemento: le skill dicono come lavorare, i server MCP danno accesso ai sistemi su cui lavorare. Nell’[articolo sul data engineering](/it/posts/claude-code-data-engineering/) ho descritto come collegarli a dbt e al data warehouse in sola lettura.

## Rivedere e automatizzare

Quattro comandi per due esigenze diverse: controllare il lavoro fatto e farlo ripetere senza esserci.

| # | Comando | A cosa serve |
| --- | --- | --- |
| 24 | `/code-review` | Rivede le modifiche correnti, o una pull request, cercando errori di logica e casi non gestiti. |
| 25 | `/security-review` | Rivede le modifiche del ramo corrente dal punto di vista della sicurezza. |
| 26 | `/loop` | Ripete un’istruzione a intervalli regolari dentro la sessione, per esempio per controllare lo stato di una build. |
| 27 | `/schedule` | Crea agenti che girano nel cloud secondo un calendario, anche quando il computer è spento. |

Una revisione fatta da Claude non sostituisce quella di un collega, ma arriva prima e costa meno. La uso come primo filtro: prima di aprire una pull request, `/code-review` sulle mie modifiche. Quello che trova lo correggo subito, e il collega può concentrarsi sulle scelte di progetto invece che sui casi limite dimenticati.

`/loop` e `/schedule` coprono i compiti ricorrenti. Il primo vive nella sessione e finisce con lei; il secondo vive nel cloud e va avanti da solo. Un uso ragionevole del secondo: ogni mattina, controllare i test falliti della notte e preparare una proposta di correzione che una persona rivede.

## Manutenzione

Gli ultimi tre servono quando qualcosa non torna.

| # | Comando | A cosa serve |
| --- | --- | --- |
| 28 | `/usage` | Mostra quanto si è consumato rispetto ai limiti del proprio piano. |
| 29 | `/doctor` | Controlla l’installazione e la configurazione e segnala i problemi. |
| 30 | `/help` | Elenca i comandi disponibili nella sessione, compresi quelli di skill e plugin. |

`/doctor` è il primo comando da lanciare quando Claude Code si comporta in modo strano dopo un aggiornamento, o quando un server MCP non si collega. `/help`, invece, è il modo più veloce di scoprire cosa è cambiato: i comandi di Claude Code evolvono spesso, e un elenco come questo invecchia prima di quanto si pensi.

## I cinque da imparare per primi

Trenta comandi sono troppi da imparare in una volta. Se dovessi sceglierne cinque per chi inizia, sarebbero questi.

1. **`/init`**, il primo giorno, seguito da dieci minuti a correggere il `CLAUDE.md` che produce.
2. **`Shift+Tab` per la plan mode**, prima di ogni compito che tocca più di un paio di file.
3. **`/clear`**, ogni volta che si cambia argomento.
4. **`Esc` due volte**, per tornare indietro quando una strada si rivela sbagliata.
5. **`claude -c`**, per riprendere il lavoro del giorno prima senza rispiegare tutto.

Gli altri arrivano da soli, quando serve. Il segnale per impararne uno nuovo è sempre lo stesso: accorgersi di aver ripetuto la stessa spiegazione a Claude per la terza volta. Quasi sempre esiste un comando, una skill o una riga nel `CLAUDE.md` che la rende inutile.

## Per approfondire

La documentazione ufficiale, in inglese, è il riferimento più aggiornato.

- [Slash commands](https://code.claude.com/docs/en/slash-commands) (Anthropic): l’elenco completo dei comandi con la barra disponibili nella sessione
- [CLI reference](https://code.claude.com/docs/en/cli-reference) (Anthropic): i comandi e le opzioni da terminale, compresi `-p`, `-c` e `-r`
- [Interactive mode](https://code.claude.com/docs/en/interactive-mode) (Anthropic): scorciatoie da tastiera, `!`, `@` e le altre funzioni della sessione interattiva
- [Checkpointing](https://code.claude.com/docs/en/checkpointing) (Anthropic): come funzionano i punti di ripristino usati da `/rewind`
- [Skills](https://code.claude.com/docs/en/skills), [MCP](https://code.claude.com/docs/en/mcp) e [Hooks](https://code.claude.com/docs/en/hooks) (Anthropic): la documentazione delle estensioni descritte nell’articolo
