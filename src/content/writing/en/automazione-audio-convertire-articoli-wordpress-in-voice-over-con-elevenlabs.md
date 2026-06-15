---
title: "Audio Automation: Converting WordPress Articles into Voice Over with ElevenLabs"
description: "In my latest automation project, I developed an advanced workflow that automatically transforms articles from my WordPress site into audio files,…"
pubDate: 2025-03-01
tags: []
draft: false
---
In my latest automation project, I developed an advanced workflow that automatically transforms articles from my WordPress site into audio files, making them available on Google Drive and cataloged in Airtable. This process leverages various APIs and cloud technologies to ensure a smooth and fully automated integration.

* * *

### **The Automated Process**

The main objective of the project is to convert WordPress articles into voice-over tracks through ElevenLabs, an advanced text-to-speech platform. The generated audio files are then uploaded to Google Drive using Google Cloud Platform (GCP) APIs and OAuth authentication, and registered in Airtable for structured organization.

#### **1\. Retrieval of Articles from WordPress**

Thanks to the WordPress APIs, the system automatically monitors newly published articles and extracts them for subsequent conversion.

#### **2\. Voice Over Creation with ElevenLabs**

ElevenLabs is an advanced text-to-speech platform that transforms text into high-quality audio. This process is similar to podcast production, providing a more accessible and dynamic way of consuming content.

#### **3\. Upload to Google Drive via Google Cloud Platform**

Integration with Google Drive was managed through Google Cloud Platform (GCP) APIs using OAuth for secure authentication. Due to security reasons, direct authentication with Google Drive cannot be done, so it was necessary to configure a project on the Google Cloud Console to manage OAuth credentials.

#### **4\. Generation of Sharing Link and Registration in Airtable**

After uploading, the system automatically generates a sharing link for the audio file and registers it in Airtable, creating a structured database for content management and consultation.

* * *

### **Acquired Skills and Technologies Used**

This project represented an important experience in automation and API integration, consolidating skills in:

-   **REST APIs** for data management between WordPress, ElevenLabs, Google Drive, and Airtable.
-   **Google Cloud Platform (GCP)** for managing OAuth credentials and integrating with Google Drive.
-   **OAuth 2.0** for secure authentication within the Google ecosystem.
-   **Workflow automation** for creating a fully automated and efficient process.

* * *

### **Listen to Converted Articles in MP3 Format**

Converted articles in audio format are available for listening at this link:  
[Portfolio Audio Articles](https://portfolio.paoloronco.it/portfolio-articoli-audio/)  
Listening is integrated with the **AudioIgniter** plugin, which ensures a smooth and intuitive experience.

* * *

This project demonstrates the effectiveness of automation and cloud integrations in enhancing content accessibility and consumption, transforming simple written text into a dynamic and engaging audio experience.
---

