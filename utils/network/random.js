import utils from '@vite/vitejs-utils';

const pool = 'Uint8ArdomValuesObj012345679BCDEFGHIJKLMNPQRSTWXYZ_cfghkpqvwxyz-';

export function random(size = 8) {
  let id = '';
  if (process.browser) {
    const bytes = window.crypto && window.Uint8Array ? window.crypto.getRandomValues(new Uint8Array(size)) : utils.ed25519.random(size);
    while (0 < size--) {
      id += pool[bytes[size] & (pool.length - 1)];
    }
  }
  return id;
}
