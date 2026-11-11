---
title: "Come si scrive la definizione di una metrica (e perché “fatturato” non basta)"
description: "Un nome non è una definizione. Le parti che una definizione deve avere per essere usata da persone, report e assistenti AI senza ambiguità: cosa include, a quale data si riferisce, come si somma, da dove si prende e chi la può cambiare."
date: 2026-11-11
categories: ["metadata-semantic-layer", "data-governance"]
cover:
  src: "/assets/images/posts/definire-una-metrica.svg"
  alt: "Tre schede con lo stesso titolo e tre numeri diversi convergono su una sola scheda di definizione, ordinata in righe, da cui esce un unico numero"
tags: ["Metriche", "Semantic Layer", "Data Governance", "KPI"]
translationKey: "how-to-define-a-metric"
updated: 2026-11-11
draft: false
---

In quasi tutte le aziende c’è una metrica che tutti nominano e che nessuno ha mai scritto per intero. Di solito è il fatturato. Il commerciale lo legge nel CRM, l’amministrazione nel gestionale, il marketing nella dashboard dell’e-commerce. Si chiama allo stesso modo in tutti e tre i posti, e in tutti e tre i posti ha un valore diverso.

Nessuno dei tre sbaglia il calcolo. Ognuno calcola una cosa diversa, con lo stesso nome. Il problema non sta nell’SQL: sta nel fatto che la metrica ha un nome, ma non ha una definizione.

## Un nome non è una definizione

“Fatturato del mese” sembra chiaro finché non si prova a calcolarlo. A quel punto arrivano le domande.

- Si conta l’ordine quando viene fatto, quando viene spedito o quando viene fatturato?
- I resi si tolgono? Quelli del mese, o quelli relativi agli ordini del mese?
- Gli importi sono con o senza IVA? Con o senza spese di spedizione?
- Gli ordini in valuta estera si convertono al cambio di quale giorno?
- Il mese finisce a mezzanotte di quale fuso orario?

Ognuna di queste domande ha più di una risposta ragionevole. Se nessuno le sceglie, le sceglie chi scrive la query, ogni volta, spesso senza accorgersene. Ed è così che nascono tre fatturati.

Lo stesso vale per qualunque metrica: clienti attivi, tasso di conversione, margine, churn. Ne ho scritto a proposito dell’AI che interroga i dati in linguaggio naturale, nell’articolo sul [“cliente attivo”](/it/posts/ai-active-customer/): un assistente AI davanti a una metrica senza definizione non si ferma a chiedere, sceglie una versione plausibile e la presenta con sicurezza.

## Le parti di una definizione

Una definizione utile non è un paragrafo di testo libero. È una scheda con poche voci fisse, sempre le stesse, che obbligano a rispondere alle domande che contano.

1. **Nome e descrizione.** Un nome univoco e una frase che dice a quale domanda di business risponde. Se due metriche rispondono a domande diverse, devono avere due nomi diversi: “ordinato” e “fatturato”, non due “fatturati”.
2. **Formula in parole.** Il calcolo scritto in modo che lo capisca chi non conosce le tabelle: “somma degli importi netti delle fatture emesse, meno le note di credito emesse nello stesso periodo”.
3. **Cosa include e cosa esclude.** L’elenco esplicito dei casi di confine: resi, ordini annullati, ordini di prova, clienti interni, omaggi. È la parte più lunga, ed è quella che evita più discussioni.
4. **Data di riferimento.** Quale data colloca un evento in un periodo: la data dell’ordine, della spedizione, della fattura. Con il fuso orario e, se serve, la regola di conversione delle valute.
5. **Grana e dimensioni.** A quale livello di dettaglio la metrica ha senso, e per quali dimensioni la si può scomporre: mercato, canale, categoria di prodotto. Non tutte le scomposizioni sono legittime.
6. **Come si aggrega.** Se la metrica si può sommare tra periodi e tra gruppi, oppure no. Su questo punto torno tra poco, perché è il più sottovalutato.
7. **Fonte ufficiale.** La tabella, la vista o la metrica nel semantic layer da cui il numero va preso. Una sola.
8. **Freschezza.** Ogni quanto si aggiorna, e da quando un periodo si considera chiuso. Il fatturato di ieri, letto stamattina, può ancora cambiare?
9. **Responsabile.** La persona di business che risponde del significato della metrica e che approva le modifiche. Con nome e cognome, come ho scritto parlando di [data governance](/it/posts/data-governance-chi-decide/).
10. **Storico delle modifiche.** Cosa è cambiato, quando e perché. Una metrica la cui definizione cambia senza traccia produce serie storiche che sembrano confrontabili e non lo sono.

Dieci voci possono sembrare molte. In pratica, per una metrica ben capita, la scheda si compila in mezz’ora. Per una metrica che genera discussioni, la mezz’ora diventa una riunione: ed è esattamente la riunione che serviva.

## Un esempio compilato

Ecco come potrebbe apparire la scheda del fatturato per un’azienda che vende online e nei negozi.

| Voce | Valore |
| --- | --- |
| Nome | Fatturato netto |
| Domanda | Quanto abbiamo venduto nel periodo, al netto di resi e IVA? |
| Formula | Somma degli imponibili delle fatture emesse nel periodo, meno gli imponibili delle note di credito emesse nel periodo |
| Include | Vendite online e nei negozi, spese di spedizione addebitate |
| Esclude | IVA, ordini annullati prima della fattura, vendite a dipendenti, ordini di test |
| Data di riferimento | Data della fattura o della nota di credito, fuso orario Europe/Rome |
| Valute | Convertite in euro al cambio BCE del giorno della fattura |
| Dimensioni ammesse | Mercato, canale, categoria di prodotto, punto vendita |
| Aggregazione | Additiva: si somma tra giorni, mercati e canali |
| Fonte ufficiale | Metrica `fatturato_netto` nel semantic layer |
| Freschezza | Aggiornato ogni mattina alle 7; mese chiuso il terzo giorno lavorativo del mese successivo |
| Responsabile | Responsabile amministrazione |
| Ultima modifica | Spese di spedizione incluse dal 1° gennaio, per allineare il dato al bilancio |

Con questa scheda, la differenza tra il fatturato del CRM e quello del gestionale smette di essere un mistero. Il CRM conta gli ordini alla firma, il gestionale le fatture: sono due metriche diverse, e da oggi possono avere due nomi diversi.

## Il punto più sottovalutato: come si somma

Molti errori nei report non vengono da una definizione sbagliata, ma da un’aggregazione sbagliata. Le metriche non si comportano tutte allo stesso modo quando si sommano.

- **Additive.** Il fatturato netto si può sommare su tutto: il fatturato del trimestre è la somma dei tre mesi, quello totale è la somma dei mercati.
- **Semi-additive.** Il saldo di un conto o le giacenze di magazzino si sommano tra conti o tra magazzini, ma non nel tempo. Le giacenze di fine trimestre non sono la somma delle giacenze di fine mese.
- **Non additive.** Rapporti, percentuali e conteggi distinti non si sommano mai. Il tasso di conversione di due mercati non è la media dei due tassi. I clienti attivi del trimestre non sono la somma dei clienti attivi dei tre mesi, perché lo stesso cliente può comparire in tutti e tre.

Per le metriche non additive, la definizione deve dire come si ricalcolano a ogni livello. Il tasso di conversione si calcola dividendo la somma delle conversioni per la somma delle visite del gruppo, non facendo la media dei tassi. Se la definizione non lo dice, prima o poi qualcuno trascinerà la colonna in un foglio di calcolo e farà la media.

## Dalla scheda al codice

Una definizione che vive solo in un documento viene dimenticata alla prima riorganizzazione. Il passo successivo è far sì che la scheda diventi codice, in un posto solo.

È il compito del **semantic layer**: uno strato tra il data warehouse e gli strumenti che lo usano, in cui ogni metrica è definita una volta, con la sua formula, le sue dimensioni e il suo modo di aggregarsi. Report, fogli di calcolo e assistenti AI chiedono la metrica per nome, e il semantic layer genera ogni volta l’SQL corretto. Esistono diversi strumenti che fanno questo lavoro, dal semantic layer di dbt a LookML in Looker, fino ai modelli semantici degli strumenti di BI.

Lo strumento conta meno della disciplina. Alcune voci della scheda finiscono nel codice: formula, dimensioni, aggregazione, fonte. Altre restano testo: domanda di business, casi di confine, responsabile, storico. La cosa importante è che le due parti stiano insieme e che si cambino insieme.

## Quando la definizione cambia

Le definizioni cambiano, ed è normale: cambia il modello di business, cambia una regola contabile, si scopre un caso di confine che nessuno aveva previsto. Il problema non è il cambiamento, ma il cambiamento silenzioso.

Tre regole bastano a gestirlo.

- **Ogni modifica ha un responsabile che la approva** e una data da cui vale.
- **Chi usa la metrica viene avvisato prima**, non quando nota che i numeri sono cambiati.
- **Lo storico si tratta in modo esplicito.** O si ricalcola il passato con la nuova definizione, o si segna nei report il punto in cui la serie cambia. Quello che non si fa è lasciare una serie che cambia significato a metà senza dirlo.

## Un esercizio per cominciare

Scegli la metrica più citata nelle riunioni della tua azienda. Prova a compilare la scheda da solo, voce per voce, senza chiedere a nessuno.

Le voci in cui ti trovi a scrivere “dipende” o “credo” sono il punto di partenza. Porta la scheda a due persone che usano quella metrica in reparti diversi e chiedi loro di correggerla. Se le correzioni non coincidono, hai trovato due metriche con lo stesso nome. Ed è molto meglio scoprirlo con una scheda in mano che in una riunione di budget.

## Per approfondire

Letture utili sui temi dell’articolo (in inglese).

- [Additive, Semi-Additive, and Non-Additive Facts](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/additive-semi-additive-non-additive-fact/) (Kimball Group): la classificazione delle misure in base a come si possono sommare
- [dbt Semantic Layer](https://docs.getdbt.com/docs/use-dbt-semantic-layer/dbt-sl) (dbt Labs): un esempio di semantic layer in cui le metriche sono definite una volta e riusate dagli strumenti
- [Measure types](https://cloud.google.com/looker/docs/reference/param-measure-types) (Google Cloud): come Looker distingue somme, medie, conteggi distinti e misure calcolate
