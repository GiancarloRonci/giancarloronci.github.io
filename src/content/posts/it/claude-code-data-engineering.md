---
title: "Claude Code nel data engineering: cosa è cambiato nel 2026, e cosa resta compito tuo"
description: "Skill, server MCP, agenti in background, auto mode, hook: nel 2026 Claude Code è diventato uno strumento con cui si può lavorare davvero su pipeline, modelli dbt e data warehouse. Cosa è cambiato, come usarlo con i dati di produzione e dove servono ancora le decisioni di una persona."
date: 2026-11-10
categories: ["data-engineering", "ai-analytics"]
cover:
  src: "/assets/images/posts/claude-code-data-engineering.svg"
  alt: "Una finestra di terminale collegata a una catena di modelli dati e a un data warehouse, con uno scudo che protegge il collegamento verso il database"
tags: ["Claude Code", "AI", "dbt", "MCP", "Amazon Redshift", "Data Engineering"]
updated: 2026-11-10
draft: false
---

Un anno fa, chiedere a un assistente AI di aggiungere un modello a un progetto dbt voleva dire fare da intermediario. Gli incollavi lo schema della tabella sorgente, gli spiegavi le convenzioni di nomenclatura, gli ricordavi che i modelli di staging si chiamano `stg_` e che ogni chiave primaria deve avere un test di unicità. Lui scriveva una query plausibile. Tu la copiavi, la lanciavi, scoprivi che una colonna si chiamava in un altro modo, tornavi indietro e ricominciavi.

Il codice SQL, in questo giro, era la parte facile. Il lavoro vero era trasferire contesto: com’è fatto il warehouse, quali regole segue il team, cosa è già stato costruito a monte e cosa si rompe a valle.

Nel 2026 Claude Code è cambiato soprattutto su questo punto. Non scrive SQL molto migliore di prima, ma può leggere da solo i metadati del progetto, interrogare il warehouse, seguire le convenzioni del team scritte in un file, lanciare una build e aspettarne l’esito mentre fa altro. Ed è cambiato il modo in cui si decide cosa gli è permesso fare senza chiedere.

In questo articolo metto in fila le novità che contano per chi lavora con pipeline, modelli e data warehouse, con un occhio a una domanda che ogni data engineer si fa presto: come lo lascio lavorare vicino ai dati di produzione senza rischiare di rompere qualcosa?

## Il collo di bottiglia non era l’SQL

Il caso più concreto pubblicato finora viene da DocuSign, raccontato da dbt Labs a fine ottobre. Il team di analytics engineering ha osservato che il tempo non se ne andava nello scrivere le query, ma nel continuo passaggio di contesto: il requisito in un ticket, le convenzioni del progetto “per lo più nella testa delle persone”, la validazione ripetuta a ogni modifica.

La soluzione che hanno costruito divide i compiti in modo netto. Claude Code coordina il lavoro. Un insieme di **skill** porta le convenzioni del progetto. Il **server MCP di dbt** fornisce metadati e lineage. Il motore dbt valida l’SQL compilato prima che venga aperta una pull request. Il flusso è diviso in fasi, scoperta, sviluppo, orchestrazione, in modo che una fase fallita si possa ripetere da sola senza ripartire da capo.

Il risultato dichiarato è un aumento di produttività del 50%, dal requisito a un modello validato e pronto per la revisione. È un dato del pilota riportato dal team stesso, non una misura indipendente, e va preso così. Ma la struttura della soluzione è interessante a prescindere dal numero, perché corrisponde quasi pezzo per pezzo alle novità di Claude Code di quest’anno.

## Il contesto: skill e plugin

Una **skill** è una cartella con un file `SKILL.md`: un’intestazione con nome e descrizione, e sotto le istruzioni in Markdown. Claude la carica quando la richiesta corrisponde alla descrizione, oppure la si invoca a mano con `/nome-della-skill`. Le skill di progetto stanno in `.claude/skills/` e si versionano nel repository insieme al codice, quindi tutto il team lavora con le stesse regole.

Per un team dati è il posto naturale dove scrivere ciò che oggi sta in una pagina wiki che nessuno apre: come si chiamano i modelli a ogni livello, quali test sono obbligatori, come si documenta una colonna, quali tabelle non vanno mai interrogate senza filtro sulla data. Una skill che si attiva da sola quando qualcuno chiede “aggiungi un modello per gli ordini rimborsati” vale più di qualunque linea guida.

Non serve partire da zero. dbt Labs mantiene una raccolta pubblica di skill per dbt, che copre l’analytics engineering, i test unitari, la documentazione, il semantic layer, la diagnosi dei job falliti e la migrazione al nuovo motore. Si installa come plugin:

```text
/plugin marketplace add dbt-labs/dbt-agent-skills
/plugin install dbt@dbt-agent-marketplace
```

Un **plugin** è proprio questo: un pacchetto che mette insieme skill, hook, agenti e server MCP in un’unica installazione. È il modo più semplice per distribuire a tutto il team lo stesso modo di lavorare. Da settembre c’è anche un comando, `claude plugin eval`, per verificare su casi di prova se un plugin migliora davvero le risposte rispetto a lavorare senza, e `/skill-doctor`, che mostra quanto contesto consuma ogni skill e quanto viene usata.

## I sistemi: server MCP per dbt e per il warehouse

Le skill dicono a Claude come lavorare. I **server MCP** gli danno accesso ai sistemi su cui lavorare.

MCP, Model Context Protocol, è uno standard aperto per collegare un assistente AI a sistemi esterni. Un server MCP è un piccolo programma che si mette tra l’assistente e un sistema e gli offre un elenco di strumenti, ognuno con un nome, una descrizione e dei parametri: “cerca un modello”, “esegui questa query”, “mostrami il lineage”. L’assistente non deve conoscere le API del sistema: vede gli strumenti, sceglie quello che serve e riceve una risposta strutturata. Lo stesso server funziona con Claude Code e con gli altri strumenti che supportano il protocollo.

Il **server MCP di dbt** è quello che dbt Labs pubblica per i progetti dbt. Funziona con dbt Core, con il motore Fusion e con dbt Platform, e dà a Claude accesso diretto a ciò che dbt sa del progetto. Gli strumenti sono raggruppati per tipo:

- **ricerca e lineage**: trovare un modello, leggerne colonne, descrizioni e test, vedere da cosa dipende e cosa dipende da lui, controllarne lo stato;
- **semantic layer**: elencare le metriche definite e interrogarle, così il numero arriva dalla definizione ufficiale invece che da una query riscritta ogni volta;
- **SQL**: eseguire query sul warehouse e tradurre una domanda in SQL;
- **comandi dbt**: `build`, `run`, `test`, `compile`, `show`, cioè gli stessi comandi che lanceresti dal terminale;
- **generazione di codice**: creare lo YAML di un modello, la definizione di una sorgente, un modello di staging;
- **Admin API** di dbt Platform: elencare i job, avviarne uno, leggere l’errore di un’esecuzione fallita.

La differenza si vede su una domanda come “posso rinominare la colonna `customer_id` in `stg_orders`?”. Senza il server, Claude deve cercare nei file del progetto, leggere decine di modelli SQL e ricostruire le dipendenze a mano, con il rischio di perderne qualcuna. Con il server, chiede a dbt il lineage e riceve l’elenco dei modelli a valle. Allo stesso modo, per un job fallito di notte, invece di farsi incollare il log, legge direttamente l’errore dell’esecuzione.

Il README avverte che i comandi della CLI possono modificare modelli, sorgenti e oggetti nel warehouse: vanno abilitati sapendo cosa si sta concedendo. Un `build` lanciato dall’agente è un `build` vero.

Per il warehouse, AWS pubblica un server MCP per Amazon Redshift. Il dettaglio che conta di più è il comportamento predefinito: il server parte in sola lettura, e qualunque valore diverso da `read-write`, compreso un errore di battitura, lo lascia in sola lettura. Anche in modalità scrittura, chiede conferma prima di ogni istruzione che può modificare dati. E il README lo dice chiaramente: il vero confine di sicurezza sono i privilegi dell’utente di database, non il server.

La configurazione si può condividere con il team in un file `.mcp.json` alla radice del progetto:

```json
{
  "mcpServers": {
    "redshift": {
      "command": "uvx",
      "args": ["awslabs.redshift-mcp-server@latest"],
      "env": {
        "AWS_PROFILE": "analytics-readonly",
        "AWS_DEFAULT_REGION": "eu-west-1",
        "ACCESS_MODE": "read-only"
      }
    }
  }
}
```

Scrivere `ACCESS_MODE` anche se è già il valore predefinito non è ridondante: rende la scelta visibile a chi legge il file. E il profilo AWS deve puntare a un utente con soli permessi di lettura, sugli schemi che servono e non su tutto il cluster. Quando qualcuno apre il progetto in una sessione interattiva, Claude Code chiede conferma prima di attivare i server definiti in `.mcp.json`.

Due novità rendono più pratico collegare molti server. La prima è la **ricerca degli strumenti**, attiva di default: all’inizio della sessione vengono caricati solo i nomi degli strumenti, e le definizioni complete solo quando servono. Si possono quindi collegare dbt, il warehouse, l’orchestratore e il catalogo senza riempire il contesto di descrizioni inutilizzate. La seconda, del 6 novembre, è il supporto ai **task MCP**: quando un server esegue una chiamata come attività lunga, Claude Code la sposta subito in background e riprende il risultato quando arriva. Per una query pesante o una build che dura venti minuti è esattamente il comportamento che serve.

## I lavori lunghi: agenti in background, Monitor, routine

Il lavoro di un data engineer è pieno di attese. Una build completa, un backfill di sei mesi, un job che gira sull’orchestratore. Fino a poco tempo fa, l’assistente aspettava con te.

Da luglio i **subagenti** girano in background per impostazione predefinita: Claude continua a lavorare mentre un agente separato fa un compito isolato, e ne raccoglie il risultato quando finisce. Un uso tipico è chiedere a un subagente di analizzare il lineage a valle di una tabella che stai per modificare, mentre la sessione principale prepara la modifica. Il contesto della sessione principale resta pulito, perché arriva solo la conclusione.

Ad aprile è arrivato lo strumento **Monitor**, che avvia un processo di osservazione in background e porta i suoi eventi nella conversazione. Si può usare per seguire il log di una build dbt o di un job Spark e reagire al primo errore, invece di aspettare la fine o controllare a mano ogni pochi minuti.

Per i compiti ricorrenti ci sono `/loop`, che ripete un’istruzione a intervalli dentro una sessione, e le **routine** di Claude Code sul web, che avviano agenti nel cloud secondo un calendario, su un evento GitHub o con una chiamata API. Un esempio ragionevole: ogni mattina, controllare i test falliti della notte, leggere i log, e aprire una pull request con la correzione proposta, che una persona rivede prima di fare il merge.

## La sicurezza: auto mode, regole e hook

Qui sta la domanda vera. Un agente che può lanciare comandi e interrogare il warehouse è utile proprio perché agisce. Ed è rischioso per lo stesso motivo.

Da agosto la modalità di partenza delle sessioni interattive è **auto mode**. Invece di chiedere conferma per ogni comando, un modello separato valuta le azioni prima che vengano eseguite e blocca quelle che vanno oltre la richiesta, che toccano infrastrutture non riconosciute o che sembrano guidate da contenuti ostili letti durante il lavoro. Per impostazione predefinita sono bloccati, tra gli altri, deploy e migrazioni in produzione e l’invio di dati sensibili verso l’esterno. La documentazione è onesta sul limite: auto mode riduce le richieste di conferma, ma non garantisce la sicurezza.

Per questo conviene costruire le difese a strati, dal più solido al più debole.

1. **I permessi dei sistemi.** L’utente di database in sola lettura, il profilo cloud con il minimo indispensabile, nessuna credenziale di produzione sulla macchina se non serve. È l’unico strato che nessun errore dell’agente può aggirare.
2. **Le regole di permesso di Claude Code.** Le regole `deny` valgono in ogni modalità, anche nelle più permissive. Da novembre, l’impostazione `permissions.denyInsteadOfPrompting` rifiuta direttamente le chiamate che altrimenti resterebbero in attesa di una conferma, utile per sessioni che girano senza nessuno davanti.
3. **Gli hook.** Un hook `PreToolUse` è uno script che Claude Code esegue prima di ogni chiamata a uno strumento e che può bloccarla. La documentazione ne mostra uno che legge il comando o la query in arrivo e rifiuta `DROP TABLE`, `TRUNCATE TABLE` e `rm -rf`. Avverte anche che un controllo basato su espressioni regolari si può aggirare: è un parapetto, non un confine di sicurezza.
4. **La sandbox.** Da agosto, su Linux e WSL2, la sandbox può mascherare i file di credenziali: i comandi vedono una copia fittizia e il valore vero viene sostituito solo all’uscita verso i servizi autorizzati.

L’ordine conta. Un hook ben scritto non compensa un utente di database con privilegi di amministratore. Prima si restringe ciò che il sistema permette, poi si aggiungono i controlli dell’agente.

## Il lavoro di squadra: sessioni che si parlano

Due novità di agosto riguardano chi lavora in gruppo. Le sessioni di Claude Code possono **scambiarsi messaggi**: l’esempio della documentazione è quasi un caso di data engineering, una sessione che avvisa un’altra che la colonna `users.name` è diventata `users.display_name`. Chi lavora sul modello a monte può informare chi lavora sulla dashboard a valle senza passare da una chat.

Per i team che non possono far uscire codice e dati dalla propria rete, sono arrivati gli **ambienti self-hosted**, in beta pubblica sui piani Team ed Enterprise: le sessioni avviate da Claude Code sul web girano su macchine dell’azienda, dentro la sua rete, accanto al warehouse.

## Cosa non cambia

Con tutte queste novità, è facile pensare che il lavoro del data engineer si sposti verso la supervisione di agenti. In parte è vero. Ma le parti più difficili del mestiere restano dove erano.

**Le definizioni restano una decisione.** Claude Code può scrivere in pochi secondi il modello del fatturato trimestrale. Non può decidere se il fatturato include i resi. Se nessuno l’ha deciso, l’agente ne sceglierà una versione plausibile, e la scriverà con la stessa sicurezza con cui scrive tutto il resto. È lo stesso problema di cui ho scritto parlando di [data governance](/it/posts/data-governance-chi-decide/): un agente rende più veloce produrre numeri, quindi rende più costoso non sapere chi decide quale numero vale.

**La modellazione resta un progetto.** Un agente segue bene le convenzioni che trova. Se il progetto ha tre modi diversi di calcolare i clienti attivi, li seguirà tutti e tre. Le skill funzionano quando codificano decisioni già prese, non quando sostituiscono quelle mancanti.

**La revisione resta umana.** Nel caso DocuSign la regola era chiara: l’AI propone, gli ingegneri restano responsabili di ciò che entra nel codice. Il ramo isolato, la pull request e la revisione non sono una formalità da saltare quando l’agente diventa bravo. Sono il punto in cui una persona si assume la responsabilità del cambiamento.

**Il costo resta da controllare.** Il team di DocuSign limitava i test a mille righe, perché un agente non lanciasse per errore una build su un miliardo. Un agente che prova, sbaglia e riprova può consumare molte risorse del warehouse senza che nessuno se ne accorga, finché arriva la fattura.

## Un esercizio per cominciare

Se vuoi provare Claude Code su un progetto dati reale, c’è un percorso che richiede un pomeriggio e non tocca nulla di importante.

Prima scrivi una skill di progetto con le tre regole del tuo team che vengono violate più spesso nelle pull request. Non tutte le convenzioni: solo quelle tre. Poi collega un server MCP al warehouse, in sola lettura, con un utente che vede solo uno schema di sviluppo. Infine chiedi a Claude Code un compito piccolo ma completo: aggiungere un modello, con test e documentazione, e aprire una pull request.

Poi guarda la pull request come guarderesti quella di un collega appena arrivato. Ha seguito le tre regole? Ha fatto domande sulle definizioni o ha deciso da solo? Quante query ha lanciato sul warehouse per arrivarci?

Le risposte dicono più di qualunque benchmark su quanto il tuo progetto sia pronto per lavorare con un agente. E quasi sempre indicano che il primo lavoro da fare non riguarda l’AI, ma le regole e le definizioni che finora erano rimaste nella testa delle persone.

## Fonti

Pagine usate per scrivere e verificare l’articolo (in inglese).

- [Claude Code: What’s new](https://code.claude.com/docs/en/whats-new) e [changelog](https://code.claude.com/docs/en/changelog) (Anthropic): l’elenco settimanale delle novità e le note di rilascio, incluse quelle di novembre su task MCP e `denyInsteadOfPrompting`
- [Week 15](https://code.claude.com/docs/en/whats-new/2026-w15), [Week 27](https://code.claude.com/docs/en/whats-new/2026-w27) e [Week 32](https://code.claude.com/docs/en/whats-new/2026-w32) (Anthropic): lo strumento Monitor, i subagenti in background, auto mode come modalità predefinita, i messaggi tra sessioni, gli ambienti self-hosted e il mascheramento delle credenziali
- [Skills](https://code.claude.com/docs/en/skills), [MCP](https://code.claude.com/docs/en/mcp), [Hooks](https://code.claude.com/docs/en/hooks) e [Permission modes](https://code.claude.com/docs/en/permission-modes) (Anthropic): la documentazione di riferimento delle funzionalità descritte
- [How DocuSign cut analytics engineering time in half](https://www.getdbt.com/blog/docusign-claude-code-dbt-v2-mcp-agent-skills) (dbt Labs): il caso DocuSign con Claude Code, skill e server MCP di dbt
- [dbt-mcp](https://github.com/dbt-labs/dbt-mcp) e [dbt-agent-skills](https://github.com/dbt-labs/dbt-agent-skills) (dbt Labs): il server MCP e la raccolta di skill per dbt
- [Amazon Redshift MCP Server](https://github.com/awslabs/mcp/tree/main/src/redshift-mcp-server) (AWS Labs): il server MCP per Redshift, con la modalità in sola lettura predefinita
