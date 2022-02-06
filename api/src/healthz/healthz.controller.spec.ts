import { Test, TestingModule } from '@nestjs/testing';
import { HealthzController } from './healthz.controller';
import { HealthzService } from './healthz.service';
import { mockHealthCheckResult } from './healthz.mock';

describe('HealthzController', () => {
  let controller: HealthzController;
  const mockHealthzService = {
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
      controllers: [HealthzController],
      providers: [
        {
          provide: HealthzService,
          useValue: mockHealthzService,
        },
      ],
    }).compile();

    controller = module.get<HealthzController>(HealthzController);
  });

  it('should respond with health check', async () => {
    expect(controller).toBeDefined();
    const resp = await controller.check();
    expect(resp).toBeDefined();
    expect(resp.status).toBe('ok');
  });
});
