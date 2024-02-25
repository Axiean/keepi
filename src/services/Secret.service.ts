import { LOG_COLORS } from '../config/log-colors';
import { SecretRepository } from '../database/repositories/secret.repository';
import * as readlineSync from 'readline-sync';
import { hashString, validateHashedString } from '../utils/hashing';

export async function setSecret() {
  const secretExists = await this.secretRepository.exists({});

  if (secretExists) {
    console.error(LOG_COLORS.FgRed, 'Already have secret key');
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

export async function checkSecretKey() {
  return await SecretRepository.existsBy({});
}

export const validateSecretKey = async (
  secretKey: string,
): Promise<boolean> => {
  const { secret: storedSecretKey } = await SecretRepository.findOneBy({});
  return validateHashedString(secretKey, storedSecretKey);
};
