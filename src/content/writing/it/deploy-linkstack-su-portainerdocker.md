---
title: "Deploy LinkStack su Portainer[Docker]"
description: "Nel panorama digitale odierno, la condivisione dei link ai propri siti web, profili social e risorse online è diventata una pratica comune. Tuttavia, la…"
pubDate: 2024-01-31
tags: ["server","web"]
draft: false
---
Nel panorama digitale odierno, la condivisione dei link ai propri siti web, profili social e risorse online è diventata una pratica comune. Tuttavia, la gestione di tutti questi collegamenti può diventare un compito complesso. Fortunatamente, esiste un'alternativa open-source a LinkTree chiamata LinkStack, che offre un modo altamente personalizzabile per presentare tutti i tuoi collegamenti in un'unica pagina. In questa guida, ti mostreremo come installare e configurare LinkStack su un container Debian utilizzando Docker e Portainer. Imparerai anche come eseguire la configurazione iniziale per creare una pagina di collegamenti personalizzata, semplificando la condivisione dei tuoi siti web e delle tue risorse online con il mondo. Con LinkStack, avrai il controllo completo sulla tua pagina di collegamenti e potrai garantire la tua privacy e la sicurezza dei tuoi dati mentre semplifichi la navigazione online per te e per i tuoi visitatori. Segui questa guida passo dopo passo per scoprire come creare una preziosa risorsa per la tua presenza online con LinkStack.

Accedi alla tua interfaccia web di Portainer.

Creazione di uno Stack:

Vai su "CT" (Containers) e seleziona "Stacks".  
Clicca su "+Add Stack" per creare uno stack.  
Configurazione dello Stack: Inserisci il seguente codice YAML nel campo di configurazione dello stack:

```
version: "3.8"
services:
  linkstack:
    hostname: 'linkstack'
    image: 'linkstackorg/linkstack:latest'
    environment:
      TZ: 'Europe/Rome'
      SERVER_ADMIN: 'paolo.ronco2000@gmail.com'
      HTTP_SERVER_NAME: 'paoloronco.it'
      HTTPS_SERVER_NAME: 'paoloronco.it'
      LOG_LEVEL: 'info'
      PHP_MEMORY_LIMIT: '256M'
      UPLOAD_MAX_FILESIZE: '80M'
    volumes:
      - 'linkstack_data:/htdocs'
    ports:
      - '8190:443'
    restart: unless-stopped

volumes:
  linkstack_data:
```

  
Puoi trovare una versione aggiornata di questo codice su [GitHub - LinkStack Docker](https://github.com/LinkStackOrg/linkstack-docker).

Accesso a LinkStack: Vai al link https://INDIRIZZO-IP-DELLA-MACCHINA:8190/ nel tuo browser.

Configurazione Iniziale:  
Segui le istruzioni di configurazione iniziale su LinkStack:  
Fai clic su "Next…".  
Inserisci l'indirizzo email dell'amministratore (ad esempio, paolo.ronco2000@gmail.com).  
Utilizza la password dell'utente root del tuo sistema Debian CT come password dell'amministratore.  
Imposta l'handle (ad esempio, paoloronco.it) e il nome dell'utente (ad esempio, paoloronco).

Con questi passaggi, dovresti essere in grado di configurare LinkStack con successo su un container Debian utilizzando Portainer. Assicurati di seguire attentamente le istruzioni e le migliori pratiche di sicurezza per proteggere la tua installazione.
