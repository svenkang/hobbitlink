import {
  HealthCheckService,
  HealthIndicatorFunction,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';
import { mockHealthCheckResult } from './health.mock';

describe('HealthService', () => {
  let service: HealthService;
  const mockHealth = {
    check: jest
      .fn()
      .mockImplementation((healthIndicators: HealthIndicatorFunction[]) => {
        healthIndicators.map((healthIndicator) => healthIndicator());
        return mockHttp.pingCheck();
      }),
  };
  const mockHttp = {
    pingCheck: jest.fn().mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          resolve(mockHealthCheckResult);
          reject({});
        }),
    ),
  };
  const mockDb = {
    pingCheck: jest.fn().mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          resolve(mockHealthCheckResult);
          reject({});
        }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: HttpHealthIndicator,
          useValue: mockHttp,
        },
        {
          provide: HealthCheckService,
          useValue: mockHealth,
        },
        {
          provide: TypeOrmHealthIndicator,
          useValue: mockDb,
        },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should return valid health check', async () => {
    expect(service).toBeDefined();
    const resp = await service.checkAll();
    expect(resp).toBeDefined();
    expect(resp.status).toBe('ok');
  });
});
