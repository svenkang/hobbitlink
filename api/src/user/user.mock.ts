import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CryptoService } from 'src/crypto/crypto.service';
import { Logger } from '@nestjs/common';

export const mockUserRepository = {
  findOneBy: jest.fn((options: any) => {
    if (options?.username == 'unique-user') {
      return null;
    }
    return mockUsers[0];
  }),
  find: jest.fn(() => mockUsers),
  findOne: jest.fn(() => mockUsers[0]),
  save: jest.fn((options: any) => options),
  delete: jest.fn((options: any) => options),
} as unknown as Repository<User>;

export const mockCryptoService = {
  getHmac: jest.fn(() => ({
    key: 'mockKey',
    hash: 'mockHash',
  })),
} as unknown as CryptoService;

export const mockLogger = {
  error: jest.fn(),
  debug: jest.fn(),
} as unknown as Logger;

export const mockUsers = [
  {
    username: 'user1',
    password: 'password1',
    passwordKey: 'key1',
    userTier: 'basic',
  },
  {
    username: 'user2',
    password: 'password2',
    passwordKey: 'key2',
    userTier: 'pro',
  },
  {
    username: 'user3',
    password: 'password3',
    passwordKey: 'key3',
    userTier: 'super',
  },
];
