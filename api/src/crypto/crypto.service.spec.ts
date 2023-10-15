import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let cryptoService: CryptoService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    cryptoService = app.get<CryptoService>(CryptoService);
  });

  describe('getHmac', () => {
    it('should get hmac with unique key', () => {
      const text = 'Hello';
      const { hash, key } = cryptoService.getHmac(text);
      expect(hash).toBeDefined();
      expect(key).toBeDefined();
      expect(hash === text).toBeFalsy();
    });
  });
});
