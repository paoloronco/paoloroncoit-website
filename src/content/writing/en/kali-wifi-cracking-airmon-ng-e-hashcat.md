---
title: "Kali: WiFi Cracking, AirMon-NG e Hashcat"
description: "In today's increasingly connected world, the security of Wi-Fi networks has become a matter of utmost importance. The growing reliance on Internet connectivity... "
pubDate: 2024-01-16
tags: ["kali-linux"]
draft: false
---
In today's increasingly connected world, the security of Wi-Fi networks has become a matter of utmost importance. The growing reliance on Internet connectivity has made it essential to protect home and corporate networks from potential threats. In this article, I will share my experience using AirMon-NG on Kali Linux to capture the handshake, a procedure where two computers attempt to establish a connection via the TCP/IP protocol. During the TCP handshake, the two devices exchange a series of messages to negotiate connection parameters such as the initial sequence number and other information necessary to ensure reliable communication between them.

Subsequently, I used Hashcat on Windows to decrypt the encrypted password present in the handshake file and reveal it in plain text.

**Tools Used:**

-   AirMon-NG on Kali Linux: AirMon-NG is a Wi-Fi monitoring utility included in Kali Linux, a Linux distribution specialized in cybersecurity. This tool allowed me to detect nearby wireless networks, monitor them, and capture packets, including authentication handshakes.
-   Alfa Network network card: The Alfa Network cards are widely recognized in the Linux community for their stability and capability of functioning in "Monitor Mode." This feature makes them essential tools for those working in cybersecurity.
-   Hashcat on Windows: After acquiring the authentication handshakes from target networks, I transferred the capture files to a powerful GPU-equipped Windows system. Here, I used Hashcat, a highly performant password cracking tool. The password of my TP-Link router, consisting of 8 numeric characters, was decrypted in just 15 minutes, highlighting the importance of using strong passwords to protect Wi-Fi networks.

**Ethical Approach:**  
It is crucial to emphasize that all activities were conducted in an ethical and responsible manner. I tested exclusively my own Wi-Fi network, a TP-Link router with a default password consisting of 8 numeric characters. This test highlighted the danger of default passwords, underscoring the importance of setting strong and complex passwords.

**Results:**  
The use of AirMon-NG, combined with Hashcat, demonstrated the vulnerability of Wi-Fi networks with weak or default passwords. In my case, Hashcat on Windows was able to decrypt the password from the handshake very quickly, requiring only 15 minutes. This result highlights the need for protecting networks using strong passwords composed of random alphanumeric characters.

**Conclusions:**  
It is essential to understand the importance of testing the security of one's Wi-Fi network and adequately protecting it. Using modern authentication mechanisms such as WPA2-Personal or Enterprise constitutes a crucial step in securing home or corporate Internet connections. Choosing a robust password is equally significant. For devices like TP-Link, it is vital to change the default password, consisting of only 8 numeric characters, with a more secure and complex one. The Wi-Fi network at home is involved in many aspects of our lives, including online payments and banking operations that involve sensitive data. Adequate protection is crucial to avoid intrusions and potential interception attacks such as "man-in-the-middle," which could compromise the security of our data. The security of the Wi-Fi network is a responsibility we cannot underestimate, and its proper maintenance is essential for ensuring the protection of personal and corporate information.
---

