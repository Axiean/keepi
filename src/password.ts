import { Command } from 'commander';
import { decrypt } from './utils/encrypt';
import * as readlineSync from 'readline-sync';
import { setSecret } from './services/Secret.service';
import {
  deletePasswordByName,
  setNewPassword,
} from './services/Password.service';

export const main = async () => {
  const program = new Command();

  program.description('An application for displaying a password').parse();

  const options = program.opts();

  if (program.args.length === 0) {
    const menuOptions = [
      'Enter new Password',
      'Find Password',
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
        setNewPassword();
        break;
      case menuOptions[1]:
        // deletePasswordByName();
        break;
      case menuOptions[2]:
        deletePasswordByName();
        break;
      case menuOptions[3]:
        setSecret();
        break;
      default:
        console.log('Invalid option');
        break;
    }

    return;
  }

  program.command('enc <password>').action(async (password) => {
    // const encryptedPassword = encrypt(password, '1');
    // const newPass = await PasswordRepositoryy.save({
    //   encryptedPassword,
    // });
    // console.log(newPass.id);
  });

  program.command('dec <password>').action((password) => {
    const decryptedPass = decrypt(password, '1');
    console.log(decryptedPass);
  });

  program.command('get <passName>').action(async (passName) => {
    // const pass = await getPasswordByName(passName);
    // if (!pass) {
    //   console.log(`No password found with name ${passName}`);
    //   return;
    // }
    // const decryptedPass = decrypt(pass.encryptedPassword, '1');
    // console.log(decryptedPass);
  });

  program.parse(process.argv);
};

// const setNewPassword = async () => {
//   const passrepo = dataSource.getRepository(Password);
//   const secretRepo = dataSource.getRepository(Secret);
//   let secretKey: string = '1';

//   const hasSecretKey = await checkSecretKey();

//   let validSecret = false;

//   while (!validSecret) {
//     if (hasSecretKey) {
//       secretKey = readlineSync.question('Enter your secret key: ', {
//         hideEchoBack: true,
//       });
//       const { secret: storedSecretKey } = await secretRepo.findOneBy({});
//       validSecret = validateHashedString(secretKey, storedSecretKey);

//       if (!validSecret) {
//         console.log(
//           LOG_COLORS.FgRed,
//           'Secret key does not match! Please try again.',
//           LOG_COLORS.FgWhite,
//         );
//       }
//     }
//   }

//   const passName = readlineSync.question('Enter password name: ');
//   const password = readlineSync.question('Enter your password: ', {
//     hideEchoBack: true,
//     cancel: true,
//   });
//   if (!password || !passName) {
//     console.log('Both password and name are required.');
//     return;
//   }
//   const encryptedPassword = encrypt(password, '1');

//   const newPass = passrepo.create({
//     encryptedPassword,
//     passName,
//   });

//   await passrepo.save(newPass);
// };

// const deletePasswordByName = async () => {
//   const passrepo = dataSource.getRepository(Password);
//   const passName = readlineSync.question(
//     'Enter password name you want to delete: ',
//   );
//   const passwordEntity = await passrepo.findOneBy({
//     passName,
//   });

//   if (!passwordEntity)
//     return console.log(LOG_COLORS.FgRed, 'no passwoed found for this name');
// };

// const setSecret = async () => {
//   const secretRepo = dataSource.getRepository(Secret);
//   const secretExists = await secretRepo.exists({});

//   if (secretExists) {
//     console.error(LOG_COLORS.FgRed, 'already have secret key');
//     return;
//   }

//   const secret = readlineSync.question('enter new secret-key : ', {
//     hideEchoBack: true,
//   });

//   const hasedSecret = hashString(secret);

//   const secretEntity = secretRepo.create({
//     secret: hasedSecret,
//   });

//   await secretRepo.save(secretEntity);
// };

// const checkSecretKey = async (): Promise<boolean> => {
//   const secretRepo = dataSource.getRepository(Secret);
//   return await secretRepo.existsBy({});
// };

// export const main = async () => {
//   const program = new Command();
//   const passrepo = dataSource.getRepository(Password);

//   program.description('An application for displaying a password').parse();

//   const options = program.opts();

//   if (program.args.length === 0) {
//     const menuOptions = [
//       'Enter new Password',
//       'Find Password',
//       'Delete password',
//       'Set/Edit secret key',
//     ];
//     const index = readlineSync.keyInSelect(menuOptions, 'Select an option:');

//     if (index === -1) {
//       console.log('Exiting...');
//       return;
//     }

//     const selectedOption = menuOptions[index];

//     console.log(`You selected: ${selectedOption}`);

//     switch (selectedOption) {
//       case menuOptions[0]:
//         setNewPassword();
//         break;
//       case menuOptions[1]:
//         // deletePasswordByName();
//         break;
//       case menuOptions[2]:
//         deletePasswordByName();
//         break;
//       case menuOptions[3]:
//         setSecret();
//         break;
//       default:
//         console.log('Invalid option');
//         break;
//     }

//     return;
//   }

//   program.command('enc <password>').action(async (password) => {
//     const encryptedPassword = encrypt(password, '1');

//     const newpass = await passrepo.save({
//       encryptedPassword,
//     });

//     console.log(newpass.id);
//   });

//   program.command('dec <password>').action((password) => {
//     const decryptedPass = decrypt(password, '1');
//     console.log(decryptedPass);
//   });

//   program.command('get <passName>').action(async (passName) => {
//     const pass = await passrepo.findOneBy({ passName });

//     if (!pass) {
//       console.log(`No password found with name ${passName}`);
//       return;
//     }

//     const decryptedPass = decrypt(pass.encryptedPassword, '1');
//     console.log(decryptedPass);
//   });

//   program.parse(process.argv);
// };
