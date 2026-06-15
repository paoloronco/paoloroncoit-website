---
title: "Kali: WiFi Cracking, AirMon-NG e Hashcat"
description: "Nel mondo sempre più connesso di oggi, la sicurezza delle reti Wi-Fi è diventata di fondamentale importanza. La crescente dipendenza dalla connessione Internet…"
pubDate: 2024-01-16
tags: ["kali-linux"]
draft: false
---
Nel mondo sempre più connesso di oggi, la sicurezza delle reti Wi-Fi è diventata di fondamentale importanza. La crescente dipendenza dalla connessione Internet ha reso essenziale proteggere le reti domestiche e aziendali da potenziali minacce. In questo articolo, condividerò la mia esperienza nell'utilizzo di AirMon-NG su Kali Linux per catturare l'handshake, una procedura in cui due computer cercano di stabilire una connessione tramite il protocollo TCP/IP. Durante l'handshake TCP, i due dispositivi scambiano una serie di messaggi per negoziare i parametri della connessione, come il numero di sequenza iniziale e altre informazioni necessarie per garantire una comunicazione affidabile tra di loro.

Successivamente, ho usato Hashcat per decifrare la password cifrata presente nel file di handshake e quindi rivelarla in chiaro.

**Strumenti Utilizzati:**

-   AirMon-NG su Kali Linux: AirMon-NG è un'utility di monitoraggio Wi-Fi inclusa in Kali Linux, una distribuzione Linux specializzata nella sicurezza informatica. Questo strumento mi ha consentito di rilevare le reti wireless circostanti, monitorarle e catturare pacchetti, inclusi gli handshake di autenticazione.
-   Scheda di rete Alfa Network: Le schede di rete Alfa Network sono ampiamente riconosciute nella comunità Linux per la loro stabilità e la capacità di funzionare in "Monitor Mode". Questa caratteristica le rende strumenti essenziali per chi lavora in ambito di sicurezza informatica.
-   Hashcat su Windows: Dopo aver acquisito gli handshake di autenticazione dalle reti target, ho trasferito i file di cattura su un sistema Windows equipaggiato con una potente GPU. Qui ho utilizzato Hashcat, uno strumento di cracking di password altamente performante. La password del router TP-Link, composta da 8 caratteri numerici, è stata decifrata in soli 15 minuti, sottolineando l'importanza di utilizzare password robuste per proteggere le reti Wi-Fi.

**Approccio Etico:  
**È fondamentale sottolineare che tutte le attività svolte sono state condotte in modo etico e responsabile. Ho testato esclusivamente la mia rete Wi-Fi di proprietà, un router TP-Link che aveva una password di default composta da 8 caratteri numerici. Questo test ha evidenziato il pericolo delle password predefinite, sottolineando l'importanza di impostare password solide e complesse.

**Risultati:**  
L'utilizzo di AirMon-NG, insieme ad Hashcat ha dimostrato la vulnerabilità delle reti Wi-Fi con password deboli o predefinite. Nel mio caso, Hashcat su Windows è stato in grado di decifrare la password dall'handshake molto rapidamente, richiedendo solamente 15 minuti. Questo risultato sottolinea la necessità di proteggere le reti utilizzando password robuste, composte da caratteri casuali e alfanumerici.

**Conclusioni**:  
È essenziale comprendere l'importanza di testare la sicurezza della propria rete Wi-Fi e proteggerla adeguatamente. Utilizzare meccanismi di autenticazione moderni, come WPA2-Personal o Enterprise, costituisce un passo cruciale per proteggere la connessione Internet domestica o aziendale. La scelta di una password robusta è altrettanto significativa. Nel caso dei dispositivi TP-Link, è fondamentale cambiare la password predefinita, composta da soli 8 caratteri numerici, con una più sicura e complessa. La rete Wi-Fi di casa è coinvolta in numerosi aspetti della nostra vita, inclusi pagamenti online e operazioni bancarie, che implicano dati sensibili. Proteggerla adeguatamente è fondamentale per evitare intrusioni e possibili attacchi di intercettazione, come il "man-in-the-middle", che potrebbero mettere a rischio la sicurezza dei nostri dati. La sicurezza della rete Wi-Fi è una responsabilità che non possiamo sottovalutare, e il suo corretto mantenimento è essenziale per garantire la protezione delle informazioni personali e aziendali.
