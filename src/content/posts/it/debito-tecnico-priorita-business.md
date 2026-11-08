---
title: "Debito tecnico o priorità del business? Il problema non è scegliere, è decidere quanto pagare"
description: "Il business chiede nuove funzionalità per ieri, il team dati sa che le fondamenta scricchiolano. Non è una scelta tra due alternative: è una decisione di investimento che va presa in modo esplicito."
date: 2026-11-04
categories: ["data-strategy", "data-engineering"]
cover:
  src: "/assets/images/posts/debito-tecnico-priorita-business.svg"
  alt: "Nuovi blocchi impilati su fondamenta crepate, accanto a barre che mostrano il tempo del team diviso tra nuove richieste e lavoro non pianificato"
tags: ["Data Engineering", "Debito tecnico", "Data Strategy", "Leadership"]
updated: 2026-11-04
draft: false
---

Lunedì mattina, riunione di prioritizzazione.

Il responsabile commerciale ha bisogno di una nuova dashboard per il lancio di un prodotto, entro fine mese. La richiesta è chiara, la scadenza anche, e c’è un dirigente che la sostiene. Dall’altra parte del tavolo, il team dati sa una cosa che nessuno ha chiesto: la pipeline che alimenta quei numeri fallisce due notti a settimana, e ogni volta qualcuno la sistema a mano prima delle nove, quando arrivano i primi report.

Due esigenze, un solo team, la stessa capacità. Chi lavora con i dati conosce bene questa scena, e conosce anche come finisce di solito: vince la dashboard, la pipeline resta com’è, e si promette di “sistemarla appena c’è un momento”. Quel momento, quasi sempre, non arriva.

## Due esigenze legittime

È facile raccontare questa tensione come uno scontro tra chi ha fretta e chi vuole fare le cose per bene. È un racconto comodo, ma sbagliato.

Il business ha ragione a spingere. Le finestre di mercato si chiudono, i concorrenti non aspettano, e un team dati che risponde sempre “prima dobbiamo rifare le fondamenta” smette in fretta di essere considerato un partner. Una piattaforma perfetta che consegna in ritardo non serve a nessuno.

Ma ha ragione anche chi difende la qualità. Il debito tecnico non è un vezzo da ingegneri: è un costo reale, che si paga ogni giorno, solo che non compare in nessun budget. E a un certo punto presenta il conto tutto insieme, di solito nel momento peggiore.

Il problema, quindi, non è scegliere chi ha ragione. È che le due esigenze vengono confrontate con strumenti diversi: una ha un valore visibile e una data, l’altra ha un costo invisibile e incerto. In un confronto così, il debito perde sempre.

## Come si presenta il debito tecnico in un team dati

Nei sistemi dati il debito tecnico ha forme riconoscibili:

- **pipeline senza test**, che funzionano finché qualcuno non cambia un campo a monte;
- **la stessa metrica calcolata in tre posti diversi**, con tre logiche leggermente diverse;
- **interventi manuali ricorrenti**, come il job da rilanciare o il file da correggere prima della chiusura mensile;
- **tabelle che nessuno sa più spiegare**, ma che nessuno osa spegnere perché “forse qualcuno le usa”;
- **eccezioni scritte direttamente nel codice**, come il cliente escluso a mano o la data corretta con un `case when`;
- **strumenti fuori supporto**, mantenuti in vita perché migrare costa troppo.

Ognuno di questi elementi, preso da solo, sembra gestibile. Il problema è l’effetto cumulativo: ogni nuova richiesta del business viene costruita sopra queste fondamenta, e ogni volta costa un po’ di più, richiede un po’ più di tempo, nasconde un po’ più di rischio.

## Perché il debito perde sempre la discussione

C’è un’asimmetria strutturale tra le due esigenze.

Una nuova funzionalità ha un richiedente, un valore dichiarato e una scadenza. Si vede quando viene consegnata e qualcuno ringrazia. Ridurre il debito, invece, produce soprattutto cose che *non* succedono: l’incidente evitato, il report che non arriva in ritardo, il numero che non viene contestato in riunione. Nessuno festeggia un problema che non si è verificato.

C’è poi una questione di linguaggio. Quando il team dati chiede tempo per “fare refactoring” o “ripagare il debito tecnico”, il business sente una richiesta di lavorare su qualcosa che, dal suo punto di vista, già funziona. Detta così, è una richiesta difficile da accogliere, e infatti spesso non lo è.

Il risultato è prevedibile: il debito viene affrontato solo quando diventa un’emergenza. A quel punto non si sceglie più cosa sistemare e quando: lo decide il sistema, rompendosi.

## Non è il debito il problema, sono gli interessi

La metafora del debito è utile proprio perché funziona come quella finanziaria. Indebitarsi non è sbagliato: un’azienda che non si indebita mai cresce più lentamente. Allo stesso modo, una scorciatoia tecnica presa consapevolmente per rispettare una scadenza importante può essere una decisione corretta.

Quello che conta sono gli interessi: il tempo che il team spende ogni settimana a convivere con il debito. Il job rilanciato a mano, la verifica fatta due volte perché il dato non è affidabile, la nuova metrica che richiede tre settimane invece di tre giorni perché bisogna prima capire come funziona la logica esistente.

Prendiamo un esempio, con numeri inventati ma realistici. Un team di sei data engineer tiene traccia per un mese di dove va il proprio tempo. Scopre che circa il 30% se ne va in interventi manuali, correzioni e indagini su numeri che non tornano. È come avere quattro persone che lavorano sulle richieste del business e due che lavorano solo per tenere in piedi ciò che c’è già. Nessuno ha mai deciso di destinare due persone a questo compito: è successo e basta.

Questo è il punto da cui partire. Il debito tecnico non è in competizione con le priorità del business: sta già consumando la capacità che il business pensa di avere a disposizione.

## Rendere visibile il costo

Se il problema è l’asimmetria, la soluzione è riportare le due esigenze sullo stesso piano. Il debito va tradotto nella lingua del business: tempo, rischio, ritardi, fiducia.

Invece di dire “la pipeline va rifatta”, si può dire: “questa pipeline fallisce in media due volte a settimana, ogni volta costa due ore di lavoro e in tre casi negli ultimi due mesi il report commerciale è arrivato dopo le dieci. Se costruiamo la nuova dashboard sopra questa pipeline, avrà lo stesso problema”.

È la stessa informazione, ma adesso il responsabile commerciale ha gli elementi per decidere. Potrebbe scegliere comunque di andare avanti, e va bene: è una decisione di business, presa con le informazioni corrette.

Lo stesso vale per alcuni segnali da seguire nel tempo: quanto serve per aggiungere una nuova metrica, quanti incidenti arrivano al business ogni mese, quante ore vanno in lavoro non pianificato. Non serve che siano precisi, ma che siano misurati sempre allo stesso modo.

## Regole pratiche per far convivere le due esigenze

Non esiste una formula valida per tutti, ma alcune pratiche funzionano in molti contesti.

1. **Tenere un registro del debito.** Una lista semplice, non un progetto a sé: per ogni voce, cosa riguarda, quanto costa oggi in tempo o rischio, chi ne è responsabile. Senza registro, il debito esiste solo nella testa delle persone, e se ne va quando loro cambiano lavoro.
2. **Riservare una capacità fissa.** Una quota stabile del tempo del team, per esempio il 15-20%, dedicata alla riduzione del debito. Il punto non è la percentuale esatta, ma il fatto che non venga rinegoziata a ogni sprint. Se va difesa ogni due settimane, prima o poi verrà sacrificata.
3. **Legare la manutenzione al lavoro di business.** Quando una richiesta tocca un’area con debito, la sistemazione entra nella stima. La nuova dashboard costa tre settimane invece di due, perché include la messa in sicurezza della pipeline. È più facile da far accettare di un intervento separato, e il lavoro viene fatto dove serve davvero.
4. **Includere la qualità nella definizione di “fatto”.** Test, documentazione minima e monitoraggio non sono attività da aggiungere dopo: fanno parte della consegna. Altrimenti ogni rilascio crea nuovo debito mentre si cerca di ripagare quello vecchio.
5. **Rendere esplicito il debito volontario.** Quando si sceglie una scorciatoia per rispettare una scadenza, la si scrive nel registro con una data di rientro, come un prestito. Il business approva la scorciatoia e, insieme, approva il tempo per sistemarla dopo.
6. **Decidere con il business, non al posto del business.** Il team dati non dovrebbe decidere da solo di fermare le consegne per rifare l’infrastruttura, e il business non dovrebbe ignorare un rischio che gli è stato spiegato chiaramente. Le opzioni vanno presentate con i loro costi, e la scelta va presa insieme.
7. **Sapere quando non pagare.** Non tutto il debito va ripagato. Un sistema che verrà dismesso tra sei mesi probabilmente va solo tenuto in vita. Spendere tempo per renderlo elegante è un altro modo di sprecare capacità.

## Una conversazione diversa

Tutto questo richiede un cambio di ruolo. Il responsabile di un team dati non può limitarsi a raccogliere richieste e stimarle, né a difendere la qualità come un valore astratto. Deve fare da ponte: capire le priorità del business abbastanza bene da saperle mettere in discussione, e spiegare i rischi tecnici abbastanza bene da farli diventare parte della decisione.

Quando funziona, la riunione del lunedì cambia tono. Non si discute più se fare la dashboard o sistemare la pipeline, ma come consegnare la dashboard senza costruirla su fondamenta che cederanno al primo mese di utilizzo. A volte la risposta è fare entrambe le cose, con una settimana in più. A volte è consegnare una prima versione più semplice. A volte è accettare il rischio, consapevolmente.

In tutti e tre i casi, la decisione è stata presa da qualcuno, e non è stata subita.

## Un test per cominciare

C’è un esercizio semplice che si può fare prima di qualsiasi piano di rifacimento. Per un mese, chiedi al team di annotare ogni intervento non pianificato: job rilanciati, correzioni manuali, indagini su numeri che non tornano, richieste di chiarimento su tabelle che nessuno conosce. Alla fine, somma le ore.

Poi confronta quel numero con il tempo dedicato alle nuove richieste del business. Se il rapporto ti sorprende, hai trovato la prima cosa da portare alla prossima riunione di prioritizzazione: non come lamentela, ma come dato.

Il debito tecnico e le priorità del business non sono due esigenze da mettere una contro l’altra. Sono due voci dello stesso bilancio. Il business ha diritto di chiedere velocità, il team dati ha il dovere di dire quanto costa. Quello che non funziona è far finta che il costo non esista, perché prima o poi qualcuno lo paga comunque, di solito nel momento peggiore.

## Per approfondire

Letture utili sui temi dell’articolo (in inglese).

- [The WyCash Portfolio Management System](http://c2.com/doc/oopsla92.html) (Ward Cunningham, 1992): il testo in cui nasce la metafora del debito tecnico
- [Technical Debt](https://martinfowler.com/bliki/TechnicalDebt.html) (Martin Fowler): debito e interessi spiegati in poche righe
- [Technical Debt Quadrant](https://martinfowler.com/bliki/TechnicalDebtQuadrant.html) (Martin Fowler): la differenza tra debito consapevole e debito accidentale
- [Eliminating Toil](https://sre.google/sre-book/eliminating-toil/) (Google, Site Reliability Engineering): come misurare e limitare il lavoro manuale ripetitivo
