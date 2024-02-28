import { Command } from 'commander';
import * as readlineSync from 'readline-sync';
import { askForNewSecret, editSecretKey } from './services/Secret.service';
import {
  deletePasswordByName,
  generatePassword,
  getPasswordByName,
  setNewPassword,
  showPasswordsList,
} from './services/Password.service';

export const displayMenuAndGetOption = (): string => {
  const menuOptions = [
    'Enter new Password',
    'Find Password',
    'Delete password',
    'Edit secret key',
    'Passwords list',
  ];
  const index = readlineSync.keyInSelect(menuOptions, 'Select an option:');

  if (index === -1) {
    console.log('Exiting...');
    process.exit(0);
  }

  return menuOptions[index];
};

export const executeMenuOption = (selectedOption: string): void => {
  switch (selectedOption) {
    case 'Enter new Password':
      setNewPassword();
      break;
    case 'Find Password':
      getPasswordByName();
      break;
    case 'Delete password':
      deletePasswordByName();
      break;
    case 'Edit secret key':
      editSecretKey();
      break;
    case 'Passwords list':
      showPasswordsList();
      break;
    default:
      console.log('Invalid option');
      break;
  }
};

export const main = async () => {
  const program = new Command();

  program
    .description(
      'Keepi is a npm package that allows users to securely store and manage passwords locally on their own machine.',
    )
    .action(async () => {
      await askForNewSecret();
      const selectedOption = displayMenuAndGetOption();
      console.log(`You selected: ${selectedOption}`);
      executeMenuOption(selectedOption);
    });

  const options = program.opts();

  // console.log(options);

  program.command('set <password>').action(async (password) => {
    setNewPassword(password);
  });

  program.command('get <passName>').action(async (passName) => {
    getPasswordByName(passName);
  });

  program
    .command('g')
    .option('-l, --length <length>', 'Length of the password', parseInt)
    .option('-n, --number', 'Include numbers in the password')
    .option('-c, --character', 'Include special characters in the password')
    .option('-t, --letter', 'Include letters in the password')
    .action(async (options) => {
      generatePassword(
        options.length,
        options.number,
        options.letter,
        options.character,
      );
      return;
    });

  program.parse(process.argv);
};
