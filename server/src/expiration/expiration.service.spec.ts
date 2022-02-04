import { Test, TestingModule } from '@nestjs/testing';
import { addDays } from 'date-fns';
import { ExpirationService } from './expiration.service';

describe('ExpirationService', () => {
  let service: ExpirationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpirationService],
    }).compile();

    service = module.get<ExpirationService>(ExpirationService);
  });

  it('should return valid expiration service', () => {
    expect(service).toBeDefined();
  });

  it('should return correct expiration date', () => {
    const today = new Date('2022-01-01T00:00:00.000Z');
    const tomorrow = new Date('2022-01-02T00:00:00.000Z');
    const expirationDate = service.getExpirationDate(today).toDateString();
    expect(expirationDate).toBeDefined();
    expect(expirationDate).toBe(tomorrow.toDateString());
  });

  it('should return correct expiration date without params', () => {
    const today = new Date();
    const tomorrow = addDays(today, 1);
    const expirationDate = service.getExpirationDate().toDateString();
    expect(expirationDate).toBeDefined();
    expect(expirationDate).toBe(tomorrow.toDateString());
  });
});
