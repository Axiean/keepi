import { SecretRepository } from '../database/repositories/secret.repository';
import { hashString, validateHashedString } from '../utils/hashing';
import { errorLog, successLog, welcomeLog } from './Logger.service';
import { PasswordRepository } from '../database/repositories/password.repository';
import { decrypt, encrypt } from '../utils/encrypt';
import { askForSensetive } from './Readline.service';
const chalk = require('chalk');

export async function setSecret() {
  try {
    const secretExists = await SecretRepository.exists({});

    if (secretExists) {
      errorLog('Already have secret key');
      return;
    }
  } catch (error) {
    console.log(error);
  }

  console.log(
    `${chalk.bold.yellow.underline('Attention:')}
    ${chalk.bold(
      'To enhance the security of your account, you need to set a secret key. This key is crucial for encrypting and decrypting your sensitive information, especially passwords.',
    )}
  `,
  );

  const secret = askForSensetive('Set new secret-key: ');

  let reEnteredSecret: string = '';

  while (secret !== reEnteredSecret) {
    reEnteredSecret = askForSensetive('Re-enter secret-key: ');
  }

  const hashedSecret = hashString(secret);

  const secretEntity = SecretRepository.create({
    secret: hashedSecret,
  });

  await SecretRepository.save(secretEntity);

  successLog(
    'Your secret key has been successfully added. This key is crucial for encrypting and decrypting your sensitive information, especially passwords.',
  );
}

export async function checkSecretKeyExistance() {
  try {
    return await SecretRepository.exists({});
  } catch (error) {
    console.log(error);
  }
}

export async function askForNewSecret() {
  const secretExistance = await checkSecretKeyExistance();

  if (secretExistance) {
    return;
  } else {
    welcomeLog();
    await setSecret();
  }
}

export const validateSecretKey = async (
  secretKey: string,
): Promise<boolean> => {
  const secretEntity = await SecretRepository.findOneBy({});

  return validateHashedString(secretKey, secretEntity?.secret);
};

export const checkSecretValidity = async () => {
  const hasSecretKey = await checkSecretKeyExistance();
  let validSecret = false;
  let enteredSecret = '';

  while (!validSecret) {
    if (hasSecretKey) {
      enteredSecret = askForSensetive('Enter your secret key: ');

      validSecret = await validateSecretKey(enteredSecret);

      if (!validSecret) {
        errorLog('Secret key does not match! Please try again.');
      } else {
        return enteredSecret;
      }
    }
  }
};

export const editSecretKey = async () => {
  let currentSecretValidity: boolean = false;
  let currentSecret: string;
  let newSecretKey: string;
  let reRnteredNewSecretKey: string;

  currentSecret = askForSensetive('Enter your current secret key:');
  currentSecretValidity = await validateSecretKey(currentSecret);

  while (!currentSecretValidity) {
    errorLog('Wrong secret Key! ');
    currentSecret = askForSensetive('Re-enter your secret key:');
  }

  newSecretKey = askForSensetive('Enter new secret key:');

  reRnteredNewSecretKey = askForSensetive('Re-enter new secret key:');

  while (newSecretKey !== reRnteredNewSecretKey) {
    errorLog('Re-entered key does not match!');
    reRnteredNewSecretKey = askForSensetive('Re-enter your secret key:');
  }

  const hashedSecret = hashString(newSecretKey);
  await SecretRepository.update(
    {},
    {
      secret: hashedSecret,
    },
  );

  const allPasswords = await PasswordRepository.find({});

  const decryptedPasswords = allPasswords.map((password) => {
    const decryptedPassword = decrypt(
      password.encryptedPassword,
      currentSecret,
    );
    return { ...password, decryptedPassword };
  });

  const encryptedPasswords = decryptedPasswords.map((password) => {
    const reEncryptedPassword = encrypt(
      password.decryptedPassword,
      newSecretKey,
    );
    return { ...password, encryptedPassword: reEncryptedPassword };
  });

  await PasswordRepository.save(encryptedPasswords);

  successLog('Secret key updated succefully!');

  return;
};
