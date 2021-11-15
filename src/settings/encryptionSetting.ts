import { isDevMode } from '/@/utils/env';

// System default cache time, in seconds
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

// aes encryption key
export const cacheCipher = {
  key: '17afb98ddedfe4a0',
  iv: '98110ce61b4be268',
};

// Whether the system cache is encrypted using aes
export const enableStorageEncryption = !isDevMode();
