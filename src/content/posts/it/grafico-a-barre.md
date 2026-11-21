---
title: "Il grafico a barre: le regole di base, le varianti e i concetti avanzati"
description: "Il grafico più usato nella Business Intelligence è anche quello che si sbaglia più spesso. Barre o colonne, ordinamento, asse da zero, serie raggruppate e in pila, barre divergenti, bullet chart, Pareto, lollipop e small multiples: quando usare ciascuna variante e perché."
date: 2026-11-21
categories: ["bi-analytics"]
cover:
  src: "/assets/images/posts/grafico-a-barre.svg"
  alt: "Colonne grigie in disordine diventano barre orizzontali ordinate, con la prima evidenziata e una tacca arancione per l’obiettivo su ciascuna"
tags: ["Data Visualization", "Grafici", "Dashboard", "Reporting"]
translationKey: "bar-chart"
updated: 2026-11-21
draft: false
---

Se si apre una dashboard aziendale qualunque, la probabilità di trovarci un grafico a barre è vicina al cento per cento. Vendite per regione, fatturato per prodotto, ticket per team, clienti per canale: ogni volta che la domanda è “chi ha di più e chi ha di meno”, la risposta arriva quasi sempre sotto forma di barre.

Il grafico a barre è così comune che sembra non ci sia niente da imparare. Eppure è anche quello che si sbaglia più spesso, proprio perché lo si fa senza pensarci: barre in ordine alfabetico, assi che non partono da zero, sei colori per sei categorie, dodici serie affiancate che nessuno riesce a leggere.

In questo articolo parto dalle regole di base e arrivo alle varianti più avanzate, quelle che trasformano un grafico corretto in un grafico che risponde a una domanda precisa.

## Perché le barre funzionano così bene

Il motivo è percettivo. Negli anni Ottanta William Cleveland e Robert McGill misurarono con quale precisione le persone confrontano i valori codificati in modi diversi: posizione, lunghezza, angolo, area, colore. Il risultato è diventato un riferimento per chiunque si occupi di visualizzazione dei dati: confrontiamo con molta precisione **posizioni e lunghezze lungo una scala comune**, con molta meno precisione angoli, aree e intensità di colore.

Un grafico a barre è esattamente questo: lunghezze allineate sulla stessa linea di base. Per questo una differenza del 10% tra due barre si vede subito, mentre la stessa differenza tra due fette di una torta richiede di leggere le etichette.

Da qui discende quasi tutto quello che segue. Ogni scelta che rende il confronto delle lunghezze più facile migliora il grafico; ogni scelta che lo rende più difficile lo peggiora.

## Barre o colonne?

Barre orizzontali e colonne verticali sono lo stesso grafico ruotato di novanta gradi, ma non sono intercambiabili.

![A sinistra sei colonne verticali per i mesi da gennaio a giugno; a destra sei barre orizzontali per regione, con etichette lunghe come Emilia-Romagna leggibili per intero](/assets/images/posts/grafico-a-barre/barre-colonne.svg)

Le **colonne** funzionano bene quando le categorie sono poche e hanno etichette corte, e soprattutto quando rappresentano il tempo: mesi, trimestri, anni. Il tempo si legge da sinistra a destra, e le colonne rispettano questa abitudine.

Le **barre orizzontali** sono la scelta migliore quando le etichette sono lunghe (nomi di prodotti, di clienti, di regioni) o quando le categorie sono molte. Le etichette si leggono in orizzontale senza doverle ruotare o troncare, e la lista si può allungare verso il basso, dove c’è sempre spazio. Le barre sono anche la forma naturale delle classifiche: il primo in alto, l’ultimo in basso.

Una regola pratica: se per far stare le etichette sotto le colonne si è tentati di inclinarle a 45 gradi, il grafico va ruotato.

## Le regole di base

### Ordinare le categorie

Quando le categorie non hanno un ordine naturale, vanno ordinate per valore. L’ordine alfabetico è quasi sempre quello sbagliato: è comodo per chi costruisce il grafico, non per chi lo legge.

![Le stesse sei categorie di prodotto: a sinistra in ordine alfabetico, con barre di lunghezza casuale; a destra in ordine decrescente, con la più lunga in alto](/assets/images/posts/grafico-a-barre/ordinamento.svg)

Con l’ordine decrescente, la domanda “chi è il primo, chi è l’ultimo, dove si trova questo prodotto” trova risposta in un secondo. Con l’ordine alfabetico l’occhio deve saltare avanti e indietro per ricostruire la classifica da solo.

Le eccezioni sono le categorie che hanno già un ordine proprio: il tempo, le fasce d’età, le classi di importo, le fasi di un processo. In quei casi l’ordine naturale vince su quello per valore.

### L’asse parte da zero

Nel grafico a barre il valore è codificato dalla **lunghezza** della barra. Se l’asse non parte da zero, la lunghezza non è più proporzionale al valore, e il grafico mente anche quando i numeri sono giusti.

![Gli stessi due valori, 96 e 100. A sinistra l’asse parte da 94 e la seconda colonna sembra tre volte più alta della prima; a destra l’asse parte da zero e le colonne sono quasi uguali](/assets/images/posts/grafico-a-barre/asse-da-zero.svg)

È uno degli errori più comuni nelle dashboard, spesso involontario: molti strumenti di BI adattano l’asse ai dati in automatico. Una differenza del 4% diventa visivamente una differenza del 200%, e in riunione qualcuno comincerà a chiedersi cosa sia successo alla Regione A.

Se la variazione da mostrare è piccola rispetto al valore, il grafico a barre non è lo strumento giusto. Meglio mostrare direttamente la variazione (lo vediamo più avanti con le barre divergenti) oppure usare un grafico a punti, dove l’asse può non partire da zero perché il valore è codificato dalla posizione, non dalla lunghezza.

### Meno inchiostro, più messaggio

Un grafico a barre lasciato con le impostazioni predefinite ha spesso tutto quello che non serve: un colore diverso per ogni barra, una griglia fitta, una legenda che ripete le etichette, i bordi, le ombre.

![Prima: cinque colonne di cinque colori diversi con griglia e legenda. Dopo: quattro colonne grigie e una sola colonna blu per il Nord-Est, con i valori scritti sopra le colonne e la nota “Nord-Est: +12% sul 2024”](/assets/images/posts/grafico-a-barre/evidenziare.svg)

Tre interventi fanno quasi tutto il lavoro.

- **Un solo colore per tutte le barre.** Le barre sono già distinte dalla posizione e dall’etichetta. Usare colori diversi per categorie diverse aggiunge una legenda da decifrare e non aggiunge informazione.
- **Il colore come evidenziatore.** Se il grafico ha un messaggio, il colore serve a dirlo: grigio per il contesto, un colore deciso per la barra di cui si sta parlando.
- **Etichette dirette.** Quando le barre sono poche, scrivere il valore sopra o accanto a ogni barra permette di togliere l’asse e la griglia. Il titolo, o una breve annotazione, dice il messaggio a parole.

Un dettaglio che si nota poco: lo spazio tra le barre. Barre troppo sottili e distanziate sembrano un codice a barre e si confrontano male; lo spazio tra una barra e l’altra dovrebbe essere più stretto della barra stessa, indicativamente la metà.

## Più serie nello stesso grafico

Prima o poi arriva la domanda con due dimensioni: vendite per regione **e** per anno, fatturato per trimestre **e** per canale. Il grafico a barre ha due modi per rispondere, e ciascuno ha un limite preciso.

### Raggruppate e sovrapposte

Le **barre raggruppate** (clustered) mettono le serie una accanto all’altra all’interno di ogni categoria. Funzionano bene con due serie, accettabilmente con tre. Oltre, il grafico diventa una foresta in cui non si capisce più quale barra confrontare con quale.

![A sinistra colonne raggruppate: per ogni regione una colonna chiara per il 2024 e una scura per il 2025, affiancate. A destra le stesse colonne sovrapposte: il 2024 chiaro dietro, il 2025 scuro davanti, con la variazione percentuale scritta sopra](/assets/images/posts/grafico-a-barre/raggruppate-sovrapposte.svg)

Quando le due serie sono un valore attuale e un termine di confronto (anno precedente, budget, previsione), una variante più leggibile è quella delle **barre sovrapposte**: il riferimento è una barra chiara sullo sfondo, il valore attuale una barra piena leggermente spostata davanti. L’occhio legge prima il dato attuale e solo dopo il confronto. È lo stile proposto dagli standard IBCS (International Business Communication Standards), molto diffusi nel reporting finanziario. Aggiungere la variazione percentuale sopra ogni coppia evita al lettore di fare il calcolo a mente.

### In pila e in pila al 100%

Le **barre in pila** (stacked) mettono le serie una sopra l’altra. Il vantaggio è che mostrano insieme il totale e la sua composizione.

![A sinistra colonne in pila per trimestre, divise tra negozi, online e grossisti, con il totale sopra. A destra le stesse colonne al 100%, alte uguali, con la quota dell’online che passa dal 20% al 33%](/assets/images/posts/grafico-a-barre/in-pila.svg)

Il limite è altrettanto chiaro: solo il segmento in basso e il totale poggiano su una linea di base comune. Tutti gli altri segmenti partono da altezze diverse, e confrontarli è difficile. Nel grafico a sinistra si vede bene che il totale cresce e che i negozi sono stabili; capire se i grossisti crescono o calano richiede molto più sforzo.

Ne derivano tre regole pratiche:

- mettere in basso la serie più importante, quella che si vuole confrontare tra le categorie;
- limitare le serie a tre o quattro, raggruppando le altre in “Altro”;
- se ogni serie va confrontata nel tempo, rinunciare alla pila e usare un grafico per serie, con gli small multiples di cui parlo più avanti.

La variante **in pila al 100%** porta ogni barra alla stessa altezza e mostra solo le quote. È utile quando la domanda riguarda il mix (“l’online pesa sempre di più?”) e non i volumi, ma va dichiarato in modo esplicito, perché il totale scompare: un canale può crescere di quota mentre perde in valore assoluto.

## Varianti avanzate

Le varianti che seguono non sono decorazioni. Ognuna risponde a una domanda specifica che il grafico a barre semplice affronta male.

### Barre divergenti: lo scostamento

Quando la domanda è “di quanto siamo sopra o sotto il budget”, mostrare il venduto e il budget come due barre affiancate costringe il lettore a fare la sottrazione. Le **barre divergenti** mostrano direttamente la differenza, a partire da un asse centrale.

![Barre orizzontali attorno a un asse centrale: Lombardia +8,5%, Veneto +5,2% e Lazio +2,1% a destra in blu; Piemonte −1,4%, Campania −3,8% e Sicilia −6,5% a sinistra in arancione](/assets/images/posts/grafico-a-barre/divergenti.svg)

Il colore diventa semantico: un colore per i valori positivi, uno per i negativi. Meglio evitare la coppia rosso e verde, che è il caso più comune di daltonismo; blu e arancione funzionano per quasi tutti. Ordinando le barre per valore, il grafico si legge come una classifica: chi sta facendo meglio in alto, chi ha bisogno di attenzione in basso.

È anche la soluzione al problema dell’asse troncato: invece di schiacciare i valori assoluti per far vedere una piccola differenza, si mostra la differenza stessa, con un asse che parte da zero.

### Bullet chart: valore, obiettivo e contesto

Il **bullet chart** è stato proposto da Stephen Few come alternativa ai tachimetri (gauge) che affollano molte dashboard. Il tachimetro occupa molto spazio, codifica il valore con un angolo (che leggiamo male) e mostra un solo indicatore alla volta. Il bullet chart è una barra sottile, e se ne possono impilare molti uno sotto l’altro.

![Bullet chart per quattro regioni: per ognuna una barra sottile scura con il venduto, una tacca verticale per l’obiettivo e tre fasce grigie di sfondo per insufficiente, buono e ottimo. Nord e Isole superano l’obiettivo, Centro e Sud no](/assets/images/posts/grafico-a-barre/bullet-chart.svg)

Gli elementi sono tre: la barra con il valore attuale, una tacca verticale per l’obiettivo e alcune fasce di sfondo, in toni di grigio, che indicano le soglie di valutazione. In un colpo d’occhio si vede se il valore ha superato l’obiettivo e in quale fascia di prestazione si trova. È uno dei modi più compatti per mettere in una dashboard direzionale più KPI con il loro target.

### Pareto: chi conta davvero

Il **diagramma di Pareto** combina barre ordinate in modo decrescente con una linea che mostra la quota cumulata. Risponde a una domanda che in azienda torna di continuo: quanti clienti, prodotti o cause di difetto spiegano la maggior parte del totale?

![Barre ordinate per il fatturato di dieci clienti, dalla A alla J, con una linea della quota cumulata. I primi cinque clienti sono colorati e superano insieme l’82% del totale, oltre la linea tratteggiata dell’80%](/assets/images/posts/grafico-a-barre/pareto.svg)

La linea tratteggiata all’80% rende immediato il punto in cui la curva la attraversa. Le barre prima di quel punto meritano un colore pieno, le altre possono restare in grigio. È un grafico molto efficace nelle analisi di concentrazione dei clienti, nella gestione dell’assortimento e nell’analisi dei reclami.

Una variante più semplice dello stesso principio è il **Top N con “Altri”**: si mostrano le prime dieci categorie e si raggruppa il resto in un’unica barra, sempre in fondo e in grigio anche se è più lunga delle altre. Il lettore vede i protagonisti senza perdere la dimensione del totale.

### Lollipop e dumbbell: quando le barre sono troppe

Con venti o trenta categorie, un grafico a barre diventa una massa compatta di inchiostro. Il **lollipop** sostituisce ogni barra con una linea sottile e un punto all’estremità: la lunghezza resta, il peso visivo si riduce molto.

![A sinistra un lollipop con dieci prodotti ordinati, ognuno con una linea sottile e un punto. A destra un dumbbell con otto regioni: un punto vuoto per il 2024 e uno pieno per il 2025, uniti da una linea; Lazio e Piemonte, in calo, hanno il punto arancione](/assets/images/posts/grafico-a-barre/lollipop-dumbbell.svg)

Il **dumbbell** (o grafico a manubrio) è il fratello del lollipop per i confronti tra due momenti: per ogni categoria due punti, prima e dopo, uniti da una linea. A differenza delle barre raggruppate, mette in primo piano la distanza tra i due valori, che spesso è proprio la notizia. Colorare in modo diverso le categorie in calo le fa emergere senza bisogno di leggere i numeri.

Nel dumbbell, come in tutti i grafici a punti, l’asse non deve per forza partire da zero: il valore è codificato dalla posizione, non dalla lunghezza.

### Small multiples: una domanda alla volta

Quando una pila o un gruppo di barre contiene troppe serie, la soluzione è spesso dividere il grafico in tanti grafici piccoli, uno per serie, **con la stessa scala**. Edward Tufte li ha chiamati small multiples.

![Quattro piccoli grafici a colonne, uno per regione, con la stessa scala e una linea tratteggiata comune a quota 100. Nord, Centro e Isole crescono; il Sud, in arancione, cala trimestre dopo trimestre](/assets/images/posts/grafico-a-barre/small-multiples.svg)

Ogni grafico ha una sola serie e quindi una linea di base comune per tutte le colonne: il confronto nel tempo all’interno di ogni regione diventa immediato. La scala condivisa permette anche il confronto tra regioni. Se ogni grafico avesse la sua scala, il Nord e le Isole sembrerebbero avere lo stesso volume di vendite.

La maggior parte degli strumenti di BI li supporta in modo nativo: in Power BI si chiamano small multiples, in Tableau si ottengono mettendo una dimensione su righe o colonne, in Looker Studio e Qlik con le opzioni di griglia o “trellis”.

## Quando il grafico a barre non è la scelta giusta

Il grafico a barre è versatile, ma non universale.

- **Andamenti lunghi nel tempo.** Con trenta o più punti temporali una linea è più leggibile di una fila di colonne, perché l’occhio segue la forma della curva.
- **Distribuzioni.** Un istogramma somiglia a un grafico a colonne, ma risponde a un’altra domanda (come si distribuiscono i valori, non quanto vale ogni categoria) e ha regole sue.
- **Ponti tra due totali.** Per spiegare come si passa dai ricavi all’utile, o dal budget al consuntivo, serve il grafico a cascata (waterfall).
- **Un solo numero.** Se il messaggio è un valore con la sua variazione, una card KPI è più diretta di un grafico con una barra sola.

## Una checklist prima di pubblicare

Prima di aggiungere un grafico a barre a una dashboard, poche domande bastano a evitare gli errori più comuni.

1. **Barre o colonne?** Colonne per il tempo e le etichette corte, barre per le classifiche e le etichette lunghe.
2. **L’ordine aiuta?** Per valore, tranne quando le categorie hanno un ordine proprio.
3. **L’asse parte da zero?** Se la differenza da mostrare è piccola, meglio mostrare lo scostamento.
4. **Il colore dice qualcosa?** Un colore di base, uno per evidenziare, uno per i negativi. Nient’altro.
5. **Quante serie?** Al massimo tre affiancate o quattro in pila; oltre, small multiples.
6. **Il titolo dice il messaggio?** “Il Nord-Est cresce del 12%” è un titolo; “Vendite per area” è un’etichetta.

Il grafico a barre è il più semplice dei grafici, ed è proprio per questo che vale la pena farlo bene: è quello che le persone guardano di più.

## Per approfondire

Letture utili sui temi dell’articolo (in inglese).

- [Graphical Perception: Theory, Experimentation, and Application to the Development of Graphical Methods](https://www.jstor.org/stable/2288400) (William S. Cleveland, Robert McGill, 1984): lo studio sulla precisione con cui leggiamo lunghezze, posizioni, angoli e aree
- [Bullet Graph Design Specification](https://www.perceptualedge.com/articles/misc/Bullet_Graph_Design_Spec.pdf) (Stephen Few): la specifica originale del bullet chart
- [IBCS Standards](https://www.ibcs.com/) (IBCS Association): le regole per il reporting aziendale, tra cui le notazioni per attuale, anno precedente e budget
- [Visual Vocabulary](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary) (Financial Times): una mappa dei tipi di grafico organizzata per domanda, dal confronto alla composizione
