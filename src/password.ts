import { Command } from 'commander';
import { decrypt, encrypt } from './utils/encrypt';
import { Password } from './database/entities/password.entity';
import { dataSource } from '../ormconfig';
import * as readlineSync from 'readline-sync';
import { LOG_COLORS } from './config/log-colors';
import { Secret } from './database/entities/secret.entity';

const SetNewPassword = async () => {
  const passrepo = dataSource.getRepository(Password);
  const passName = readlineSync.question('Enter password name: ');
  const password = readlineSync.question('Enter your password: ', {
    hideEchoBack: true,
    cancel: true,
  });
  if (!password || !passName) {
    console.log('Both password and name are required.');
    return;
  }
  const encryptedPassword = encrypt(password, '1');

  const newPass = passrepo.create({
    encryptedPassword,
    passName,
  });

  await passrepo.save(newPass);
};

const DeletePasswordByName = async () => {
  const passrepo = dataSource.getRepository(Password);
  const passName = readlineSync.question(
    'Enter password name you want to delete: ',
  );
  const passwordEntity = await passrepo.findOneBy({
    passName,
  });

  if (!passwordEntity)
    return console.log(LOG_COLORS.FgRed, 'no passwoed found for this name');
};

const SetSecret = async () => {
  const secretRepo = dataSource.getRepository(Secret);
  const secretExists = await secretRepo.exists({});
  if (secretExists) console.error(LOG_COLORS.FgRed, 'already have secret key');

  const secret = readlineSync.questionNewPassword('enter new secret-key : ');

  const secretEntity = secretRepo.create({
    secret,
  });

  await secretRepo.save(secretEntity);
};

export const main = async () => {
  const program = new Command();
  const passrepo = dataSource.getRepository(Password);

  program.description('An application for displaying a password').parse();

  const options = program.opts();

  if (program.args.length === 0) {
    const menuOptions = [
      'Enter new Password',
      'Delete password',
      'Set/Edit secret key',
    ];
    const index = readlineSync.keyInSelect(menuOptions, 'Select an option:');

    if (index === -1) {
      console.log('Exiting...');
      return;
    }

    const selectedOption = menuOptions[index];

    console.log(`You selected: ${selectedOption}`);

    switch (selectedOption) {
      case menuOptions[0]:
        SetNewPassword();
        break;
      case menuOptions[1]:
        DeletePasswordByName();
        break;
      case menuOptions[2]:
        SetSecret();
        break;
      default:
        console.log('Invalid option');
        break;
    }

    return;
  }

  program.command('enc <password>').action(async (password) => {
    const encryptedPassword = encrypt(password, '1');

    const newpass = await passrepo.save({
      encryptedPassword,
    });

    console.log(newpass.id);
  });

  program.command('dec <password>').action((password) => {
    const decryptedPass = decrypt(password, '1');
    console.log(decryptedPass);
  });

  program.command('get <passName>').action(async (passName) => {
    const pass = await passrepo.findOneBy({ passName });

    if (!pass) {
      console.log(`No password found with name ${passName}`);
      return;
    }

    const decryptedPass = decrypt(pass.encryptedPassword, '1');
    console.log(decryptedPass);
  });

  program.parse(process.argv);
};
