import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '../logger/logger.service';
import { UrlsService } from './urls.service';
import {
  mockCreateUrlDto,
  mockExpiration,
  mockLogger,
  mockRepository,
} from './urls.mock';
import { ExpirationService } from './../expiration/expiration.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Url } from './urls.entity';

describe('UrlsService', () => {
  let service: UrlsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlsService,
        {
          provide: getRepositoryToken(Url),
          useValue: mockRepository,
        },
        {
          provide: LoggerService,
          useValue: mockLogger,
        },
        {
          provide: ExpirationService,
          useValue: mockExpiration,
        },
      ],
    }).compile();

    service = module.get<UrlsService>(UrlsService);
  });

  it('should use provided hobbit link', async () => {
    const hobbitLink = await service.createHobbitLink(mockCreateUrlDto);
    expect(hobbitLink).toBeDefined();
    expect(hobbitLink.url).toBe('https://google.com');
    expect(hobbitLink.hobbitLink).toBe('wtd_g');
  });

  it('should create a new hobbit link', async () => {
    const hobbitLink = await service.createHobbitLink({
      url: 'https://google.com',
    });
    expect(hobbitLink).toBeDefined();
    expect(hobbitLink.url).toBe('https://google.com');
    expect(hobbitLink.hobbitLink).toBeDefined();
    expect(hobbitLink.hobbitLink.length).toBe(7);
  });
});
