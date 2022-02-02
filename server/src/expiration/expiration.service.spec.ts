import { Test, TestingModule } from '@nestjs/testing';
import { ExpirationService } from './expiration.service';

describe('ExpirationService', () => {
  let service: ExpirationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [],
    }).compile();

    service = module.get<ExpirationService>(ExpirationService);
  });

  it('should return valid expiration service', async () => {
    expect(service).toBeDefined();
  });
});
