import { Command } from 'commander';
import * as readlineSync from 'readline-sync';
import {
  askForNewSecret,
  editSecretKey,
  setSecret,
} from './services/Secret.service';
import {
  deletePasswordByName,
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

  program.on('SIGINT', () => process.exit(0));
  process.on('SIGINT', () => {
    console.log('\nExiting...');
    process.exit(0);
  });
  program.description('An application for displaying a password').parse();

  const options = program.opts();

  if (program.args.length === 0) {
    await askForNewSecret();
    const selectedOption = displayMenuAndGetOption();
    console.log(`You selected: ${selectedOption}`);
    executeMenuOption(selectedOption);
    return;
  }

  program.command('set <password>').action(async (password) => {
    setNewPassword(password);
  });

  program.command('get <passName>').action(async (passName) => {
    getPasswordByName(passName);
  });

  program.parse(process.argv);
};
