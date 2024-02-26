import { Command } from 'commander';
import { decrypt } from './utils/encrypt';
import * as readlineSync from 'readline-sync';
import { setSecret } from './services/Secret.service';
import {
  deletePasswordByName,
  getPasswordByName,
  setNewPassword,
} from './services/Password.service';

export const displayMenuAndGetOption = (): string => {
  const menuOptions = [
    'Enter new Password',
    'Find Password',
    'Delete password',
    'Set/Edit secret key',
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
    case 'Set/Edit secret key':
      setSecret();
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
