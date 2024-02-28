import * as crypto from 'crypto';

const ENCRYPTION_CONFIG = {
  ALGORITHM: 'aes-256-gcm' as crypto.CipherGCMTypes,
  ITERATIONS: 100000,
  KEY_LENGTH: 32,
};

export function deriveKey(key: string, salt: string): Buffer {
  if (typeof key !== 'string' || typeof salt !== 'string') {
    // throw new ForbiddenException('Both key and salt must be strings.');
  }
  const derivedKey = crypto.pbkdf2Sync(
    key,
    salt,
    ENCRYPTION_CONFIG.ITERATIONS,
    ENCRYPTION_CONFIG.KEY_LENGTH,
    'sha512',
  );
  return derivedKey;
}

export function encrypt(text: string, key: string): string | undefined {
  if (!text) return;
  if (typeof text !== 'string' || typeof key !== 'string') {
    // throw new ForbiddenException('Both text and key must be strings.');
  }
  try {
    const derivedKey = deriveKey(key, 'salt');
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      ENCRYPTION_CONFIG.ALGORITHM,
      derivedKey,
      iv,
    );
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    // Return the IV, authTag, and the encrypted text
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  } catch (error) {
    // throw new BadRequestException('Encryption failed');
  }
}

export function decrypt(
  encryptedText: string,
  key: string,
): string | undefined {
  if (!encryptedText) return;
  if (typeof encryptedText !== 'string' || typeof key !== 'string') {
    // throw new ForbiddenException('Both encryptedText and key must be strings.');
  }

  try {
    const derivedKey = deriveKey(key, 'salt');
    const textParts = encryptedText.split(':');
    const iv = Buffer.from(textParts.shift() || '', 'hex');
    const authTag = Buffer.from(textParts.shift() || '', 'hex');
    const encryptedTextBuffer = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(
      ENCRYPTION_CONFIG.ALGORITHM,
      derivedKey,
      iv,
    );
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedTextBuffer, undefined, 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    // throw new BadRequestException('Decryption failed');
  }
}
