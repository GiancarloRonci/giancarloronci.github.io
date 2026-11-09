---
title: "La data governance non è un comitato: è sapere chi decide"
description: "Molti programmi di data governance producono policy, cataloghi e riunioni, ma lasciano aperta la domanda che conta: quando due numeri non tornano, chi ha l’autorità per decidere quale è giusto?"
date: 2026-11-09
categories: ["data-governance", "data-strategy"]
cover:
  src: "/assets/images/posts/data-governance-chi-decide.svg"
  alt: "Più linee confuse che arrivano da reparti diversi convergono su un unico dato, sopra cui una sola persona con un bollino di approvazione decide, e ne esce una linea ordinata"
tags: ["Data Governance", "Data Ownership", "Data Strategy", "Data Quality"]
updated: 2026-11-09
draft: false
---

Il programma di data governance parte con tutti i crismi. C’è uno sponsor nel comitato di direzione, un comitato guida che si riunisce ogni mese, un documento di policy di quaranta pagine. Viene acquistato uno strumento di catalogo dati e il team dati passa mesi a documentare tabelle e colonne.

Diciotto mesi dopo, il catalogo contiene migliaia di oggetti descritti, i verbali del comitato riempiono una cartella condivisa e la policy è stata approvata. Poi, in una riunione di budget, la direzione commerciale presenta un fatturato del trimestre e l’amministrazione ne presenta un altro. La differenza è di qualche punto percentuale, abbastanza per cambiare la discussione.

Qualcuno chiede quale sia quello giusto. Silenzio. Il team dati sa spiegare da dove viene ciascun numero, ma non ha l’autorità per dire quale vale. Il comitato si riunirà tra tre settimane. E nella policy di quaranta pagine non c’è scritto chi decide cosa si intende per fatturato.

Il programma ha prodotto molto lavoro. Non ha prodotto l’unica cosa che serviva in quel momento: una persona che potesse decidere.

## Perché tanti programmi si arenano

I programmi di governance che si arenano tendono ad assomigliarsi. Non perché siano fatti male, ma perché partono dal posto sbagliato.

**Partono dal framework, non dal problema.** Si adotta un modello di riferimento completo, con tutte le sue aree, e si cerca di coprirle tutte. Il risultato è un lavoro ampio e uniforme, in cui la tabella che nessuno usa riceve la stessa attenzione del dato su cui si chiude il bilancio.

**Confondono la governance con la documentazione.** Descrivere i dati è utile, ma descrivere non è decidere. Un catalogo può dire che la colonna `revenue` contiene il fatturato; non può dire se il fatturato debba includere i resi, né chi abbia l’ultima parola su questo.

**Affidano la governance al team dati.** È la scelta più naturale e la più fragile. Il team dati conosce le tabelle, ma le definizioni appartengono al business: cosa sia un cliente attivo, quando un ordine sia da considerare chiuso, quale margine sia quello ufficiale. Se a decidere è il team dati, le decisioni vengono contestate al primo numero scomodo. Se il team dati non decide, non decide nessuno.

**Nominano responsabili solo sulla carta.** Si compila una tabella con un nome per ogni area di dati, spesso un dirigente, che non ha né il tempo né le informazioni per esercitare quel ruolo. Il nome c’è, la responsabilità no.

## Governance vuol dire diritti di decisione

Le definizioni ufficiali di data governance, a partire da quella del DAMA-DMBOK, mettono al centro l’esercizio di autorità e controllo sulla gestione dei dati. Detto in modo più semplice: la governance stabilisce chi può decidere cosa, su quali dati, e come si risolvono i disaccordi.

Tutto il resto, cataloghi, policy, comitati, strumenti, è al servizio di questo. Se le decisioni non hanno un titolare, il resto produce ordine apparente, ma non risolve il problema del fatturato nella riunione di budget.

In pratica, le decisioni che contano sono poche, e si possono raggruppare in quattro famiglie.

1. **Definizione.** Cosa significa un dato o una metrica: cosa include, cosa esclude, a quale data si riferisce. È la decisione più frequente e quella che genera più conflitti, come nel caso del [“cliente attivo”](/it/posts/ai-active-customer/).
2. **Qualità.** Quale livello di qualità è accettabile per un certo uso, e cosa succede quando non viene rispettato: si blocca il report, si pubblica con un avviso, si procede comunque.
3. **Accesso.** Chi può vedere quali dati, a quale livello di dettaglio, e chi approva le eccezioni.
4. **Cambiamento.** Chi approva una modifica che cambia il significato di un dato o rompe qualcosa a valle, e con quanto preavviso va comunicata.

Per ognuna di queste famiglie, sui dati che contano, deve esistere una risposta alla domanda “chi decide?”. Non “chi se ne occupa”, ma chi ha l’ultima parola.

## Tre ruoli, detti in modo semplice

La letteratura sulla governance usa molti nomi per i ruoli. Ne bastano tre, a patto di essere chiari su cosa fa ciascuno.

- **Il responsabile del dato** (data owner). Una persona di business che risponde del significato e dell’uso di un insieme di dati: per esempio, il responsabile dell’amministrazione per il fatturato. Prende le decisioni di definizione, accetta o meno le soglie di qualità, approva gli accessi sensibili. Non deve conoscere le tabelle; deve conoscere il processo e avere l’autorità per decidere.
- **Il referente operativo** (data steward). Chi conosce quel dato nel lavoro di tutti i giorni: sa dove nasce, quali eccezioni ci sono, perché un numero a volte non torna. Tiene aggiornate le definizioni, raccoglie le domande, prepara le decisioni per il responsabile. Spesso è la figura più importante e la meno riconosciuta.
- **Il custode tecnico** (data custodian). Il team che gestisce le piattaforme e le pipeline e che traduce le decisioni in pratica: implementa i controlli di qualità, configura gli accessi, applica le modifiche.

L’errore più comune è sovrapporre il primo e il terzo ruolo, cioè rendere il team dati responsabile di decisioni che spettano al business. Il secondo errore è nominare come responsabile qualcuno troppo in alto, che delega tutto senza delegare l’autorità. Un buon responsabile è abbastanza vicino al processo da capire la domanda e abbastanza in alto da far valere la risposta.

## Partire piccoli, ma da qualcosa che fa male

Invece di coprire tutti i dati, conviene partire da pochi elementi critici: dieci, venti al massimo. Il criterio di scelta non è l’importanza teorica, ma il dolore concreto. Buoni candidati sono i numeri che in riunione vengono contestati, quelli che finiscono in un report regolamentare o al consiglio di amministrazione, quelli su cui si calcolano incentivi e quelli che un assistente AI dovrà usare per rispondere alle domande del business.

Per ciascuno di questi elementi bastano poche informazioni:

- **la definizione**, scritta in modo che la capisca chi non lavora nei dati;
- **il responsabile** e il referente operativo, con nome e cognome;
- **la fonte ufficiale**, cioè la tabella o la metrica da cui il numero va preso;
- **le regole di qualità** minime, e cosa succede se non vengono rispettate;
- **chi può accedervi** e con quale dettaglio.

Accanto a questo elenco serve un registro delle decisioni: una pagina semplice in cui annotare, per ogni decisione presa, cosa si è deciso, chi l’ha deciso, quando e perché. Per esempio: “Il fatturato del trimestre si calcola al netto dei resi registrati entro la chiusura. Deciso dal responsabile amministrazione il 15 marzo, su proposta del referente operativo, per allineare il dato a quello di bilancio.” Una riga così chiude una discussione che altrimenti si riaprirebbe a ogni trimestre.

Venti elementi ben governati valgono più di diecimila tabelle documentate. E soprattutto sono un risultato visibile in poche settimane, che rende più facile estendere il lavoro.

## Come si risolve un disaccordo

Prima o poi due responsabili vorranno definizioni diverse per lo stesso dato. Le vendite contano un ordine quando viene firmato, l’amministrazione quando viene fatturato. Entrambe hanno ragione, per i propri scopi.

Qui la governance deve dare due risposte. La prima è che, quando le esigenze sono legittimamente diverse, si possono avere due metriche con due nomi diversi, per esempio “ordinato” e “fatturato”, ciascuna con la sua definizione e il suo responsabile. Il problema non è avere due numeri, ma avere due numeri con lo stesso nome.

La seconda è che, quando serve un solo numero ufficiale, deve esistere un percorso chiaro per arrivarci: chi prepara le opzioni, chi decide, entro quanto tempo. È qui che un comitato di governance ha davvero senso. Non come riunione periodica in cui si presenta lo stato di avanzamento, ma come luogo in cui si risolvono i disaccordi che i responsabili non riescono a risolvere da soli. Se il comitato non ha disaccordi da risolvere, può anche non riunirsi.

## Le decisioni devono finire nei sistemi

Una decisione che resta in un documento viene dimenticata alla prima riorganizzazione. Una decisione che finisce nei sistemi continua a valere anche quando nessuno se la ricorda.

Per questo la governance funziona meglio quando le sue decisioni vengono tradotte in qualcosa che i sistemi applicano da soli:

- **le definizioni** diventano metriche in un semantic layer, calcolate in un solo punto e riusate da tutti gli strumenti;
- **le regole di qualità** diventano test nelle pipeline, che fermano o segnalano un dato prima che arrivi a un report;
- **le regole di accesso** diventano policy configurate sulla piattaforma, non eccezioni concesse a mano;
- **le regole di cambiamento** diventano contratti sui dati tra chi li produce e chi li usa, verificati automaticamente a ogni rilascio.

È lo stesso principio che il data mesh chiama governance federata e automatizzata: le regole si decidono insieme, ma vengono applicate dalla piattaforma, non da una persona che controlla. Non serve adottare il data mesh per sfruttare l’idea. Basta chiedersi, per ogni decisione presa, dove verrà applicata.

## Come capire se funziona

Misurare la governance contando i documenti prodotti o le tabelle catalogate dice poco. Alcuni indicatori più utili:

- **quanto tempo serve per risolvere un disaccordo** su una definizione, dalla prima segnalazione alla decisione registrata;
- **quanti elementi critici hanno un responsabile attivo**, cioè qualcuno che ha preso almeno una decisione negli ultimi mesi;
- **quante versioni esistono delle metriche principali** nei report in uso;
- **quanti problemi di qualità vengono intercettati** dai controlli prima che li scopra un utente.

Se il tempo per risolvere un disaccordo scende da mesi a giorni, la governance sta funzionando, qualunque sia lo stato del catalogo.

## Un esercizio per cominciare

C’è una prova che richiede un’ora. Scegli i tre numeri più discussi nella tua azienda: quelli che in riunione generano più domande del tipo “ma questo da dove viene?”. Per ciascuno, rispondi a una sola domanda: se domani due reparti presentassero due valori diversi, chi deciderebbe quale è giusto?

Se per tutti e tre sai indicare un nome, e quella persona sa di esserlo, hai già una base solida. Se la risposta è “il team dati”, “dipende” o “il comitato”, hai trovato da dove cominciare. Non serve un programma: servono tre nomi, tre definizioni scritte e un posto dove registrare le decisioni.

La governance dei dati non si misura da quante regole ha scritto, ma da quanto velocemente si arriva a una risposta quando i numeri non tornano.

## Per approfondire

Letture utili sui temi dell’articolo (in inglese).

- [DAMA Data Management Body of Knowledge](https://www.dama.org/cpages/body-of-knowledge) (DAMA International): il riferimento più diffuso per definizioni, aree e ruoli della gestione dei dati
- [Microsoft Fabric adoption roadmap: Governance](https://learn.microsoft.com/en-us/power-bi/guidance/fabric-adoption-roadmap-governance) (Microsoft Learn): un approccio pragmatico che bilancia controllo e autonomia e parte dai problemi più urgenti
- [Data Mesh Principles and Logical Architecture](https://martinfowler.com/articles/data-mesh-principles.html) (Zhamak Dehghani): il principio della governance federata e computazionale, cioè applicata dalla piattaforma
- [Open Data Contract Standard](https://bitol-io.github.io/open-data-contract-standard/) (Bitol): uno standard aperto per scrivere contratti sui dati tra chi li produce e chi li usa
