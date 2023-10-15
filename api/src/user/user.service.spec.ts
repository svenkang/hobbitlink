import { TestingModule, Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Logger } from '@nestjs/common';
import { CryptoService } from './../crypto/crypto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './user.create.dto';
import {
  mockCryptoService,
  mockLogger,
  mockUserRepository,
  mockUsers,
} from './user.mock';
import { UserTier } from './user.interface';
import { UpdateUserDto } from './user.update.dto';

describe('UserService', () => {
  let userService: UserService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: CryptoService,
          useValue: mockCryptoService,
        },
        {
          provide: Logger,
          useValue: mockLogger,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      username: 'unique-user',
      password: 'pwd',
      userTier: UserTier.BASIC,
    };

    const user = await userService.create(createUserDto);

    expect(user).toBeDefined();
    expect(user.username).toEqual(createUserDto.username);
    expect(user.userTier).toEqual(createUserDto.userTier);
  });

  it('should find all users', async () => {
    const users = await userService.findAll();

    expect(users).toBeDefined();
    expect(users).toEqual(mockUsers);
    expect(mockUserRepository.find).toHaveBeenCalledWith({
      select: {
        id: true,
        username: true,
        userTier: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  });

  it('should find one user', async () => {
    const user = await userService.findOne(1);

    expect(user).toBeDefined();
    expect(user.username).toBe(mockUsers[0].username);
    expect(user.userTier).toBe(mockUsers[0].userTier);
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = {
      username: 'test-user',
      userTier: UserTier.PRO,
    };

    const user = await userService.update(1, updateUserDto);

    expect(user).toBeDefined();
    expect(user.username).toEqual(updateUserDto.username);
    expect(user.userTier).toEqual(updateUserDto.userTier);
  });

  it('should delete a user', async () => {
    expect(await userService.remove(1)).toBeUndefined();
  });
});
