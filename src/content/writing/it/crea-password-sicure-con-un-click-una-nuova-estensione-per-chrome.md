---
title: "Crea Password Sicure con un Click:  Una Nuova Estensione per Chrome"
description: "Crea Password Sicure con un Click: Una Nuova Estensione per Chrome La sicurezza online è oggi più importante che mai, eppure molte persone continuano a…"
pubDate: 2025-01-28
tags: []
draft: false
---
### Crea Password Sicure con un Click: Una Nuova Estensione per Chrome

La sicurezza online è oggi più importante che mai, eppure molte persone continuano a utilizzare password deboli come **"12345678"**, **"password"** o **"qwerty"**, compromettendo i propri account e dati sensibili. Con la crescente minaccia di attacchi informatici, è fondamentale utilizzare password complesse e sicure per proteggere la propria privacy e le proprie informazioni personali.

Fortunatamente, esistono strumenti che rendono questa pratica semplice e veloce. Tra questi, una nuova **estensione per Chrome** chiamata **Password Generator**, progettata per generare password uniche e robuste con pochi click.

* * *

### Perché Serve una Password Sicura?

Le password semplici e prevedibili sono facili da indovinare per hacker e bot automatizzati. Utilizzare combinazioni casuali di lettere, numeri e simboli è il modo migliore per proteggersi. Tuttavia, creare manualmente queste password può essere noioso e complicato. È qui che entra in gioco il nostro **Password Generator**, un’estensione Chrome facile da usare e disponibile anche in versione web.

* * *

### Password Generator: Come Funziona?

L'estensione **Password Generator** ti permette di creare password sicure e personalizzate in base alle tue esigenze, direttamente dal browser Chrome o dal sito web. Con un'interfaccia intuitiva e strumenti personalizzabili, puoi scegliere:

-   **La lunghezza della password**, da un minimo di 4 a un massimo di 32 caratteri.
-   **Includere lettere (a-z, A-Z)**.
-   **Aggiungere numeri (0-9)**.
-   **Includere caratteri speciali** come **!$%?€**, per una maggiore complessità.

Ogni password generata è casuale e unica, eliminando ogni rischio di prevedibilità. Inoltre, puoi copiare immediatamente la password generata con un semplice click per incollarla dove serve.

* * *

### Dove Trovarlo?

Puoi installare l'estensione **Password Generator** direttamente dal Chrome Web Store:  
? **[Password Generator su Chrome Web Store](https://chrome.google.com/webstore/detail/password-generator)**

Se sei uno sviluppatore o vuoi contribuire al progetto, puoi trovare il codice sorgente su GitHub:  
? **[Password Generator su GitHub](https://github.com/paoloronco/password-generator)**

* * *

### Codice di Base dell’Estensione

Qui sotto trovi il codice dell’estensione, che include tre file principali: **popup.html**, **script.js** e **style.css**.

#### **popup.html**

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Generator</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Password Generator</h1>
        <div class="options">
            <label for="length">Password Length:</label>
            <input type="range" id="length" min="4" max="32" value="12">
            <span id="length-value">12</span>

            <label>
                <input type="checkbox" id="include-letters" checked>
                Letters (a-z, A-Z)
            </label>

            <label>
                <input type="checkbox" id="include-numbers" checked>
                Numbers (0-9)
            </label>

            <label>
                <input type="checkbox" id="include-specials">
                Special Characters (!$%?€)
            </label>
        </div>

        <div class="output">
            <input type="text" id="password" readonly>
            <button id="refresh">Refresh</button>
            <button id="copy">Copy</button>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

#### **script.js**

```
document.addEventListener("DOMContentLoaded", () => {
    const lengthInput = document.getElementById("length");
    const lengthValue = document.getElementById("length-value");
    const includeLetters = document.getElementById("include-letters");
    const includeNumbers = document.getElementById("include-numbers");
    const includeSpecials = document.getElementById("include-specials");
    const passwordOutput = document.getElementById("password");
    const refreshButton = document.getElementById("refresh");
    const copyButton = document.getElementById("copy");

    const updateLengthValue = () => {
        lengthValue.textContent = lengthInput.value;
    };

    const generatePassword = () => {
        const length = parseInt(lengthInput.value, 10);
        const useLetters = includeLetters.checked;
        const useNumbers = includeNumbers.checked;
        const useSpecials = includeSpecials.checked;

        let letters = "abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ";
        let numbers = "0123456789";
        let specials = "!$%?€";
        let characters = "";

        if (useLetters) characters += letters;
        if (useNumbers) characters += numbers;
        if (useSpecials) characters += specials;

        if (characters === "") {
            passwordOutput.value = "Select at least one option!";
            return;
        }

        let password = "";
        let specialCount = 0;

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            const randomChar = characters[randomIndex];

            if (specials.includes(randomChar)) {
                specialCount++;
            }

            password += randomChar;
        }

        if (useSpecials && specialCount === 0) {
            const randomSpecial = specials[Math.floor(Math.random() * specials.length)];
            const randomReplaceIndex = Math.floor(Math.random() * password.length);
            password = password.slice(0, randomReplaceIndex) + randomSpecial + password.slice(randomReplaceIndex + 1);
        }

        passwordOutput.value = password;
    };

    const copyToClipboard = () => {
        const password = passwordOutput.value;
        if (password) {
            navigator.clipboard.writeText(password).then(() => {
                alert("Password copied to clipboard!");
            }).catch(err => {
                console.error("Could not copy password: ", err);
            });
        } else {
            alert("No password to copy!");
        }
    };

    lengthInput.addEventListener("input", () => {
        updateLengthValue();
        generatePassword();
    });

    refreshButton.addEventListener("click", () => {
        generatePassword();
    });

    copyButton.addEventListener("click", () => {
        copyToClipboard();
    });

    updateLengthValue();
    generatePassword();
});
```

#### **style.css**

```
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f9;
}

.container {
    background: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 300px;
}

h1 {
    margin-bottom: 20px;
    font-size: 1.5em;
    color: #333;
}

.options label {
    display: block;
    margin-bottom: 10px;
    font-size: 0.9em;
    color: #555;
}

#length {
    width: 100%;
    margin: 10px 0;
}

#length-value {
    font-weight: bold;
    color: #333;
}

.output {
    margin-top: 20px;
}

#password {
    width: calc(100% - 40px);
    padding: 10px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    text-align: center;
}

button {
    background: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 0.9em;
    cursor: pointer;
    transition: background 0.3s;
}

button:hover {
    background: #0056b3;
}
```

* * *

### Icone Necessarie

Per l'estensione, sono richieste tre icone con le seguenti dimensioni:

1.  **128x128**: per il Chrome Web Store.
2.  **48x48**: per il menu di Chrome.
3.  **16x16**: per la barra degli strumenti.

Le immagini devono essere caricate nella cartella principale del progetto e referenziate nel file **manifest.json**.

* * *

### Come Caricare Estensioni Personalizzate su Chrome

1.  Apri Chrome e vai su **chrome://extensions**.
2.  Attiva la modalità **"Developer Mode"** in alto a destra.
3.  Clicca su **"Load unpacked"** e seleziona la cartella del progetto.

L'estensione sarà ora visibile nel tuo browser.

* * *

### Termini d'Uso

La rivendita, redistribuzione o copia del codice, dell'estensione o del sito **non sono autorizzate** senza il consenso dell'autore.
