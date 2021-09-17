import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: 'ts-jest',
    coveragePathIgnorePatterns: [
      '<rootDir>/node_modules/',
      '<rootDir>/build/',
      'module',
      'middleware',
      'dto',
      'configuration',
      'mock',
      'main.ts',
    ],
    coverageThreshold: {
      global: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,
      },
    },
  };
};
