import { PasswordRepository } from '../database/repositories/password.repository';
import { checkSecretKey, validateSecretKey } from './Secret.service';
import { LOG_COLORS } from '../config/log-colors';
import * as readlineSync from 'readline-sync';
import { encrypt } from '../utils/encrypt';

export const getPasswordByName = async (passName: string) => {
  return await PasswordRepository.findOneBy({ passName });
};

export const setNewPassword = async () => {
  const hasSecretKey = await checkSecretKey();

  let validSecret = false;

  while (!validSecret) {
    if (hasSecretKey) {
      const secretKey = readlineSync.question('Enter your secret key: ', {
        hideEchoBack: true,
      });

      validSecret = await validateSecretKey(secretKey);

      if (!validSecret) {
        console.log(
          LOG_COLORS.FgRed,
          'Secret key does not match! Please try again.',
          LOG_COLORS.FgWhite,
        );
      }
    }
  }

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

  const newPass = PasswordRepository.create({
    encryptedPassword,
    passName,
  });

  await PasswordRepository.save(newPass);
};

export const deletePasswordByName = async () => {
  const passName = readlineSync.question('Enter password name: ');
  const passwordEntity = await PasswordRepository.findOneBy({ passName });

  if (!passwordEntity) {
    console.log(LOG_COLORS.FgRed, 'No password found for this name');
    return;
  }

  await PasswordRepository.remove(passwordEntity);
};
