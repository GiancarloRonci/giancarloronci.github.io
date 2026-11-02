---
title: "Il problema dell’AI sui dati non è scrivere l’SQL: è sapere cosa significa “cliente attivo”"
description: "Chiedere ai dati in linguaggio naturale oggi funziona. Ma se l’azienda non ha deciso cosa significano i suoi numeri, l’AI sceglierà al posto suo, senza dirlo."
date: 2026-11-02
tags: ["AI", "Data Analytics", "Data Governance", "KPI"]
updated: 2026-11-02
draft: false
---

Prendi una domanda semplice: quanti clienti attivi abbiamo?

Falla a tre reparti. Il marketing conta chi ha aperto l’app nell’ultimo mese. Il commerciale conta chi ha un contratto in essere. La finanza conta solo chi ha generato ricavi nel periodo. Arrivano tre numeri diversi, ognuno corretto secondo la propria definizione, e la riunione che doveva servire a decidere qualcosa finisce a discutere quale sia quello giusto.

Chi lavora con i dati conosce bene questa scena. La novità è quello che succede quando la stessa domanda viene fatta a un assistente AI collegato al data warehouse.

## La parte difficile non era l’SQL

Per anni il limite è stato l’accesso: per avere un numero bisognava aspettare un report o passare da chi sapeva scrivere la query. L’AI generativa ha abbassato molto questa barriera. Oggi descrivi la domanda in italiano e in pochi secondi ottieni una query, spesso corretta. È un progresso vero.

Scrivere la query, però, era solo l’ultimo passo. Prima ce n’era un altro, meno visibile: capire cosa intendesse davvero chi faceva la domanda. Un buon analista, davanti a “clienti attivi”, risponde con altre domande. Attivi in che senso? Su quale periodo? A cosa ti serve il numero? Così risolve l’ambiguità prima che diventi un risultato.

Un modello a cui nessuno ha dato questo contesto tende a comportarsi in modo diverso: sceglie l’interpretazione più plausibile in base a quello che trova, come i nomi di tabelle e colonne, e prosegue.

## Due query corrette, due risposte diverse

Immaginiamo una fintech con un’app di pagamenti per i consumatori. Qualcuno chiede all’assistente quanti clienti attivi ci sono, e l’assistente genera questa query:

```sql
select count(distinct customer_id) as active_customers
from fact_transactions
where transaction_date >= current_date - 30;
```

È pulita, leggibile e restituisce 18.400. L’azienda, però, considera attivo soltanto chi ha un contratto aperto e ha fatto almeno un acquisto andato a buon fine, escludendo gli account interni:

```sql
select count(distinct t.customer_id) as active_customers
from fact_transactions t
join dim_customer c on c.customer_id = t.customer_id
where t.transaction_date >= current_date - 30
  and t.transaction_type = 'PURCHASE'
  and t.status = 'SETTLED'
  and c.contract_status = 'ACTIVE'
  and c.is_internal = false;
```

Il risultato è 12.100, circa un terzo in meno. I numeri sono inventati, ma la dinamica è realistica: dentro il primo conteggio finiscono transazioni rifiutate, rimborsi, contratti chiusi e account di test.

Nessuna delle due query contiene errori. Entrambe girano e producono un numero credibile. La differenza sta in una decisione di business che nel database non è scritta da nessuna parte, quindi nessun controllo tecnico può segnalarla.

## Perché con l’AI il problema pesa di più

L’ambiguità esisteva già. Con l’AI cambiano però quattro cose.

- **Aumenta il volume.** Prima i numeri passavano da poche persone. Ora chiunque può produrne decine in un pomeriggio.
- **Sparisce il filtro umano.** L’analista che avrebbe detto “attenzione, quel campo non è affidabile” non è più nel percorso tra la domanda e la risposta.
- **La forma ispira fiducia.** Una risposta ben scritta e sicura di sé invita a controllare meno di un foglio di calcolo pieno di note.
- **La risposta può cambiare.** La stessa domanda, riformulata, può produrre una query diversa e quindi un numero diverso.

Quest’ultimo punto è il più pericoloso. Quando due persone ottengono risultati diversi dallo stesso strumento, non perdono fiducia solo nell’assistente: la perdono nei dati.

## Cosa fare prima di collegare l’AI ai dati

Qui non c’è nulla di nuovo: sono le basi che il nostro mestiere conosce da decenni. È cambiato quanto costa non averle.

1. **Scegli le metriche che contano.** Non serve mappare tutto. Parti da quelle che arrivano alle riunioni di direzione.
2. **Scrivi definizione e responsabile.** Per ogni metrica servono regola di calcolo, inclusioni, esclusioni, periodo e il nome di chi decide. Questo passaggio è organizzativo, non tecnico. Se marketing e finanza hanno bisogno di concetti diversi, vanno bene entrambi, purché abbiano nomi diversi: “utenti attivi in app” e “clienti paganti attivi”.
3. **Dai una data alle definizioni.** Una definizione può cambiare: se a giugno “cliente attivo” passa da 30 a 60 giorni, il confronto con l’anno precedente non regge più, e l’assistente non lo segnala da solo. Ogni versione deve avere una data di validità, così l’assistente sa quale regola applicare a ogni periodo e può avvisare quando un trend attraversa un cambio di definizione.
4. **Rendi le definizioni eseguibili.** Un glossario su una wiki non basta. Le metriche devono vivere in un semantic layer o in viste certificate, così l’assistente usa quella definizione invece di ricostruirla ogni volta.
5. **Cura la qualità dei dati.** Una metrica ben definita su dati incompleti o in ritardo dà un numero sbagliato con grande coerenza. Servono test automatici e controlli sull’aggiornamento dei dati.
6. **Verifica le risposte.** Prepara una serie di domande di prova con il risultato atteso e ripetila a ogni modifica. Fai in modo che l’assistente mostri quale definizione ha usato e la query eseguita, e che chieda un chiarimento quando la domanda è ambigua.
7. **Distingui le risposte certificate da quelle esplorative.** Non tutte le domande richiedono lo stesso rigore. Se la risposta poggia su una metrica certificata, l’assistente lo dichiara. Se sta improvvisando, la segnala come analisi esplorativa, utile per farsi un’idea ma da non portare in direzione. Così l’AI resta utile anche sulle domande non ancora coperte.

## Le domande dicono cosa definire

Un assistente può anche registrare quello che le persone chiedono davvero. Quel registro mostra quali metriche servono, quali termini vengono usati in modi diversi e quali risposte vengono contestate. Se in un mese molte persone chiedono il “churn” e nessuna metrica certificata lo copre, sai qual è la prossima definizione da scrivere.

L’AI, quindi, non dipende soltanto dalla governance: può anche aiutare a orientarla, indicando dove concentrare il lavoro.

## Un test per cominciare

Prima di valutare strumenti e architetture, puoi fare una prova che richiede poco tempo. Prendi le cinque domande che il management pone più spesso e falle separatamente a due analisti, o a un analista e a un assistente AI. Poi confronta sia i numeri sia il modo in cui ci sono arrivati.

Se coincidono, hai una buona base su cui costruire. Se non coincidono, hai appena scoperto da dove partire, e l’AI c’entra poco.

L’AI non elimina il lavoro sui dati. Lo rende più visibile, perché ogni definizione mancata può trasformarsi in una risposta sbagliata davanti a chi deve decidere. Scrivere la query ormai costa poco. Stabilire cosa significano i numeri resta compito dell’azienda.
