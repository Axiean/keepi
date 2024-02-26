import { SecretRepository } from '../database/repositories/secret.repository';
import * as readlineSync from 'readline-sync';
import { hashString, validateHashedString } from '../utils/hashing';
import { errorLog, successLog, welcomeLog } from './Logger.service';
import { PasswordRepository } from '../database/repositories/password.repository';
import { decrypt, encrypt } from '../utils/encrypt';
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

  const secret = readlineSync.question('Set new secret-key: ', {
    hideEchoBack: true,
  });

  let reEnteredSecret: string;

  while (secret !== reEnteredSecret) {
    reEnteredSecret = readlineSync.question('Re-enter secret-key: ', {
      hideEchoBack: true,
    });
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
  const { secret: storedSecretKey } = await SecretRepository.findOneBy({});
  return validateHashedString(secretKey, storedSecretKey);
};

export const checkSecretValidity = async () => {
  const hasSecretKey = await checkSecretKeyExistance();
  let validSecret = false;
  let enteredSecret = '';

  while (!validSecret) {
    if (hasSecretKey) {
      enteredSecret = readlineSync.question('Enter your secret key: ', {
        hideEchoBack: true,
      });

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

  currentSecret = readlineSync.question('Enter your current secret key:', {
    hideEchoBack: true,
  });
  currentSecretValidity = await validateSecretKey(currentSecret);

  while (!currentSecretValidity) {
    errorLog('Wrong secret Key! ');
    currentSecret = readlineSync.question('Re-enter your secret key:', {
      hideEchoBack: true,
    });
  }

  newSecretKey = readlineSync.question('Enter new secret key:', {
    hideEchoBack: true,
  });

  reRnteredNewSecretKey = readlineSync.question('Re-enter new secret key:', {
    hideEchoBack: true,
  });

  while (newSecretKey !== reRnteredNewSecretKey) {
    errorLog('Re-entered key does not match!');
    reRnteredNewSecretKey = readlineSync.question('Re-enter your secret key:', {
      hideEchoBack: true,
    });
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
