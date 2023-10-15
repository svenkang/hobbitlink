import {
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';
import { mockDb, mockHealth, mockHttp } from './health.mock';

describe('HealthService', () => {
  let service: HealthService;

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

  it('should return valid liveness check', async () => {
    expect(service).toBeDefined();
    const resp = service.checkLiveness();
    expect(resp).toBeDefined();
    expect(resp.status).toBe('ok');
  });

  it('should return valid readiness check', async () => {
    expect(service).toBeDefined();
    const resp = await service.checkAll();
    expect(resp).toBeDefined();
    expect(resp.status).toBe('ok');
  });
});
