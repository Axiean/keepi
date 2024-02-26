# Keepi

## Overview

`keepi` is a Node.js npm package that allows users to securely store and manage passwords locally on their own machine. The package encrypts passwords using a user-defined secret key before storing them. It provides a command-line interface (CLI) for easy interaction.

## Installation

To install `keepi`, run the following npm command:

```bash
  npm i keepi@latest
```

## Usage

After installation, use the following command to access the menu:

```javascript
kpi;
```

1. Enter new Password

Prompt the user for a password, secret key, and password name.
Encrypts the password using the provided secret key and stores it locally.

2. Find Password

Search for a stored password by providing the password name.
Decrypts and displays the password if found.

3. Delete Password

Remove a stored password by specifying the password name.
Requires confirmation before deletion.

4. Set/Edit Secret Key

Allows the user to set or edit the secret key used for encryption.

5. CANCEL
   Cancel and exit the menu.

## Contributing

Contributions are always welcome!

Feel free to contribute by reporting issues, suggesting features, or submitting pull requests on the GitHub repository.

## License

`keepi` is licensed under the MIT License - see the [LICENSE](https://github.com/Axiean/keepi/blob/main/LICENCE) file for details.
