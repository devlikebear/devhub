import { TextDecoder as NodeTextDecoder, TextEncoder as NodeTextEncoder } from 'node:util';
import { webcrypto } from 'node:crypto';

if (!globalThis.crypto) {
  // Vitest runs in Node, so expose Web Crypto implementation for modules that expect it
  (globalThis as unknown as { crypto: Crypto }).crypto = webcrypto as unknown as Crypto;
}

if (typeof globalThis.atob !== 'function') {
  globalThis.atob = (value: string) => Buffer.from(value, 'base64').toString('binary');
}

if (typeof globalThis.btoa !== 'function') {
  globalThis.btoa = (value: string) => Buffer.from(value, 'binary').toString('base64');
}

if (typeof globalThis.TextEncoder === 'undefined') {
  (globalThis as unknown as { TextEncoder: typeof NodeTextEncoder }).TextEncoder = NodeTextEncoder;
}

if (typeof globalThis.TextDecoder === 'undefined') {
  (globalThis as unknown as { TextDecoder: typeof NodeTextDecoder }).TextDecoder = NodeTextDecoder;
}
