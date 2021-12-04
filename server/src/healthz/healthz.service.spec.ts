import {
  HealthCheckService,
  HealthIndicatorFunction,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthzService } from './healthz.service';
import { mockHealthCheckResult } from './healthz.mock';

describe('HealthzService', () => {
  let service: HealthzService;
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
        HealthzService,
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

    service = module.get<HealthzService>(HealthzService);
  });

  it('should return valid health check', async () => {
    expect(service).toBeDefined();
    const resp = await service.checkAll();
    expect(resp).toBeDefined();
    expect(resp.status).toBe('ok');
  });
});
