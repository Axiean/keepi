"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = exports.deriveKey = void 0;
const crypto = require("crypto");
const ENCRYPTION_CONFIG = {
    ALGORITHM: "aes-256-gcm",
    ITERATIONS: 100000,
    KEY_LENGTH: 32,
};
function deriveKey(key, salt) {
    if (typeof key !== "string" || typeof salt !== "string") {
    }
    const derivedKey = crypto.pbkdf2Sync(key, salt, ENCRYPTION_CONFIG.ITERATIONS, ENCRYPTION_CONFIG.KEY_LENGTH, "sha512");
    return derivedKey;
}
exports.deriveKey = deriveKey;
function encrypt(text, key) {
    if (!text)
        return null;
    if (typeof text !== "string" || typeof key !== "string") {
    }
    try {
        const derivedKey = deriveKey(key, "salt");
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(ENCRYPTION_CONFIG.ALGORITHM, derivedKey, iv);
        let encrypted = cipher.update(text, "utf8", "hex");
        encrypted += cipher.final("hex");
        const authTag = cipher.getAuthTag();
        return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
    }
    catch (error) {
    }
}
exports.encrypt = encrypt;
function decrypt(encryptedText, key) {
    if (!encryptedText)
        return null;
    if (typeof encryptedText !== "string" || typeof key !== "string") {
    }
    try {
        const derivedKey = deriveKey(key, "salt");
        const textParts = encryptedText.split(":");
        const iv = Buffer.from(textParts.shift(), "hex");
        const authTag = Buffer.from(textParts.shift(), "hex");
        const encryptedTextBuffer = Buffer.from(textParts.join(":"), "hex");
        const decipher = crypto.createDecipheriv(ENCRYPTION_CONFIG.ALGORITHM, derivedKey, iv);
        decipher.setAuthTag(authTag);
        let decrypted = decipher.update(encryptedTextBuffer, undefined, "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    }
    catch (error) {
    }
}
exports.decrypt = decrypt;
//# sourceMappingURL=encrypt.js.map