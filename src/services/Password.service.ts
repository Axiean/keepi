import { PasswordRepository } from '../database/repositories/password.repository';
import { checkSecretKeyExistance, validateSecretKey } from './Secret.service';
import * as readlineSync from 'readline-sync';
import { encrypt } from '../utils/encrypt';
import { errorLog, successLog } from './Logger.service';

const checkSecretValidity = async () => {
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

const checkUniquePassName = async () => {
  let checkUniquePassName = true;
  let passName = '';

  while (checkUniquePassName) {
    passName = readlineSync.question('Enter password name: ');
    checkUniquePassName = await PasswordRepository.existsBy({ passName });
    if (checkUniquePassName) {
      errorLog(`Password named ${passName} exists , Try another name...`);
    }
  }
  return passName;
};

export const setNewPassword = async (password?: string) => {
  const secret = await checkSecretValidity();
  if (!secret) return;

  const passName = await checkUniquePassName();

  if (!password) {
    password = readlineSync.question('Enter your password: ', {
      hideEchoBack: true,
    });
  }

  if (!password || !passName) {
    errorLog('Both password and name are required.');
    return;
  }

  const encryptedPassword = encrypt(password, secret);

  const newPass = PasswordRepository.create({
    encryptedPassword,
    passName,
  });

  await PasswordRepository.save(newPass);

  successLog(`password named ${newPass.passName} created succesfully`);
};

export const getPasswordByName = async (passName?: string) => {
  const secret = await checkSecretValidity();
  if (!secret) return;

  if (!passName) {
    passName = readlineSync.question('Enter password name: ');
  }

  const passwordEntity = await PasswordRepository.findOneBy({ passName });
  if (!passwordEntity) errorLog(`password named ${passName} doesnt exist.`);
};

export const deletePasswordByName = async () => {
  const passName = readlineSync.question('Enter password name: ');
  const passwordEntity = await PasswordRepository.findOneBy({ passName });

  if (!passwordEntity) {
    errorLog('No password found for this name');
    return;
  }

  await PasswordRepository.delete(passwordEntity);
};
