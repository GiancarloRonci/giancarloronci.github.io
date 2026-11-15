---
title: "Un prodotto AI non è finito quando funziona: è finito quando cambia una decisione"
description: "Molti progetti di dati e AI si chiudono con un modello accurato e una dashboard pubblicata, e nessuno che li usa. Cosa cambia quando li si tratta come prodotti: partire dalla decisione, misurare l’adozione, progettare la fiducia e la responsabilità fin dall’inizio."
date: 2026-11-15
categories: ["data-strategy", "ai-analytics"]
cover:
  src: "/assets/images/posts/prodotti-dati-ai-adozione.svg"
  alt: "Tre riquadri collegati da frecce: un modello con una curva, una persona davanti a uno schermo e un grafico in crescita con un segno di spunta; il passaggio tra il modello e la persona è tratteggiato"
tags: ["AI", "Data Product", "Data Strategy", "Responsible AI", "Change Management"]
translationKey: "data-ai-products-adoption"
updated: 2026-11-15
draft: false
---

Il modello di previsione della domanda era buono. Sui dati di test sbagliava in media del 9%, contro il 22% del metodo usato fino ad allora. Il team dati lo aveva costruito in quattro mesi, validato con cura e messo in produzione. Ogni mattina, alle sei, le previsioni per le due settimane successive arrivavano puntuali in una tabella del data warehouse e in una dashboard dedicata.

Sei mesi dopo, chi pianificava gli acquisti continuava a lavorare con il proprio foglio Excel. La dashboard veniva aperta un paio di volte a settimana, quasi sempre dalla stessa persona del team dati, per controllare che funzionasse.

Nessuno aveva sbagliato qualcosa di tecnico. Il progetto era finito quando il modello funzionava. Ma un modello che funziona e che nessuno usa non produce nessun valore: produce un costo.

## Progetto o prodotto

La differenza tra le due cose sta in quando si considerano finite.

Un **progetto** finisce con un rilascio. Ha una data di consegna, un perimetro, un collaudo. Quando il modello è in produzione e la dashboard è pubblicata, il team passa al progetto successivo.

Un **prodotto** finisce quando qualcuno lo usa per fare meglio il proprio lavoro, e in realtà non finisce mai del tutto: ha utenti, un responsabile, delle metriche di utilizzo, una manutenzione, e prima o poi un ritiro. Il rilascio è l’inizio della parte che conta.

Trattare i dati e l’AI come prodotti non è una questione di etichette. Cambia le domande che si fanno all’inizio, quello che si misura alla fine e chi ne risponde nel mezzo.

## Partire dalla decisione, non dal dato

Quasi tutti i progetti di dati partono da una disponibilità: abbiamo questi dati, abbiamo questa piattaforma, abbiamo questo modello, cosa possiamo farci? È un punto di partenza comprensibile, ma porta a costruire cose interessanti invece che cose utili.

Un prodotto dati o AI serve a migliorare una decisione. Prima di scrivere una riga di codice, conviene rispondere a cinque domande:

1. **Quale decisione?** Una sola, descritta in modo concreto: “quanta merce ordinare per ogni sede, ogni lunedì”, non “ottimizzare gli acquisti”.
2. **Chi la prende?** Con nome e ruolo. Quante persone sono, che strumenti usano, quanto tempo hanno.
3. **Quando?** Ogni giorno, ogni settimana, una volta al trimestre. Una previsione perfetta che arriva dopo la riunione in cui si decide non serve a niente.
4. **Come la prende oggi?** Con quali dati, quali regole empiriche, quali strumenti. Il foglio Excel che il prodotto dovrebbe sostituire contiene spesso conoscenze che nessuno ha documentato.
5. **Cosa cambia se la decisione migliora?** Meno sprechi, meno rotture di stock, meno ore di lavoro. È l’ipotesi di valore, e va scritta prima, con un ordine di grandezza, non dopo, per giustificare il lavoro fatto.

Nell’esempio iniziale, la quarta domanda avrebbe cambiato il progetto. Chi pianificava gli acquisti non usava solo lo storico delle vendite: sapeva quali eventi in calendario avrebbero spostato la domanda, quale fornitore consegnava in ritardo, quale sede aveva il magazzino piccolo. Il modello non conosceva nessuna di queste cose, e chi decideva lo sapeva. Per questo non si fidava.

## Tre livelli da misurare

Un prodotto dati o AI si misura su tre livelli diversi, e quasi sempre se ne misura solo il primo.

| Livello | Domanda | Esempi di misura |
| --- | --- | --- |
| Funziona | Il prodotto fa quello che promette? | Accuratezza, freschezza dei dati, tempi di risposta, disponibilità |
| Viene usato | Le persone lo usano nella decisione? | Utenti attivi rispetto agli utenti previsti, decisioni prese con il prodotto, quota di suggerimenti accettati |
| Produce valore | La decisione è migliorata? | Sprechi, margine, tempo risparmiato, errori evitati, rispetto al punto di partenza |

I tre livelli dipendono l’uno dall’altro nell’ordine, ma non si implicano. Un modello accurato può non essere usato. Un modello usato può non produrre valore, se migliora una decisione che pesava poco. Per questo l’ipotesi di valore scritta all’inizio è importante: alla fine permette di dire se il prodotto ha funzionato davvero, non solo tecnicamente.

C’è anche una conseguenza pratica. Se l’utilizzo si misura, i prodotti che non vengono usati si vedono, e si possono migliorare o spegnere. È lo stesso ragionamento che vale per le [dashboard che nessuno apre](/it/posts/dashboard-inutilizzate/): ciò che non si misura si accumula.

## L’adozione si progetta

L’adozione non è una fase che arriva dopo il rilascio, con una sessione di formazione e una email di annuncio. Si progetta insieme al prodotto, e dipende da poche scelte.

- **Stare dentro il flusso di lavoro.** Se chi decide lavora nel gestionale, la previsione deve comparire nel gestionale, accanto al campo in cui inserisce l’ordine. Ogni strumento in più da aprire è un motivo per non farlo.
- **Spiegare, non solo prevedere.** Un numero senza motivazione chiede un atto di fede. Un numero accompagnato da “più 18% rispetto alla settimana scorsa, per l’evento in calendario di sabato” può essere valutato da chi conosce il contesto.
- **Permettere di correggere.** Chi decide deve poter cambiare il suggerimento, e il prodotto deve registrare la correzione e il motivo. Le correzioni non sono un fallimento del modello: sono la fonte più preziosa di informazioni per migliorarlo, e spesso contengono proprio le conoscenze che mancavano.
- **Affiancare prima di sostituire.** Per qualche settimana il vecchio metodo e il nuovo lavorano in parallelo, e i risultati si confrontano in modo trasparente. La fiducia nasce dal vedere il prodotto avere ragione, e dal vederlo ammettere quando ha torto.
- **Coinvolgere chi lo userà, dall’inizio.** Una o due persone tra gli utenti futuri partecipano alla progettazione, provano le versioni intermedie e diventano il riferimento per i colleghi. Un prodotto costruito “per” qualcuno viene accolto peggio di uno costruito “con” qualcuno.

Nessuna di queste scelte è tecnicamente difficile. Sono difficili perché richiedono tempo da parte del business, e quel tempo va chiesto e pianificato come qualsiasi altra risorsa del progetto.

## La responsabilità non è un controllo finale

Con l’AI, alle domande sul valore se ne aggiungono altre: su quali dati è stato addestrato il modello, cosa succede quando sbaglia, chi ne risponde. In molte organizzazioni queste domande arrivano alla fine, sotto forma di revisione da parte di legale, privacy o compliance, quando il prodotto è già costruito e cambiarlo costa molto.

Funziona meglio trattarle come requisiti, alla pari delle funzionalità. Prima di iniziare lo sviluppo, per ogni prodotto AI servono risposte scritte ad alcune domande:

1. **Quali dati usa, e possiamo usarli per questo scopo?** Dati personali, dati di terzi, dati sensibili: ognuno ha regole proprie.
2. **Quanto pesa un errore?** Un suggerimento sbagliato sulle quantità da ordinare costa qualche spreco; una decisione sbagliata su un cliente o su un dipendente può costare molto di più. L’AI Act europeo segue la stessa logica e classifica i sistemi in base al livello di rischio.
3. **Chi decide alla fine?** Il livello di supervisione umana va proporzionato al rischio: per alcune decisioni basta un controllo a campione, per altre serve una persona che approva ogni caso.
4. **Come ci accorgiamo che sta peggiorando?** I modelli si degradano quando il mondo cambia. Servono soglie e allarmi sulle prestazioni, e un responsabile che li riceve.
5. **Chi ne risponde?** Una persona di business, non solo il team tecnico, come per qualsiasi altro [dato che conta](/it/posts/data-governance-chi-decide/).

Fatte all’inizio, queste domande rallentano poco e spesso migliorano il prodotto. Fatte alla fine, bloccano i rilasci o, peggio, vengono aggirate.

## La piattaforma come fondamenta, non come obiettivo

Piattaforme dati moderne, strumenti di BI, ambienti per il machine learning: senza fondamenta solide, ogni prodotto ricostruisce da zero l’accesso ai dati, la loro pulizia e le definizioni delle metriche. Ma la piattaforma non è il risultato. È ciò che rende il secondo prodotto più veloce del primo, e il decimo più veloce del secondo.

Un buon criterio è chiedere a ogni prodotto di lasciare la piattaforma un po’ migliore di come l’ha trovata: una sorgente dati in più, integrata e controllata; una metrica [definita una volta](/it/posts/definire-una-metrica/) e resa riusabile; un componente che il prossimo team non dovrà riscrivere. Così la modernizzazione avanza insieme ai casi d’uso, e ogni investimento sulla piattaforma ha un utente che lo giustifica.

Il percorso opposto, prima la piattaforma completa e poi i casi d’uso, è più ordinato sulla carta e più rischioso nella realtà: richiede anni prima di mostrare un risultato, e nel frattempo il business si abitua a farne a meno.

## Il lavoro di traduzione

Tutto questo richiede qualcuno che parli entrambe le lingue. Da una parte deve capire una decisione di business abbastanza bene da trasformarla in requisiti; dall’altra deve conoscere dati, architetture e modelli abbastanza bene da sapere cosa è fattibile, quanto costa e dove sono i rischi.

È un ruolo che prende nomi diversi a seconda delle aziende: data product owner, AI & data manager, analytics translator. Il nome conta poco. Contano tre responsabilità:

- **Scegliere su cosa lavorare.** Le richieste sono sempre più delle capacità del team. Ordinarle per valore atteso e fattibilità, e dire di no a quelle che non reggono il confronto, è la parte più importante e meno visibile del lavoro.
- **Tenere insieme le persone.** Business, team dati, IT, fornitori esterni, legale e compliance hanno priorità diverse. Il prodotto va avanti solo se qualcuno le allinea.
- **Rispondere del risultato, non del rilascio.** Il lavoro non finisce con la messa in produzione, ma quando i tre livelli di misura dicono che il prodotto funziona, viene usato e produce valore.

## Un test per cominciare

Prendi l’elenco dei prodotti dati e AI rilasciati dalla tua organizzazione negli ultimi due anni: modelli, dashboard, assistenti, automazioni. Per ognuno, prova a scrivere tre cose:

- la decisione che dovrebbe migliorare, in una frase;
- quante persone lo usano ogni settimana, rispetto a quante dovrebbero usarlo;
- cosa è cambiato, in numeri, da quando è in produzione.

Le righe che riesci a compilare tutte sono i tuoi prodotti. Le altre sono progetti finiti: forse ben fatti, ma ancora in attesa di produrre il valore per cui erano stati costruiti. Ed è da lì che conviene ripartire, prima di avviarne di nuovi.

## Per approfondire

Letture utili sui temi dell’articolo (in inglese, tranne il testo dell’AI Act).

- [Data Mesh Principles and Logical Architecture](https://martinfowler.com/articles/data-mesh-principles.html) (Zhamak Dehghani): il principio dei dati gestiti come prodotto, con utenti, responsabili e qualità garantita
- [Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml) (Google): indicazioni pratiche per portare modelli in produzione, a partire dalla scelta di cosa misurare
- [AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) (NIST): un quadro per identificare e gestire i rischi dei sistemi AI lungo tutto il ciclo di vita
- [Regolamento (UE) 2024/1689, AI Act](https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32024R1689) (EUR-Lex): il testo europeo che classifica i sistemi AI in base al rischio
