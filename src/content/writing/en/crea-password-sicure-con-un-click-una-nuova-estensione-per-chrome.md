---
title: "Create Secure Passwords with a Click: A New Extension for Chrome"
description: "Create Secure Passwords with a Click: A New Extension for Chrome Online security is more important than ever, yet many people continue to use weak passwords like '12345678', 'password' or 'qwerty', compromising their accounts and sensitive data. With the increasing threat of cyber attacks, it's essential to use complex and secure passwords to protect your privacy and personal information."
pubDate: 2025-01-28
tags: []
draft: false
---
### Create Secure Passwords with a Click: A New Extension for Chrome

Online security is more important than ever, yet many people continue to use weak passwords like **"12345678"**, **"password"** or **"qwerty"**, compromising their accounts and sensitive data. With the increasing threat of cyber attacks, it's essential to use complex and secure passwords to protect your privacy and personal information.

Fortunately, there are tools that make this practice simple and quick. One such tool is a new **Chrome extension called Password Generator**, designed to generate unique and robust passwords with just a few clicks.

* * *

### Why Do You Need a Secure Password?

Simple and predictable passwords are easy for hackers and automated bots to guess. Using random combinations of letters, numbers, and symbols is the best way to protect yourself. However, manually creating these passwords can be tedious and complicated. That's where our **Password Generator** comes in – an easy-to-use extension available both as a Chrome extension and on the web.

* * *

### Password Generator: How Does It Work?

The **Password Generator** extension allows you to create secure and personalized passwords directly from your Chrome browser or any website. With an intuitive interface and customizable tools, you can choose:

-   **The length of the password**, ranging from a minimum of 4 characters to a maximum of 32.
-   **Include letters (a-z, A-Z)**.
-   **Add numbers (0-9)**.
-   **Include special characters** like **!$%?€**, for added complexity.

Each generated password is random and unique, eliminating any risk of predictability. Additionally, you can copy the generated password with a single click to paste it where needed.

* * *

### Where Can You Find It?

You can install the **Password Generator** extension directly from the Chrome Web Store:  
? **[Password Generator on Chrome Web Store](https://chrome.google.com/webstore/detail/password-generator)**

If you're a developer or want to contribute to the project, you can find the source code on GitHub:  
? **[Password Generator on GitHub](https://github.com/paoloronco/password-generator)**

* * *

### Base Code of the Extension

Below is the base code of the extension, which includes three main files: **popup.html**, **script.js** and **style.css**.

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
}

input[type="range"] {
    width: 100%;
}

#length-value {
    display: inline-block;
    margin-left: 10px;
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

### Required Icons

For the extension, three icons are required with the following dimensions:

1.  **128x128**: for the Chrome Web Store.
2.  **48x48**: for the Chrome menu.
3.  **16x16**: for the toolbar.

The images should be loaded in the main project folder and referenced in the file **manifest.json**.

* * *

### How to Load Custom Extensions on Chrome

1.  Open Chrome and go to **chrome://extensions**.
2.  Enable the **"Developer Mode"** at the top right corner.
3.  Click on **"Load unpacked"** and select the project folder.

The extension will now be visible in your browser.

* * *

### Terms of Use

Re-selling, redistributing or copying the code, the extension or the site is not authorized without the author's consent.

