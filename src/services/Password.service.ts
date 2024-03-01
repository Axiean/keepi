import { PasswordRepository } from '../database/repositories/password.repository';
import { checkSecretValidity } from './Secret.service';
import { decrypt, encrypt } from '../utils/encrypt';
import { boxedLog, errorLog, successLog, warnLog } from './Logger.service';
import { Table } from 'console-table-printer';
import { PASSWORD_CONFIG } from '../config/password.config';
import { askForSensetive, askForUsual } from './Readline.service';
import moment from 'moment';

export const setNewPassword = async (password?: string) => {
  const secret = await checkSecretValidity();
  if (!secret) return;
  const passName = await askForUniquePasswordName();
  if (!password) {
    password = askForSensetive('Enter your password: ');
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
    passName = askForUsual('Enter password name: ');
  }

  const passwordEntity = await PasswordRepository.findOneBy({ passName });
  if (!passwordEntity) errorLog(`password named ${passName} doesnt exist.`);
  const decryptedPassword = decrypt(passwordEntity.encryptedPassword, secret);

  boxedLog(passName, decryptedPassword);
  return;
};

export const deletePasswordByName = async () => {
  const secret = await checkSecretValidity();
  if (!secret) return;

  const passName = askForUsual('Enter password name: ');
  const passwordEntity = await PasswordRepository.findOneBy({ passName });

  if (!passwordEntity) {
    errorLog('No password found for this name');
    return;
  }

  try {
    await PasswordRepository.remove(passwordEntity);
    successLog(`Password named ${passName} deleted.`);
    return;
  } catch (error) {
    console.log(error);
  }
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
      createdAt: moment(item.created_at).format('llll'),
    });
  });
  table.printTable();
};

export async function generatePassword(
  length: number = PASSWORD_CONFIG.defaultLength,
  useNumber: boolean,
  useLetter: boolean,
  useCharacters: boolean,
) {
  if (!useNumber && !useLetter && !useCharacters) {
    useNumber = useLetter = useCharacters = true;
  }

  const categories: string[] = [];
  if (useNumber) categories.push(PASSWORD_CONFIG.numbers);
  if (useLetter) categories.push(PASSWORD_CONFIG.letters);
  if (useCharacters) categories.push(PASSWORD_CONFIG.characters);

  if (categories.length === 0) {
    throw new Error(
      'At least one category (number, letter, or characters) must be selected.',
    );
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const selectedCategory =
      categories[Math.floor(Math.random() * categories.length)];
    const selectedChar =
      selectedCategory[Math.floor(Math.random() * selectedCategory.length)];
    password += selectedChar;
  }

  boxedLog('Generated Password', password);
}

const askForUniquePasswordName = async () => {
  let passName = '';

  while (true) {
    passName = askForUsual('Enter password name: ');
    const isUnique = await PasswordRepository.existsBy({ passName });

    if (!isUnique) {
      break;
    }

    errorLog(`Password named ${passName} exists, try another name...`);
  }

  return passName;
};
