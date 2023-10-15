import { HealthIndicatorFunction } from '@nestjs/terminus';

export const mockHealth = {
  check: jest
    .fn()
    .mockImplementation((healthIndicators: HealthIndicatorFunction[]) => {
      healthIndicators.map((healthIndicator) => healthIndicator());
      return mockHttp.pingCheck();
    }),
};

export const mockHttp = {
  pingCheck: jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve(mockHealthCheckResult);
        reject({});
      }),
  ),
};

export const mockDb = {
  pingCheck: jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        resolve(mockHealthCheckResult);
        reject({});
      }),
  ),
};

export const mockHealthCheckResult = {
  status: 'ok',
  info: {
    'nestjs-docs': {
      status: 'up',
    },
    database: {
      status: 'up',
    },
  },
  error: {},
  details: {
    'nestjs-docs': {
      status: 'up',
    },
    database: {
      status: 'up',
    },
  },
};
