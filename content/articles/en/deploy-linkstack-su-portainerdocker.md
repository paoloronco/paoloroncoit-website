---
title: "Deploying LinkStack on Portainer [Docker]"
description: "In today's digital landscape, sharing links to your websites, social media profiles, and online resources has become commonplace. However, managing…"
pubDate: 2024-01-31
tags: ["server","web"]
draft: false
---
In today's digital landscape, sharing links to your websites, social media profiles, and online resources has become commonplace. However, managing all these links can be challenging. Fortunately, LinkStack is an open-source alternative to LinkTree that offers a highly customizable way to present all your links on a single page. In this guide, we will show you how to install and configure LinkStack in a Debian container using Docker and Portainer. You will also learn how to complete the initial setup and create a custom link page, making it easier to share your websites and online resources with the world. With LinkStack, you retain full control over your link page and can protect your privacy and data while simplifying online navigation for both you and your visitors. Follow this step-by-step guide to learn how to build a valuable resource for your online presence with LinkStack.

Log in to the Portainer web interface.

Creating a Stack:

Go to "CT" (Containers) and select "Stacks".

Click "+Add Stack" to create a stack.

Stack Configuration: Enter the following YAML code in the stack configuration field:

```
version: "3.8"
services:
  linkstack:
    hostname: 'linkstack'
    image: 'linkstackorg/linkstack:latest'
    environment:
      TZ: 'Europe/Rome'
      SERVER_ADMIN: 'info@paoloronco.it'
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

You can find an updated version of this code on [GitHub - LinkStack Docker](https://github.com/LinkStackOrg/linkstack-docker).

Accessing LinkStack: Open https://INDIRIZZO-IP-DELLA-MACCHINA:8190/ in your browser.

Initial Setup:

Follow the initial setup instructions in LinkStack:

Click "Next…".

Enter the administrator's email address (for example, info@paoloronco.it).

Use the password of your Debian CT system's root user as the administrator password.

Set the handle (for example, paoloronco.it) and the user's name (for example, paoloronco).

After completing these steps, you should be able to configure LinkStack successfully in a Debian container using Portainer. Be sure to follow the instructions carefully and apply security best practices to protect your installation.
