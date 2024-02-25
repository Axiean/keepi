/// <reference types="node" />
export declare function deriveKey(key: string, salt: string): Buffer;
export declare function encrypt(text: string, key: string): string;
export declare function decrypt(encryptedText: string, key: string): string;
