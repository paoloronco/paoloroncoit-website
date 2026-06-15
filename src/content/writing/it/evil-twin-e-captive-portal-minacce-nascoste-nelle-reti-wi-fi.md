---
title: "Evil Twin e Captive Portal: Minacce Nascoste nelle Reti Wi-Fi"
description: "Nel contesto sempre più digitale di oggi, la sicurezza delle reti Wi-Fi è fondamentale per proteggere dati sensibili e garantire connessioni affidabili. In…"
pubDate: 2024-01-16
tags: ["kali-linux"]
draft: false
---
Nel contesto sempre più digitale di oggi, la sicurezza delle reti Wi-Fi è fondamentale per proteggere dati sensibili e garantire connessioni affidabili. In questo articolo, esploreremo un pericoloso attacco noto come "Evil Twin" con l'uso di un "Captive Portal". Confronteremo questa minaccia con l'approccio precedente che ho presentato utilizzando AirMon-NG e Hashcat per testare la sicurezza delle reti Wi-Fi.

Cos'è l'Evil Twin?  
L'attacco Evil Twin è una tattica insidiosa utilizzata dagli aggressori per ingannare i dispositivi degli utenti. In pratica, un aggressore crea una rete Wi-Fi falsa con lo stesso nome (SSID) di una rete legittima a cui il dispositivo dell'utente è precedentemente connesso. L'obiettivo è far de-autenticare il dispositivo dell'utente dalla rete legittima e farlo connettere alla rete Evil Twin controllata dall'attaccante.

Utilizzo dell'Evil Twin in Luoghi Pubblici e Privati:  
Questo tipo di attacco è spesso utilizzato in luoghi pubblici come aeroporti, caffetterie o hotel, dove le persone si connettono automaticamente alle reti Wi-Fi disponibili. Gli aggressori possono quindi intercettare i dati che passano attraverso la rete Wi-Fi compromessa, mettendo a rischio la privacy degli utenti.

In ambito privato, l'Evil Twin può essere utilizzato in combinazione con un "Captive Portal". Un captive portal è una pagina web che richiede all'utente di inserire credenziali o di accettare termini e condizioni prima di concedere l'accesso alla rete Wi-Fi. Spesso, gli aggressori richiedono la password del router o addirittura credenziali più sensibili come quelle degli account di posta elettronica, social media o bancari.

Captive Portal con Beef:  
Per mettere in atto un Captive Portal, gli aggressori possono utilizzare strumenti come Beef, una delle molte opzioni disponibili. Con un Captive Portal configurato correttamente, è possibile ottenere accesso a informazioni sensibili degli utenti e persino rubare le loro credenziali.

Un Pericolo Oltre le Reti Wi-Fi:  
L'Evil Twin e il Captive Portal non sono limitati alle minacce alle reti Wi-Fi. Possono anche essere utilizzati negli attacchi di mail spam e per intercettare comunicazioni online, rappresentando una minaccia significativa per la privacy e la sicurezza delle informazioni.

Differenze con l'Approccio Precedente:  
A differenza dell'approccio precedente che utilizzava AirMon-NG e Hashcat per testare le password delle reti Wi-Fi, l'Evil Twin e il Captive Portal rappresentano una minaccia più sofisticata e pericolosa. Mentre il primo si concentrava sulla violazione delle password Wi-Fi, il secondo coinvolge l'ingegneria sociale e il furto di dati sensibili.

In conclusione, l'Evil Twin e il Captive Portal evidenziano quanto sia importante proteggere le reti Wi-Fi e prestare attenzione alle reti pubbliche. La sicurezza delle reti è fondamentale per la protezione dei dati personali e la prevenzione di potenziali attacchi. Rimanere informati su queste minacce è il primo passo per mitigare i rischi e garantire una connessione Internet sicura.
