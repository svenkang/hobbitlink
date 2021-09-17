import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '../logger/logger.service';
import { UrlsService } from './urls.service';
import { mockCreateUrlDto } from './urls.mock';

describe('UrlsService', () => {
  let service: UrlsService;
  const mockLogger = {
    setContext: jest.fn().mockImplementation(),
    debug: jest.fn().mockImplementation(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlsService,
        {
          provide: LoggerService,
          useValue: mockLogger,
        },
      ],
    }).compile();

    service = module.get<UrlsService>(UrlsService);
  });

  it('should use provided hobbit link', () => {
    const hobbitLink = service.createHobbitLink(mockCreateUrlDto);
    expect(hobbitLink).toBeDefined();
    expect(hobbitLink.url).toBe('http://google.com');
    expect(hobbitLink.hobbitLink).toBe('wtd_g');
  });

  it('should create a new hobbit link', () => {
    const hobbitLink = service.createHobbitLink({ url: 'http://google.com' });
    expect(hobbitLink).toBeDefined();
    expect(hobbitLink.url).toBe('http://google.com');
    expect(hobbitLink.hobbitLink).toBeDefined();
    expect(hobbitLink.hobbitLink.length).toBe(5);
  });
});
