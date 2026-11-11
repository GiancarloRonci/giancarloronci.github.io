---
title: "I dati di marketing si rompono tra un team e l’altro: serve qualcuno che tenga la catena"
description: "Tra il marketing che usa i dati, il team che gestisce gli strumenti martech e quello che gestisce la piattaforma dati, ogni pezzo funziona e il numero è comunque sbagliato. Requisiti, tracking plan, consenso, latenza e qualità: cosa vuol dire essere responsabili della catena intera."
date: 2026-11-11
categories: ["data-governance", "data-quality"]
cover:
  src: "/assets/images/posts/catena-dati-marketing.svg"
  alt: "Tre blocchi in fila, strumenti di marketing, piattaforma dati e report, uniti da una catena; nel punto in cui la catena si spezza, una persona tiene insieme i due capi"
tags: ["Martech", "Data Governance", "Data Quality", "Consent Mode", "Google Analytics 4", "BigQuery"]
updated: 2026-11-11
draft: false
---

Lunedì parte una campagna su un nuovo canale. Giovedì la dashboard delle conversioni segna un calo del 30% rispetto alla settimana prima, e il team marketing chiede cosa sta succedendo.

Il team che gestisce gli strumenti di marketing controlla il tag manager: i tag partono, gli eventi arrivano allo strumento di analytics. Il team della piattaforma dati controlla le pipeline: tutti i job sono verdi, nessun errore di caricamento. Il team di analisi controlla la query della dashboard: non è cambiata da mesi.

Hanno ragione tutti e tre. E il numero è comunque sbagliato.

Dopo due giorni di messaggi si scopre la causa: con il nuovo canale è stato aggiornato anche il banner dei cookie, e un parametro di consenso prima non gestito ora parte negato in alcuni mercati. Gli eventi arrivano lo stesso, ma senza l’identificativo che la pipeline usa per collegarli agli ordini. Nessun pezzo si è rotto. Si è rotto il punto in cui un pezzo passa all’altro.

## Tre team, una catena

Nella maggior parte delle aziende di una certa dimensione, un dato di marketing attraversa almeno tre mani prima di diventare un numero in un report.

- **Chi usa i dati**: il marketing e i team di analisi che misurano campagne e canali, segmentano i clienti, costruiscono modelli di attribuzione o di propensione.
- **Chi gestisce gli strumenti martech**: spesso un team IT o digitale che sceglie, acquista e configura tag manager, CDP, SDK delle app, piattaforme pubblicitarie e di marketing automation.
- **Chi gestisce la piattaforma dati**: il team centrale che porta i dati nel data warehouse, li trasforma e ne garantisce disponibilità e sicurezza per tutta l’azienda.

Ognuno di questi team ha obiettivi ragionevoli e misura il proprio lavoro in modo ragionevole. Il team martech misura se gli strumenti sono attivi e configurati. Il team della piattaforma misura se le pipeline girano. Il marketing misura le campagne. Nessuno dei tre, per come è costruito, misura se il dato arriva dall’inizio alla fine con il significato giusto.

Il risultato è che i problemi vivono nelle giunture: un campo rinominato in un evento, uno strumento nuovo che esporta i dati con una granularità diversa dal precedente, una modifica al consenso, un fuso orario diverso tra due sistemi. Sono problemi che nessuno ha causato da solo e che nessuno, da solo, ha il compito di trovare.

## Il ruolo che manca

La risposta classica è un comitato. Quella che funziona meglio è una persona: qualcuno che sia responsabile della catena intera, dai sistemi in cui nascono gli eventi fino ai dati pronti per l’analisi, e che rappresenti chi quei dati li usa.

Nelle aziende questo ruolo prende nomi diversi: data platform manager, data product owner, responsabile della governance dei dati di marketing. Il nome conta poco. Contano tre cose che fa.

1. **Traduce.** Trasforma le esigenze del marketing in requisiti che un team tecnico può costruire, e spiega al marketing cosa è possibile, con quali tempi e a quale costo.
2. **Negozia.** Il team martech e il team della piattaforma hanno le loro priorità e le loro code di lavoro, che servono anche altre parti dell’azienda. Questa persona porta le esigenze del marketing nella loro pianificazione e concorda tempi e livelli di servizio.
3. **Risponde del risultato.** Quando il numero è sbagliato, è la persona che coordina la ricerca della causa, anche se la causa sta nel sistema di qualcun altro.

C’è una caratteristica che rende questo ruolo difficile: quasi sempre lavora senza autorità gerarchica sui team da cui dipende. Non può ordinare al team della piattaforma di anticipare un lavoro. Può solo renderlo conveniente, chiaro e ben motivato. È lo stesso tema di cui ho scritto parlando di [data governance](/it/posts/data-governance-chi-decide/): il problema raramente è la tecnologia, quasi sempre è chi decide cosa.

## Requisiti che un altro team può costruire

“Ci servono i dati della nuova piattaforma di email marketing nel data warehouse” non è un requisito. È un desiderio. Il team della piattaforma, ricevendolo, dovrà indovinare quasi tutto, e indovinerà in modo diverso da come serviva.

Un requisito utile risponde ad alcune domande precise:

- **Quali oggetti e quali eventi**: invii, aperture, clic, disiscrizioni, rimbalzi? Le anagrafiche delle liste e delle campagne?
- **A quale granularità**: il singolo evento per destinatario, o i totali giornalieri per campagna? La differenza decide quali analisi saranno possibili per sempre.
- **Con quale storico**: da quando servono i dati, e lo strumento permette davvero di esportarli all’indietro?
- **Con quali chiavi**: come si collega un destinatario a un cliente del CRM o a un utente del sito? Se lo strumento non esporta un identificativo condiviso, nessuna pipeline lo potrà ricostruire.
- **Con quale latenza**: serve il dato entro pochi minuti, entro la mattina dopo, o una volta a settimana basta? Più avanti c’è un esempio di quanto questa domanda pesi.
- **Con quali vincoli di consenso e privacy**: in quali mercati, con quali basi giuridiche, per quanto tempo si possono conservare.
- **Per quali usi**: report, attivazione verso altre piattaforme, modelli di machine learning.

L’ultima domanda è quella che si dimentica più spesso, e oggi è quella che costa di più dimenticare. Un modello di propensione o di churn ha bisogno di cose che un report non chiede: uno storico lungo e stabile, identificativi coerenti nel tempo, definizioni che non cambiano a metà serie, e la possibilità di ricostruire com’erano i dati in una certa data. Se questi requisiti non entrano all’inizio, i dati che serviranno al primo progetto di AI saranno pronti per i report e inutilizzabili per il modello.

## Il tracking plan è un contratto

Gran parte dei dati di marketing nasce come eventi: una pagina vista, un prodotto aggiunto al carrello, un acquisto, un clic su una email. Chi li definisce, spesso, è il team martech o chi sviluppa il sito e l’app. Chi li usa sta due o tre passaggi più in là.

Il **tracking plan** è il documento che mette d’accordo le due parti: quali eventi esistono, come si chiamano, quali proprietà hanno, di che tipo, quali sono obbligatorie. Funziona solo se viene trattato come un contratto, cioè come qualcosa che si verifica automaticamente e che si cambia solo con una procedura.

Il modo più semplice per renderlo verificabile è scrivere ogni evento come uno schema. Uno standard molto diffuso è JSON Schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "purchase",
  "type": "object",
  "required": ["event_name", "event_timestamp", "order_id", "value", "currency", "market"],
  "properties": {
    "event_name": { "const": "purchase" },
    "event_timestamp": { "type": "string", "format": "date-time" },
    "order_id": { "type": "string", "minLength": 1 },
    "value": { "type": "number", "minimum": 0 },
    "currency": { "type": "string", "pattern": "^[A-Z]{3}$" },
    "market": { "type": "string", "enum": ["IT", "FR", "DE", "ES", "UK"] }
  }
}
```

Con uno schema così, un evento senza `order_id` o con la valuta scritta `euro` invece di `EUR` può essere scartato o messo da parte al momento della raccolta, invece di arrivare nel warehouse e rovinare silenziosamente un report tre settimane dopo. E una modifica a un evento diventa una modifica allo schema, che si propone, si rivede e si comunica a chi sta a valle prima del rilascio.

Le regole che rendono il tracking plan utile sono poche: una convenzione di nomi unica per tutti i mercati e tutti i canali, una versione per ogni schema, un responsabile che approva le modifiche, e un test automatico che confronta gli eventi reali con lo schema. Il resto è documentazione.

## Un nuovo strumento, dal contratto ai dati in tabella

Il momento in cui la catena si rompe più spesso è l’arrivo di un nuovo strumento martech. Di solito il percorso è questo: il marketing sceglie lo strumento, il team martech lo configura, e solo alla fine qualcuno chiede al team della piattaforma di “portare i dati nel warehouse”. A quel punto il contratto è firmato e le scelte che contano sono già state fatte.

Conviene invertire l’ordine e trattare l’ingresso di uno strumento come un progetto unico, con tutte e tre le parti coinvolte dall’inizio.

1. **Prima della scelta.** Verificare cosa lo strumento permette di esportare: API o export su file, granularità, storico disponibile, limiti di chiamate, identificativi esposti, gestione del consenso. Uno strumento ottimo per il marketing ma che esporta solo totali aggregati è uno strumento da cui non si potrà mai misurare nulla di nuovo.
2. **Durante la configurazione.** Allineare le configurazioni al tracking plan e alle convenzioni esistenti: nomi degli eventi, codici delle campagne, mercati, valute, fusi orari.
3. **Durante la costruzione della pipeline.** Concordare formato, frequenza, gestione dei dati che arrivano in ritardo e cosa succede quando lo schema dell’export cambia.
4. **Prima del rilascio.** Fare un test di integrazione con eventi noti: generare dieci acquisti di prova, con valori e mercati diversi, e verificare che arrivino tutti, uguali, fino alla tabella finale.
5. **Al rilascio.** Se lo strumento ne sostituisce un altro, tenerli attivi in parallelo per qualche settimana e confrontare i numeri. La differenza va spiegata prima di spegnere il vecchio, non dopo.

## Tempo reale o batch: chiedere quello che serve

“Ci servono i dati in tempo reale” è uno dei requisiti più frequenti e uno dei meno discussi. Il tempo reale costa, e soprattutto ha caratteristiche diverse da quelle che spesso si immaginano.

Un esempio concreto è l’export di Google Analytics 4 verso BigQuery. Ci sono due modalità principali. L’**export giornaliero** scrive una tabella al giorno con tutti gli eventi del giorno precedente, di solito nel pomeriggio, a volte più tardi. L’**export in streaming** scrive i dati in una tabella intraday entro pochi minuti.

Il dettaglio che conta sta nella documentazione: lo streaming è un servizio *best effort*, senza un obiettivo di completezza, e può contenere buchi. Alcuni dati, come la sorgente di traffico dei nuovi utenti e delle nuove sessioni, non vengono esportati in streaming. Google stessa consiglia di usare la tabella giornaliera quando serve un dato stabile. E anche la tabella giornaliera non è definitiva subito: Analytics la può aggiornare per altri due giorni di calendario oltre la data della tabella, per gli eventi che arrivano in ritardo.

Le conseguenze pratiche sono due. Un report che legge lo streaming e uno che legge l’export giornaliero daranno numeri diversi per lo stesso giorno, ed entrambi saranno corretti per quello che sono. E il numero di ieri, letto stamattina, potrebbe cambiare domani.

Per questo la domanda giusta non è “quanto velocemente?” ma “per fare cosa?”. Interrompere una campagna che sta bruciando budget richiede dati in pochi minuti, anche incompleti. Il report settimanale delle performance per canale richiede dati completi e stabili, e può aspettare. Sono due prodotti diversi, con due livelli di servizio diversi, e chiamarli entrambi “dati di marketing” è l’inizio della confusione.

## Il consenso fa parte della definizione del dato

Nell’esempio iniziale, il calo delle conversioni non veniva da un errore tecnico ma da una modifica al consenso. È un caso frequente, perché in Europa il consenso decide cosa arriva, prima ancora di come arriva.

Con Google Consent Mode, per esempio, il sito comunica ai tag di Google lo stato di quattro parametri principali: `ad_storage` e `analytics_storage`, che riguardano l’uso di cookie e identificativi per pubblicità e analisi, e `ad_user_data` e `ad_personalization`, che riguardano l’invio di dati degli utenti a Google per la pubblicità e la pubblicità personalizzata. Se `ad_user_data` è negato, per esempio, non vengono inviati lo `user_id` e i dati delle conversioni avanzate.

Conta anche la modalità scelta. In quella **base**, i tag non partono finché l’utente non risponde al banner, e se l’utente rifiuta non arriva nulla, nemmeno lo stato del consenso. In quella **avanzata**, i tag partono subito e, finché il consenso è negato, inviano misurazioni senza cookie, che Google usa per stimare le conversioni mancanti.

Per chi è responsabile della catena, questo ha tre implicazioni.

- **Una modifica al banner è una modifica ai dati.** Va trattata come una modifica allo schema: pianificata, comunicata a chi usa i dati, annotata nella serie storica.
- **I numeri prima e dopo una modifica al consenso non sono confrontabili** senza una correzione. Un calo del 30% può essere un calo della misurazione, non delle vendite.
- **Le regole cambiano da mercato a mercato.** Una piattaforma che serve più paesi deve sapere, per ogni dato, in base a quale consenso è stato raccolto, e deve poterlo filtrare.

Gli stessi ragionamenti valgono per gli altri problemi classici dei dati di marketing, come l’attribuzione e il riconoscimento dello stesso utente su più dispositivi. Non hanno una soluzione tecnica definitiva: hanno una scelta, che va fatta da qualcuno, scritta e applicata in modo coerente.

## Misurare la catena, non i singoli pezzi

Se ogni team misura solo il proprio pezzo, tutti gli indicatori possono essere verdi mentre il numero finale è sbagliato. Serve qualche misura che guardi la catena intera.

Il linguaggio più utile per farlo viene dalla gestione dei servizi informatici. Un **SLI** è una misura quantitativa di un aspetto del servizio. Un **SLO** è il valore obiettivo per quella misura. Un **SLA** è un accordo che prevede conseguenze se l’obiettivo non viene rispettato. Tra team della stessa azienda, quasi sempre bastano SLI e SLO, purché siano scritti e condivisi.

Per i dati di marketing, gli indicatori che contano sono pochi:

- **Completezza**: gli acquisti registrati come eventi, confrontati con gli ordini nel sistema gestionale dello stesso giorno. Il gestionale è la fonte ufficiale; lo scarto tra i due è il primo segnale di un problema nella catena.
- **Freschezza**: a che ora i dati di ieri sono disponibili e stabili nel warehouse.
- **Latenza**: quanto tempo passa tra un evento e la sua disponibilità, per i casi d’uso che richiedono dati rapidi.
- **Validità**: la quota di eventi scartati o segnalati perché non rispettano lo schema.
- **Consenso**: la quota di eventi con consenso pieno, per mercato. Una variazione improvvisa è quasi sempre una modifica a monte, non un cambiamento nel comportamento degli utenti.

Una query di controllo sulla completezza può essere semplice:

```sql
select
  o.order_date,
  o.market,
  count(distinct o.order_id) as ordini_gestionale,
  count(distinct e.order_id) as ordini_tracciati,
  round(100.0 * count(distinct e.order_id) / nullif(count(distinct o.order_id), 0), 1) as completezza_pct
from orders o
left join events_purchase e
  on e.order_id = o.order_id
where o.order_date >= current_date - 14
  and o.channel = 'online'
group by 1, 2
order by 1 desc, 2;
```

Il valore giusto non è il 100%: un utente che rifiuta i cookie o usa un blocco delle pubblicità non verrà tracciato. Il valore giusto è quello stabile. Se un mercato passa in un giorno dall’85% al 60%, qualcosa è cambiato, e lo si scopre il giorno dopo invece che alla riunione mensile.

Quando un indicatore esce dalla soglia, serve un percorso chiaro: chi riceve l’allarme, chi controlla quale pezzo della catena, entro quanto tempo si avvisano gli utenti dei dati. E una volta al mese conviene una breve revisione del servizio con i tre team: gli incidenti del periodo, le cause, cosa si cambia perché non si ripetano. È il momento in cui la catena smette di essere tre servizi separati.

## Prodotti di dati, non richieste

Un rischio di questo ruolo è diventare uno sportello che raccoglie richieste e le gira ad altri team. Funziona meglio pensare in termini di prodotti di dati: insiemi di dati con un nome, un responsabile, una documentazione, un livello di servizio e degli utenti che si possono contare.

“Le performance giornaliere per canale e mercato” è un prodotto. “Il profilo unificato del cliente per l’attivazione delle campagne” è un altro. Ognuno ha i suoi utenti, i suoi requisiti di latenza e qualità, e un valore che si può misurare.

Pensarli come prodotti cambia anche cosa succede dopo il rilascio. Si raccolgono riscontri da chi li usa, si migliorano, e quelli che nessuno usa si ritirano. È lo stesso ragionamento delle [dashboard che nessuno apre](/it/posts/dashboard-inutilizzate/): ogni dataset mantenuto ha un costo, e un dataset che nessuno usa costa senza restituire nulla.

## Le competenze che servono

Chi arriva a questo ruolo viene di solito da una di due strade: il data engineering o l’analisi dei dati di marketing. In entrambi i casi manca qualcosa.

Chi viene dal data engineering conosce pipeline, warehouse e modelli, ma spesso conosce poco gli strumenti martech: come funziona un pixel, cosa fa un SDK in un’app, come un tag manager decide quando far partire un tag, cosa c’è davvero dentro un export di una CDP. Senza queste basi è difficile capire dove si rompe la catena prima di arrivare al warehouse.

Chi viene dal marketing analytics conosce le domande e gli strumenti, ma spesso conosce meno ingestione, schemi e controlli di qualità. Qui non serve diventare data engineer: servono un SQL solido per verificare i dati da soli, un po’ di Python per controlli ed esplorazioni, e abbastanza familiarità con schemi e pipeline da discutere da pari con il team della piattaforma.

Per tutti, poi, c’è la parte che non si impara dalla documentazione: scrivere requisiti chiari, negoziare priorità con team che non dipendono da te, dire di no a una richiesta e spiegare perché. In un ruolo che lavora senza autorità diretta, la credibilità tecnica è ciò che rende possibile l’influenza.

## Un esercizio per cominciare

Scegli un solo numero che il marketing guarda ogni settimana: le conversioni online, per esempio. Poi ricostruisci il suo percorso, dal clic dell’utente fino alla cella della dashboard.

Per ogni passaggio scrivi quattro cose: quale sistema lo gestisce, quale team ne è responsabile, in che formato passa il dato al passaggio successivo, e quale controllo verifica che sia arrivato corretto.

Di solito i passaggi sono tra sei e dieci. E di solito ce n’è almeno uno in cui la colonna dei controlli è vuota, e almeno uno in cui la colonna del responsabile contiene due nomi o nessuno. Quello è il punto in cui la catena si romperà la prossima volta. E quel foglio, una pagina sola, è il primo strumento di lavoro di chi decide di occuparsi della catena intera.

## Fonti

Pagine usate per scrivere e verificare l’articolo (in inglese).

- [[GA4] BigQuery Export](https://support.google.com/analytics/answer/9358801) (Google): le modalità di export giornaliero e in streaming, lo streaming senza obiettivo di completezza e l’aggiornamento delle tabelle giornaliere per i dati in ritardo
- [Consent mode overview](https://developers.google.com/tag-platform/security/concepts/consent-mode) (Google): i parametri di consenso e la differenza tra modalità base e avanzata
- [Service Level Objectives](https://sre.google/sre-book/service-level-objectives/) (Google, *Site Reliability Engineering*): le definizioni di SLI, SLO e SLA
- [JSON Schema](https://json-schema.org/) (JSON Schema): lo standard usato nell’esempio per descrivere e validare gli eventi

## Per approfondire

- [Open Data Contract Standard](https://bitol-io.github.io/open-data-contract-standard/) (Bitol): uno standard aperto per scrivere contratti sui dati tra chi li produce e chi li usa
- [Data Mesh Principles and Logical Architecture](https://martinfowler.com/articles/data-mesh-principles.html) (Zhamak Dehghani): l’idea dei dati come prodotto, con un responsabile e degli utenti
