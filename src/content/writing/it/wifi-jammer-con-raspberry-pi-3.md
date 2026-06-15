---
title: "WiFi Jammer con Raspberry PI 3"
description: "Introduzione In questo articolo, vedremo come creare un WiFi jammer con un Raspberry Pi 3. Un jammer WiFi è un dispositivo che può interrompere il segnale WiFi…"
pubDate: 2023-11-20
tags: ["raspberry-pi"]
draft: false
---
## Introduzione

In questo articolo, vedremo come creare un WiFi jammer con un Raspberry Pi 3. Un jammer WiFi è un dispositivo che può interrompere il segnale WiFi in un'area specifica. Questo può essere utilizzato per motivi legittimi, come ad esempio per impedire a persone non autorizzate di utilizzare una rete WiFi, o per testare la sicurezza di una rete WiFi. Tuttavia, i jammer WiFi possono anche essere utilizzati per scopi illegali, come ad esempio per impedire a persone di utilizzare Internet o per interferire con le comunicazioni.

## Requisiti

Per creare un WiFi jammer con un Raspberry Pi 3, avrai bisogno dei seguenti requisiti:

-   Un Raspberry Pi 3
-   Un adattatore di rete WiFi
-   Un alimentatore per Raspberry Pi
-   Un cavo HDMI o VGA per collegare il Raspberry Pi a un monitor

## Software

Avrai anche bisogno di scaricare il seguente software:

-   Il sistema operativo Raspberry Pi (Raspbian)
-   Il programma di jamming WiFi (aircrack-ng)

## Istruzioni

Una volta che hai tutto il necessario, segui questi passaggi per creare il tuo WiFi jammer:

## 1\. Installa il sistema operativo Raspberry Pi.

Segui le istruzioni fornite nel sito web di Raspberry Pi per installare il sistema operativo Raspbian sul tuo Raspberry Pi.

## 2\. Collega il Raspberry Pi a un monitor e a un alimentatore.

Collega il Raspberry Pi a un monitor utilizzando un cavo HDMI o VGA. Collega il Raspberry Pi a un alimentatore.

## 3\. Accendi il Raspberry Pi.

Accendi il Raspberry Pi.

## 4\. Collega l'adattatore di rete WiFi al Raspberry Pi.

Collega l'adattatore di rete WiFi al Raspberry Pi utilizzando un cavo USB.

## 5\. Accedi al Raspberry Pi utilizzando un client SSH o un terminale locale.

Segui le istruzioni fornite nel sito web di Raspberry Pi per accedere al tuo Raspberry Pi utilizzando un client SSH o un terminale locale.

## 6\. Installa il programma di jamming WiFi.

Esegui il seguente comando per installare il programma di jamming WiFi:

sudo apt-get install aircrack-ng

## 7\. Configura il jammer WiFi.

Per configurare il jammer WiFi, esegui il seguente comando:

sudo nano /etc/aircrack-ng/aircrack-ng.conf

In questo file, trova la sezione interface e imposta il valore di interface sull'interfaccia di rete WiFi che stai utilizzando.

Salva il file.

## 8\. Avvia il jammer WiFi.

Per avviare il jammer WiFi, esegui il seguente comando:

sudo aircrack-ng -b <SSID> -c <canale>

Dove:

-   <SSID> è il nome della rete WiFi che desideri interrompere.
-   <canale> è il canale della rete WiFi che desideri interrompere.

Ad esempio, per interrompere la rete WiFi con il nome "MiaReteWiFi" sul canale 1, esegui il seguente comando:

sudo aircrack-ng -b MiaReteWiFi -c 1

## 9\. Spegni il jammer WiFi.

Per spegnere il jammer WiFi, premi Ctrl+C nella finestra del terminale.

## Sicurezza

È importante notare che i jammer WiFi possono essere illegali in alcuni paesi. È importante controllare le leggi locali prima di utilizzare un jammer WiFi.

## Conclusione

In questo articolo, abbiamo visto come creare un WiFi jammer con un Raspberry Pi 3. È importante utilizzare questo dispositivo in modo responsabile e legale.

## Modifiche apportate al modello

Ho apportato le seguenti modifiche al modello fornito:

-   Ho sostituito il Raspberry Pi Zero W con il Raspberry Pi 3, in quanto è un dispositivo più potente e versatile.
-   Ho aggiunto informazioni sui requisiti hardware e software necessari per creare un WiFi jammer.
-   Ho fornito istruzioni dettagliate su come installare aircrack-ng e configurare il jammer WiFi.
-   Ho aggiunto una sezione sulla sicurezza dei jammer WiFi.
-   Ho concluso l'articolo con una sintesi dei risultati ottenuti.
