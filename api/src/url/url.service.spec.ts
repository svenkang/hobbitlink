import { Test, TestingModule } from '@nestjs/testing';
import { UrlsService } from './url.service';
import {
  mockCreateUrlDto,
  mockExpiration,
  mockLogger,
  mockRepository,
} from './url.mock';
import { ExpirationService } from '../expiration/expiration.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Url } from './url.entity';
import { PaginationQueryDto } from './url.get.dto';
import { Logger } from '@nestjs/common';

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
          provide: Logger,
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

  it('should get all urls', async () => {
    const paginationQuery: PaginationQueryDto = {};
    const urls = await service.getUrls(paginationQuery);
    expect(urls).toBeDefined();
    expect(urls.length).toBe(4);
    expect(urls[0].clicks).toBe(0);
  });

  it('should get limited urls', async () => {
    const paginationQuery: PaginationQueryDto = {
      limit: 2,
      offset: 1,
      order: true,
    };
    const urls = await service.getUrls(paginationQuery);
    expect(urls).toBeDefined();
    expect(urls.length).toBe(2);
    expect(urls[0].clicks).toBe(0);
  });
});
