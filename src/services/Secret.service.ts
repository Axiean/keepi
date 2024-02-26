import { SecretRepository } from '../database/repositories/secret.repository';
import * as readlineSync from 'readline-sync';
import { hashString, validateHashedString } from '../utils/hashing';
import { errorLog } from './Logger.service';

export async function setSecret() {
  const secretExists = await this.secretRepository.exists({});

  if (secretExists) {
    errorLog('Already have secret key');
    return;
  }

  const secret = readlineSync.question('Enter new secret-key: ', {
    hideEchoBack: true,
  });

  const hashedSecret = hashString(secret);

  const secretEntity = this.secretRepository.create({
    secret: hashedSecret,
  });

  await this.secretRepository.save(secretEntity);
}

export async function checkSecretKeyExistance() {
  return await SecretRepository.existsBy({});
}

export const validateSecretKey = async (
  secretKey: string,
): Promise<boolean> => {
  const { secret: storedSecretKey } = await SecretRepository.findOneBy({});
  return validateHashedString(secretKey, storedSecretKey);
};
