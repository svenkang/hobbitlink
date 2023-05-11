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

  it('should respond with health check', async () => {
    expect(controller).toBeDefined();
    const resp = await controller.check();
    expect(resp).toBeDefined();
    expect(resp.status).toBe('ok');
  });
});
