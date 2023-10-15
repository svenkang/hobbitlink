import { Injectable } from '@nestjs/common';
import {
  DIGEST_STRATEGY,
  ENCRYPTION_ALGORITHM,
  Hmac,
  PASSWORD_KEY_MAX_CHAR,
} from './crypto.interface';
import { nanoid } from 'nanoid';
import { createHmac } from 'crypto';

@Injectable()
export class CryptoService {
  /**
   * Given the plaintext, it returns the HMAC
   * and the key used to hash the plaintext
   *
   * @param plaintext
   * @param key
   * @returns Hmac
   */
  public getHmac(
    plaintext: string,
    key: string = nanoid(PASSWORD_KEY_MAX_CHAR),
  ): Hmac {
    const hash = createHmac(ENCRYPTION_ALGORITHM, key)
      .update(plaintext)
      .digest(DIGEST_STRATEGY);

    return {
      key,
      hash,
    };
  }

  /**
   * Compares the given ciphertext with plaintext and key
   *
   * @param plaintext
   * @param ciphertext
   * @param key
   * @returns
   */
  public compareHmac(plaintext: string, ciphertext: string, key: string) {
    const { hash } = this.getHmac(plaintext, key);
    if (hash === ciphertext) {
      return true;
    }
    return false;
  }
}
