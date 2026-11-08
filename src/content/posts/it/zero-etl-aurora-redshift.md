---
title: "Zero-ETL tra Amazon Aurora e Amazon Redshift: cosa fa davvero, e cosa resta da fare a te"
description: "L’integrazione zero-ETL porta i dati di Aurora in Redshift in pochi secondi, senza pipeline da scrivere. Come funziona, come si configura, quali limiti ha e perché non elimina il lavoro di modellazione dei dati."
date: 2026-11-08
categories: ["data-architecture", "data-engineering"]
cover:
  src: "/assets/images/posts/zero-etl-aurora-redshift.svg"
  alt: "Un database operazionale a sinistra e un data warehouse a destra, collegati da un flusso diretto di dati senza passaggi intermedi"
tags: ["Zero-ETL", "Amazon Aurora", "Amazon Redshift", "CDC", "AWS", "Data Warehouse"]
updated: 2026-11-08
draft: false
---

Chi ha costruito almeno una volta una pipeline dal database applicativo al data warehouse conosce la sequenza. Un servizio di Change Data Capture legge i log del database. Un broker di messaggi o un bucket S3 fa da appoggio. Un job, schedulato o in streaming, prende i file e li carica con un `COPY`. Un altro job fa il merge degli aggiornamenti e delle cancellazioni nelle tabelle finali. E intorno a tutto questo ci sono monitoraggio, gestione degli errori, riprocessamenti, e qualcuno reperibile quando una colonna cambia tipo alle tre di notte.

Ogni pezzo ha senso preso da solo. Messi in fila, sono una piccola piattaforma da mantenere solo per spostare dati che esistono già, da un sistema all’altro, senza cambiarli.

L’integrazione **zero-ETL tra Amazon Aurora e Amazon Redshift** nasce per togliere di mezzo proprio quella piattaforma. In un [articolo precedente](/it/posts/data-warehouse-near-real-time/) l’ho citata come uno dei motivi per cui oggi un data warehouse aggiornato in pochi secondi non è più un lusso. Qui la guardiamo da vicino: cosa fa, come si configura, dove si ferma.

## Cos’è, in una frase

È una replica gestita da AWS che copia in continuo le tabelle di un cluster Aurora (MySQL o PostgreSQL) in un database Redshift, con un ritardo tipico di pochi secondi, senza che tu debba scrivere, schedulare o monitorare una pipeline.

Il nome è un po’ promozionale, e conviene leggerlo bene. “Zero-ETL” non significa che non ci sia più nessuna trasformazione. Significa che sparisce la parte **E** e **L**, l’estrazione e il caricamento, cioè il pezzo meno interessante e più fragile del lavoro. La **T** resta tutta: la modellazione, le regole di business, le metriche. Semplicemente si sposta dentro Redshift, dove i dati sono già arrivati.

Oltre ad Aurora, la stessa famiglia di integrazioni copre oggi anche RDS for MySQL, DynamoDB e alcune applicazioni SaaS. I principi sono gli stessi; qui mi concentro su Aurora, che è il caso più comune.

## Come funziona

Quando crei l’integrazione succedono due cose, in sequenza.

La prima è il **caricamento iniziale**. AWS esporta lo stato attuale delle tabelle scelte e lo carica in Redshift. Su database di qualche terabyte può richiedere un po’ di tempo, ma avviene senza bloccare il database sorgente.

La seconda è la **replica continua**. Da quel momento ogni inserimento, modifica e cancellazione viene letta dai log delle transazioni di Aurora e applicata in Redshift. Su Aurora MySQL si usa il binlog in una versione ottimizzata (*enhanced binlog*); su Aurora PostgreSQL la replica logica. In entrambi i casi la lettura avviene a livello di storage, con un impatto molto contenuto sulle prestazioni del cluster che serve l’applicazione.

Lato Redshift, i dati atterrano in un database dedicato, creato a partire dall’integrazione. Le tabelle mantengono nomi e struttura di quelle sorgente, e anche molti cambiamenti di schema (una colonna aggiunta, una tabella nuova) vengono propagati in automatico.

Un dettaglio importante: quel database è **in sola lettura**. Non puoi scriverci, aggiungere colonne calcolate o creare oggetti al suo interno. È uno specchio della sorgente, e deve restare tale. Tutto il lavoro di trasformazione avviene in altri database del data warehouse, che leggono da questo con query cross-database.

## Prerequisiti e configurazione

La configurazione non è complicata, ma ha alcuni passaggi che, se dimenticati, fanno fallire la creazione dell’integrazione con messaggi non sempre chiarissimi.

**Sul cluster Aurora** serve un parameter group dedicato con la replica abilitata. Per Aurora MySQL i parametri principali sono:

```text
aurora_enhanced_binlog      = 1
binlog_format               = ROW
binlog_row_image            = full
binlog_row_metadata         = full
binlog_backup               = 0
binlog_replication_globaldb = 0
```

Per Aurora PostgreSQL l’equivalente è:

```text
rds.logical_replication             = 1
aurora.enhanced_logical_replication = 1
aurora.logical_replication_backup   = 0
aurora.logical_replication_globaldb = 0
```

Dopo la modifica serve un riavvio del cluster, da pianificare in una finestra di manutenzione.

**Sul data warehouse** la destinazione può essere Redshift Serverless o un cluster provisioned con nodi RA3 cifrato. Va attivato il parametro `enable_case_sensitive_identifier`, perché MySQL e PostgreSQL distinguono maiuscole e minuscole nei nomi e Redshift, di default, no. Infine bisogna autorizzare l’integrazione con una *resource policy* sul namespace Redshift, che indica quale cluster Aurora può scriverci e quale account può creare l’integrazione.

**L’integrazione** si crea dalla console di RDS, dalla CLI o con infrastructure as code (CloudFormation e Terraform la supportano). In questa fase si definiscono anche i **filtri sui dati**: quali database e quali tabelle includere o escludere. È un passaggio da non sottovalutare, come vedremo tra poco.

**Il database di destinazione**, infine, si crea in Redshift con un comando SQL:

```sql
-- Aurora MySQL
CREATE DATABASE aurora_sales FROM INTEGRATION '<integration_id>';

-- Aurora PostgreSQL: va indicato anche il database sorgente
CREATE DATABASE aurora_sales FROM INTEGRATION '<integration_id>' DATABASE sales;
```

Da quel momento le tabelle compaiono in Redshift e iniziano ad allinearsi.

## Cosa arriva, e cosa no

Qui sta la parte che conviene conoscere prima di promettere qualcosa al business.

**Serve una chiave primaria.** Le tabelle senza primary key non vengono replicate: restano in uno stato di errore e non compaiono in Redshift. Nei database applicativi più vecchi capita più spesso di quanto si pensi, soprattutto per tabelle di log o di relazione. Vale la pena fare un censimento prima di partire.

**Non tutti i tipi di dato sono supportati allo stesso modo.** La maggior parte delle colonne si mappa senza problemi; alcuni tipi particolari e i valori molto grandi (testi o blob oltre i limiti di Redshift) possono essere convertiti o causare problemi sulla singola tabella. La documentazione AWS ha una tabella di corrispondenza aggiornata, da controllare sullo schema reale.

**I cambiamenti di schema vengono propagati, non tutti allo stesso modo.** Aggiungere una colonna è indolore. Altre modifiche più invasive possono portare a una nuova sincronizzazione completa della tabella interessata, durante la quale i dati di quella tabella non sono aggiornati.

**I filtri decidono cosa entra nel data warehouse.** Senza filtri l’integrazione replica tutto, comprese tabelle tecniche, code applicative e dati che nel data warehouse non servono o non dovrebbero proprio stare. Con un filtro come `include: sales.*, exclude: sales.audit_log` si porta solo ciò che serve. È anche il primo strumento di governance: un dato che non viene replicato non deve essere protetto a valle.

**I dati sensibili arrivano così come sono.** L’integrazione non maschera, non pseudonimizza e non cifra i singoli campi. Se nella tabella clienti ci sono codici fiscali, IBAN o indirizzi email, arrivano in Redshift in chiaro. La protezione va costruita sul data warehouse, con permessi sul database replicato, dynamic data masking e row-level security sugli oggetti che gli utenti interrogano davvero. Va progettata prima di aprire l’accesso, non dopo.

## Dopo l’atterraggio: la T resta tua

Avere le tabelle applicative in Redshift aggiornate in pochi secondi è un ottimo punto di partenza, ma non è un data warehouse. Le tabelle sorgente sono modellate per far funzionare un’applicazione: normalizzate, con codici al posto delle descrizioni, stati espressi come numeri, logiche di business distribuite nel codice e non nei dati. Dare queste tabelle direttamente agli analisti significa spostare su ognuno di loro il lavoro di interpretazione, con risultati inevitabilmente diversi.

Il modello che funziona meglio è usare il database replicato come **livello bronze** di una medallion architecture, e costruirci sopra gli altri livelli.

- **Viste materializzate con aggiornamento automatico.** Redshift supporta l’auto refresh e, per molte query, l’aggiornamento incrementale anche sulle tabelle alimentate da zero-ETL. È il modo più diretto per mantenere un livello silver o gold fresco quasi quanto la sorgente, senza scheduler esterni.
- **Strumenti di trasformazione come dbt.** Funzionano normalmente: leggono dal database replicato e scrivono in un database separato. Conviene scegliere con attenzione la frequenza, perché un modello aggiornato ogni ora annulla il vantaggio di una replica che arriva in pochi secondi.
- **History mode.** Per impostazione predefinita la replica mostra solo lo stato attuale delle righe: se un cliente cambia indirizzo, il vecchio valore sparisce. Attivando l’*history mode* su tabelle specifiche, Redshift conserva ogni versione di ogni riga con le date di validità, in pratica una slowly changing dimension di tipo 2 gestita dalla piattaforma. Per anagrafiche e stati che servono a ricostruire il passato è una funzionalità preziosa.
- **Intervallo di aggiornamento.** Con `ALTER DATABASE ... INTEGRATION SET REFRESH_INTERVAL` si può decidere ogni quanti secondi applicare le modifiche in Redshift. Allungarlo riduce il consumo di calcolo quando i pochi secondi non servono davvero.

In altre parole, zero-ETL toglie il lavoro idraulico, non quello di progettazione. Chi lo adotta pensando di poter fare a meno della modellazione dei dati ottiene un data warehouse velocissimo e difficile da usare.

## Monitoraggio

Un’integrazione gestita è più semplice da gestire, ma non si gestisce da sola. Il punto più delicato è che i problemi tendono a essere silenziosi: una tabella in errore smette di aggiornarsi mentre tutte le altre continuano, e le dashboard che la usano mostrano dati vecchi senza alcun segnale evidente.

Gli strumenti per accorgersene ci sono.

- In Redshift, le viste di sistema `SVV_INTEGRATION`, `SVV_INTEGRATION_TABLE_STATE` e `SYS_INTEGRATION_ACTIVITY` mostrano lo stato dell’integrazione, lo stato di ogni singola tabella e le attività di sincronizzazione.
- In CloudWatch ci sono metriche sulla latenza della replica e sul numero di tabelle replicate o in errore, su cui impostare allarmi.
- Gli eventi di RDS segnalano le variazioni di stato dell’integrazione stessa.

Il consiglio pratico è trattare la latenza come un indicatore di servizio: una soglia chiara (per esempio cinque minuti), un allarme quando viene superata, e un controllo periodico che nessuna tabella sia finita in stato di errore. Se il business si abitua a dati di pochi secondi fa, un ritardo di un’ora è un incidente e va trattato come tale.

## Costi

AWS non fa pagare l’integrazione in sé. Si pagano le risorse che usa: lato Aurora, l’I/O e lo storage legati alla lettura delle modifiche e al caricamento iniziale; lato Redshift, il calcolo necessario ad applicarle e lo storage dei dati replicati.

La voce da tenere d’occhio è soprattutto la seconda. Con Redshift Serverless un flusso continuo di modifiche tiene il data warehouse attivo molto più spesso di un caricamento notturno, e la bolletta lo riflette. È un costo da confrontare con quello che sostituisce: i servizi di CDC, i job di caricamento, lo storage intermedio e, soprattutto, le ore di lavoro spese a mantenere tutto in piedi. Nella mia esperienza il confronto è quasi sempre favorevole, ma va fatto con i numeri reali, non con quelli della presentazione.

## Quando non basta

Zero-ETL è la scelta giusta per un caso molto preciso: portare tabelle di un database AWS in Redshift, uguali a come sono, il più in fretta possibile. Fuori da quel perimetro, servono altri strumenti.

- **Trasformazioni durante il trasferimento.** Se i dati vanno arricchiti, filtrati per riga o anonimizzati prima di arrivare nel data warehouse, zero-ETL non lo permette. Servono AWS DMS, Glue o una pipeline di streaming.
- **Sorgenti fuori da AWS o non supportate.** Un database on-premise o di un altro cloud richiede una soluzione di CDC tradizionale.
- **Destinazioni diverse da Redshift.** Se l’architettura è centrata su un lakehouse con Apache Iceberg su S3, ci sono integrazioni zero-ETL anche verso SageMaker Lakehouse, ma con caratteristiche diverse da valutare a parte.
- **Eventi e non tabelle.** Clickstream, dati IoT o eventi applicativi non stanno in un database relazionale. Per quelli Redshift offre lo *streaming ingestion* da Kinesis e Kafka, che si affianca bene a zero-ETL.

Nella pratica le architetture mature usano entrambi i mondi: zero-ETL per i database operazionali, che sono la maggioranza dei casi, e pipeline dedicate solo dove servono davvero.

## Come iniziare

Se stai valutando zero-ETL, ecco un percorso che riduce le sorprese.

1. **Scegli un dominio con un caso d’uso concreto**, dove pochi secondi di latenza cambiano una decisione: pagamenti, ordini, operatività. Non partire da “replichiamo tutto”.
2. **Censisci le tabelle**: chiavi primarie mancanti, tipi di dato particolari, colonne con dati sensibili.
3. **Definisci i filtri** in modo che nel data warehouse entri solo ciò che serve.
4. **Prepara la protezione dei dati** su Redshift prima di dare accesso agli utenti.
5. **Costruisci il livello di modellazione** con viste materializzate o dbt, e decidi dove serve l’history mode.
6. **Imposta il monitoraggio** di latenza e stato delle tabelle, con allarmi e un responsabile.
7. **Misura**: quante pipeline sono state spente, quante query sui database di produzione sono sparite, quanto è sceso il tempo tra un evento e la sua comparsa in una dashboard.

## Meno idraulica, più progettazione

Per anni una parte importante del lavoro dei team dati è stata spostare dati da un posto all’altro, e tenere in piedi i meccanismi che lo facevano. Era un lavoro necessario, ma generava poco valore in sé e assorbiva molta attenzione.

L’integrazione zero-ETL tra Aurora e Redshift sposta quel lavoro sulla piattaforma. Il tempo che si libera non va considerato un risparmio da incassare, ma un’occasione da reinvestire dove il valore si crea davvero: nella modellazione dei dati, nella definizione delle metriche, nella qualità e nella governance. In altre parole, nella T, che resta tua.
