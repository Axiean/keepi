import { PasswordRepository } from '../database/repositories/password.repository';
import { checkSecretValidity } from './Secret.service';
import * as readlineSync from 'readline-sync';
import { decrypt, encrypt } from '../utils/encrypt';
import { errorLog, successLog, warnLog } from './Logger.service';
import { Table } from 'console-table-printer';

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
  const decryptedPassword = decrypt(passwordEntity.encryptedPassword, secret);

  successLog(`your password for ${passName} is: `);
  console.log(decryptedPassword);
  return;
};

export const deletePasswordByName = async () => {
  const secret = await checkSecretValidity();
  if (!secret) return;

  const passName = readlineSync.question('Enter password name: ');
  const passwordEntity = await PasswordRepository.findOneBy({ passName });

  if (!passwordEntity) {
    errorLog('No password found for this name');
    return;
  }

  await PasswordRepository.delete(passwordEntity);
  successLog(`Password named ${passName} deleted.`);
};

export const showPasswordsList = async () => {
  const secret = await checkSecretValidity();
  if (!secret) return;

  const passwordsName = await PasswordRepository.find({
    select: {
      passName: true,
      id: true,
      created_at: true,
    },
  });

  if (passwordsName.length === 0) {
    warnLog('You have no passwords yet!');
    return;
  }

  const table = new Table();

  passwordsName.forEach((item) => {
    table.addRow({
      id: item.id,
      'password name': item.passName,
      createdAt: item.created_at,
    });
  });
  table.printTable();
};
