# Keepi

## Overview

`keepi` is a npm package that allows users to securely store and manage passwords locally on their own machine. The package encrypts passwords using a user-defined secret key before storing them. It provides a command-line interface (CLI) for easy interaction.

## Installation

To install `keepi`, run the following npm command:

```bash
 sudo npm i -g keepi@latest
```

## Usage

After installation, use the following command to access the menu:

```bash
 kpi
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

4. Edit Secret Key

Allows the user to edit the secret key used for encryption.

5. CANCEL
   Cancel and exit the menu.

## Local Database

When you run the `kpi` command for the first time, `keepi` will create a local database in your home directory (`~`).

All passwords entered using `keepi` will be securely encrypted using the user-provided secret key and stored within this local database. It is important to note that the database is unique to each user and is only accessible from the machine where the `kpi` command is executed.

Ensure the security of your home directory and regularly back up the contents of the local database, especially if you plan to use `keepi` across multiple machines or in case of system upgrades or changes.

## Contributing

Contributions are always welcome!

Feel free to contribute by reporting issues, suggesting features, or submitting pull requests on the [GitHub](https://github.com/Axiean/keepi).

## License

`keepi` is licensed under the MIT License - see the [LICENSE](https://github.com/Axiean/keepi/blob/main/LICENCE) file for details.
