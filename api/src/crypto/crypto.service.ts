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
   * @returns Hmac
   */
  public getHmac(plaintext: string): Hmac {
    const key = nanoid(PASSWORD_KEY_MAX_CHAR);
    const hash = createHmac(ENCRYPTION_ALGORITHM, key)
      .update(plaintext)
      .digest(DIGEST_STRATEGY);

    return {
      key,
      hash,
    };
  }
}
