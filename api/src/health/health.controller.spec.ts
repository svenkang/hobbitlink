import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { mockHealthCheckResult } from './health.mock';

describe('HealthController', () => {
  let controller: HealthController;
  const mockHealthService = {
    checkAll: jest.fn().mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          resolve(mockHealthCheckResult);
          reject({});
        }),
    ),
    checkLiveness: jest.fn().mockImplementation(() => mockHealthCheckResult),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: mockHealthService,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should respond with liveness check', async () => {
    expect(controller).toBeDefined();
    const resp = await controller.checkLiveness();
    expect(resp).toBeDefined();
    expect(resp.status).toBe('ok');
  });

  it('should respond with health check', async () => {
    expect(controller).toBeDefined();
    const resp = await controller.checkHealth();
    expect(resp).toBeDefined();
    expect(resp.status).toBe('ok');
  });
});
