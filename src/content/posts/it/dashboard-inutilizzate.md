---
title: "Abbiamo 400 dashboard e nessuno sa quali vengono usate"
description: "Creare una dashboard costa pochi minuti, spegnerla richiede di sapere chi la usa. Così il patrimonio di BI cresce per inerzia, finché nessuno sa più quale sia il numero giusto."
date: 2026-11-06
categories: ["bi-analytics", "data-governance"]
cover:
  src: "/assets/images/posts/dashboard-inutilizzate.svg"
  alt: "Una griglia di molte dashboard sbiadite, tra cui poche evidenziate e una sola contrassegnata come ufficiale"
tags: ["Business Intelligence", "Dashboard", "Data Analytics", "Data Governance"]
updated: 2026-11-06
draft: true
---

Il progetto di migrazione parte con una domanda innocua. Il fornitore del nuovo strumento di BI chiede quante dashboard ci sono da migrare, per stimare tempi e costi.

Qualcuno estrae l’elenco dal vecchio strumento: 412 dashboard, quasi duemila report, una sessantina di sorgenti dati collegate. Il numero sorprende tutti, ma la vera sorpresa arriva con la seconda domanda: quali di queste vengono usate davvero?

Nessuno lo sa. Ogni responsabile di reparto, interpellato, risponde che le sue sono tutte importanti. Il team dati sospetta che la maggior parte non venga aperta da mesi, ma non ha modo di dimostrarlo. E così il piano di migrazione prevede di portare tutto, per sicurezza: quattrocento dashboard da ricostruire, testare e validare, molte delle quali non servono a nessuno.

Chi lavora con i dati conosce bene questa scena. E non serve una migrazione per incontrarla: basta aprire la cartella “Condivise” di un qualsiasi strumento di BI dopo qualche anno di utilizzo.

## Come si arriva a 400

Nessuno decide di avere 400 dashboard. Ci si arriva una richiesta alla volta, e ognuna, presa da sola, aveva senso.

Un responsabile ha bisogno di un numero per una riunione. Una dashboard esistente fa quasi quello che serve, ma non del tutto, e modificarla vorrebbe dire coinvolgere chi l’ha costruita: si fa prima a duplicarla. Un progetto ha bisogno di un monitoraggio per tre mesi; il progetto finisce, la dashboard resta. Una persona cambia ruolo e lascia dietro di sé una cartella di report che nessun altro conosce. Un nuovo strumento self-service viene lanciato con l’obiettivo, giusto, di rendere le persone autonome, e nel giro di un anno ogni team ha la propria versione delle vendite mensili.

Poi ci sono le dashboard nate per rispondere a una domanda una tantum: un’analisi sui resi per capire un picco anomalo, un confronto tra due campagne, una verifica chiesta dal CFO. La domanda trova risposta, la dashboard rimane pubblicata, e da quel momento fa parte del patrimonio.

Il meccanismo è sempre lo stesso. Creare una dashboard costa poco, spesso pochi minuti. Spegnerla, invece, richiede di sapere chi la usa, e quell’informazione quasi mai c’è.

## Perché nessuno le spegne

C’è un’asimmetria simile a quella del [debito tecnico](/it/posts/debito-tecnico-priorita-business/). Chi spegne una dashboard inutile non ottiene nessun riconoscimento: nessuno nota l’assenza di qualcosa che non usava. Chi spegne per errore una dashboard che serviva, invece, lo scopre subito, magari dal direttore che il lunedì mattina non trova più il suo report.

Con il rischio tutto da una parte e un beneficio invisibile dall’altra, la scelta razionale per chiunque è non toccare niente. Ogni dashboard, una volta pubblicata, diventa permanente per inerzia.

A questo si aggiunge un problema di responsabilità. In molte aziende una dashboard ha un autore, cioè chi l’ha costruita, ma non un responsabile, cioè qualcuno che risponda del suo contenuto e decida se debba continuare a esistere. L’autore spesso è nel team dati e non ricorda più a cosa serviva; chi la usa, se qualcuno la usa, non se ne sente titolare. Senza un responsabile, nessuno ha l’autorità per decidere, e quindi non decide nessuno.

## Quanto costano davvero

Una dashboard che nessuno apre sembra innocua. Non lo è, per almeno cinque motivi.

**Il costo di manutenzione.** Ogni dashboard dipende da tabelle, viste e query. Quando cambia una sorgente o si modifica un modello dati, qualcuno deve verificare cosa si rompe. Con 400 dashboard, ogni modifica al data warehouse diventa un’analisi d’impatto lunga e incerta, e spesso si rinuncia a migliorare il modello per paura di rompere qualcosa che forse nessuno guarda.

**Il costo di calcolo.** Molte dashboard hanno refresh pianificati, estrazioni notturne, invii automatici via email. Consumano risorse sul data warehouse e licenze sullo strumento di BI anche quando nessuno le guarda. Non è raro scoprire che una parte rilevante dei refresh notturni alimenta report che non vengono aperti da mesi.

**I numeri contraddittori.** Quando esistono cinque versioni delle vendite mensili, costruite in momenti diversi con filtri leggermente diversi, prima o poi due persone arrivano in riunione con due numeri. È lo stesso problema del “cliente attivo” raccontato in un [articolo precedente](/it/posts/ai-active-customer/), moltiplicato per il numero di copie.

**La fiducia.** Chi cerca un dato e trova dieci dashboard con nomi simili non sa quale sia quella giusta. Dopo un paio di tentativi andati male, smette di cercare e chiede il numero a qualcuno, oppure se lo ricalcola in Excel. L’abbondanza di dashboard produce l’effetto opposto a quello per cui erano state create: meno autonomia, non di più.

**Le migrazioni e l’AI.** Ogni cambio di strumento, ogni progetto di modernizzazione deve fare i conti con l’intero patrimonio, utile o no. E se si vuole collegare un assistente AI ai contenuti di BI esistenti, il disordine diventa un problema serio: l’assistente non sa distinguere la dashboard ufficiale dalla copia abbandonata due anni fa, e può rispondere usando quella sbagliata, con la stessa sicurezza con cui risponderebbe usando quella giusta.

## Le visualizzazioni non dicono tutto

La prima reazione, di solito, è guardare le statistiche di utilizzo. Quasi tutti gli strumenti di BI registrano chi apre cosa e quando. È il punto di partenza giusto, ma va letto con attenzione, perché i numeri di utilizzo ingannano in entrambe le direzioni.

Alcune dashboard sembrano usate e non lo sono. Quella impostata come pagina iniziale viene aperta ogni mattina da tutti, ma nessuno la guarda davvero. Un report inviato via email a cinquanta destinatari risulta “consegnato” ogni giorno, ma probabilmente finisce in una cartella che nessuno apre. Un’estrazione automatica alimenta un file Excel che a sua volta, forse, alimenta qualcos’altro.

Altre sembrano inutilizzate e invece sono critiche. La dashboard della chiusura trimestrale viene aperta quattro volte l’anno, da tre persone, ma in quei giorni è indispensabile. Il report per le verifiche regolamentari viene consultato una volta all’anno, durante l’audit. Una regola come “spegniamo tutto ciò che non è stato aperto negli ultimi 90 giorni” eliminerebbe proprio queste.

Le statistiche servono quindi a trovare i candidati, non a prendere la decisione. Indicano dove guardare. Poi serve una conversazione con chi quella dashboard l’ha chiesta, o con chi dovrebbe usarla.

## Un inventario che serve a decidere

Per uscire da questa situazione serve un inventario. Non un catalogo perfetto, che richiederebbe mesi e verrebbe abbandonato a metà, ma un elenco con poche informazioni per ogni dashboard:

- **chi è il responsabile**, cioè la persona di business che risponde del contenuto, non chi l’ha costruita;
- **a cosa serve**, in una frase: quale decisione supporta o quale processo alimenta;
- **quanto viene usata**, dalle statistiche dello strumento, tenendo conto della stagionalità;
- **da cosa dipende**, cioè le tabelle e le sorgenti principali;
- **che livello ha**, secondo una classificazione semplice.

La classificazione è la parte più utile. Basta distinguere tre livelli:

1. **Certificate.** Poche dashboard, spesso meno di trenta, che contengono i numeri ufficiali dell’azienda. Hanno un responsabile, definizioni documentate, controlli di qualità e un team che ne garantisce il funzionamento. Se due numeri non tornano, vince questa.
2. **Di team.** Dashboard operative usate da un reparto per il proprio lavoro quotidiano. Hanno un responsabile nel reparto e possono usare logiche specifiche, ma non sono la fonte ufficiale per i numeri aziendali.
3. **Personali o esplorative.** Analisi individuali, prototipi, verifiche una tantum. Vivono in uno spazio separato, non vengono presentate come fonte ufficiale e hanno una scadenza.

Questa distinzione cambia la conversazione. Non si tratta più di stabilire se una dashboard “serve”, domanda a cui tutti rispondono di sì, ma in quale livello debba stare. E ogni livello ha regole diverse su manutenzione, supporto e durata.

## Spegnere senza fare danni

Con l’inventario in mano, la paura di spegnere la cosa sbagliata si affronta con un processo graduale, in cui ogni passo è reversibile.

1. **Individuare i candidati.** Dashboard senza responsabile, senza accessi significativi da molti mesi, duplicati evidenti di altre dashboard. Questa lista, in genere, è più lunga di quanto ci si aspetti.
2. **Cercare un responsabile.** Per ogni candidato si contatta l’ultimo richiedente noto o il reparto di riferimento. Se qualcuno la rivendica, ne diventa il responsabile e si registra a cosa serve. Se nessuno risponde entro un termine stabilito, il silenzio è già un’informazione.
3. **Nascondere prima di cancellare.** Le dashboard candidate vengono tolte dalla vista e spostate in un archivio, con un messaggio chiaro per chi prova ad aprirle: chi contattare per riattivarle. È il passaggio più importante, perché trasforma un errore potenzialmente grave in una richiesta che si risolve in pochi minuti.
4. **Aspettare abbastanza.** Il periodo di archivio deve coprire almeno un ciclo completo di attività: un trimestre, meglio se include una chiusura. Così anche le dashboard stagionali hanno il tempo di farsi notare.
5. **Cancellare davvero.** Quello che nessuno ha richiesto durante il periodo di archivio si può eliminare, insieme ai refresh, agli invii automatici e, quando possibile, alle tabelle che esistevano solo per alimentarlo.

Prendiamo un esempio, con numeri inventati ma realistici. Delle 412 dashboard iniziali, 160 non hanno accessi da oltre sei mesi e altre 110 sono duplicati o varianti di dashboard esistenti. Dopo il processo di archiviazione ne restano circa 140, e le richieste di riattivazione sono sei. Ognuna di quelle sei porta con sé un’informazione preziosa: adesso quella dashboard ha un responsabile e uno scopo dichiarato.

C’è anche un vantaggio collaterale. Le dashboard che restano, spesso, migliorano. Quando la stessa metrica non è più dispersa in cinque copie, si può investire su una sola versione, renderla più chiara, documentarla e portarla al livello certificato.

## Evitare di tornare a 400

Fare pulizia una volta è utile. Ma se le regole che hanno prodotto 400 dashboard restano le stesse, tra due anni si sarà di nuovo al punto di partenza. Servono alcune regole semplici, da applicare a ogni nuova dashboard condivisa.

- **Ogni dashboard condivisa ha un responsabile.** Senza un nome, non si pubblica. Quando il responsabile cambia ruolo, la responsabilità passa a qualcun altro oppure la dashboard va in revisione.
- **Ogni dashboard dichiara a cosa serve.** Una riga basta: quale decisione supporta, quale processo alimenta. Se non si riesce a scriverla, forse la dashboard non serve.
- **Lo spazio personale è separato da quello condiviso.** Le persone devono poter esplorare liberamente, ed è giusto così. Ma un’analisi personale non diventa una fonte condivisa per il solo fatto di essere stata salvata nella cartella sbagliata.
- **Le dashboard esplorative hanno una scadenza.** Novanta giorni, per esempio, rinnovabili con un clic. Se nessuno le rinnova, vanno in archivio.
- **Prima di crearne una nuova, si cerca quella esistente.** Se quella esistente non basta, si valuta di estenderla invece di duplicarla. Questo funziona solo se modificare una dashboard esistente è facile: se è più complicato che crearne una nuova, le persone continueranno a duplicare.
- **Una revisione periodica.** Due volte l’anno, il team dati estrae l’elenco delle dashboard con poco utilizzo o senza responsabile e avvia lo stesso processo di archiviazione. Fatto con regolarità, richiede pochi giorni; fatto ogni cinque anni, diventa un progetto.

Nessuna di queste regole limita il self-service. Al contrario, lo rendono sostenibile: le persone possono costruire ciò che serve, sapendo che lo spazio condiviso resta ordinato e che i numeri ufficiali sono riconoscibili.

## Il punto non è il numero

Sarebbe sbagliato trasformare tutto questo in un obiettivo numerico, del tipo “dobbiamo scendere sotto le cento dashboard”. Un’azienda grande, con molti processi, può avere bisogno di centinaia di dashboard. Il problema non è quante sono, ma il fatto di non sapere quali contano.

La domanda da porsi non è “quante dashboard abbiamo?”, ma “se un dirigente chiede dove trovare il numero ufficiale delle vendite, sappiamo indicargli una sola risposta?”. Se la risposta è sì, il patrimonio di BI funziona, qualunque sia la sua dimensione. Se la risposta è “dipende”, c’è lavoro da fare.

## Un test per cominciare

C’è un esercizio che si può fare in un pomeriggio. Estrai dallo strumento di BI l’elenco delle dashboard condivise con la data dell’ultimo accesso. Poi conta tre cose: quante non sono state aperte negli ultimi sei mesi, quante non hanno un responsabile che sapresti nominare, e quante versioni diverse esistono della metrica più importante della tua azienda.

Se i tre numeri ti sembrano accettabili, hai un patrimonio di BI in buona salute. Se ti sorprendono, hai trovato l’argomento per la prossima riunione con il business: non come richiesta di fare pulizia, ma come risposta anticipata a una domanda che prima o poi qualcuno farà, magari durante una migrazione, magari davanti a due numeri diversi per la stessa cosa.

Le dashboard servono a prendere decisioni. Quando sono così tante che nessuno sa più quali guardare, smettono di farlo.
