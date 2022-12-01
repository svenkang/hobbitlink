import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Url } from '../url/url.entity';
import { ProxyController } from './proxy.controller';
import { GetProxyUrlDto } from './proxy.dto';
import { mockHobbitLink, mockRepository } from './proxy.mock';
import { ProxyService } from './proxy.service';

describe('ProxyService', () => {
  let proxyService: ProxyService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProxyController],
      providers: [
        ProxyService,
        {
          provide: getRepositoryToken(Url),
          useValue: mockRepository,
        },
      ],
    }).compile();

    proxyService = moduleRef.get<ProxyService>(ProxyService);
  });

  describe('toUrl', () => {
    it('should return a valid url', async () => {
      const getProxyUrlDto: GetProxyUrlDto = {
        hobbitLink: mockHobbitLink,
      };
      const url = await proxyService.toUrl(getProxyUrlDto);
      expect(url).toBeDefined();
      expect(url.url).toBe('https://www.google.com');
    });

    it('should return empty for invalid url', async () => {
      const getProxyUrlDto: GetProxyUrlDto = {
        hobbitLink: 'dhf_rs',
      };
      const url = await proxyService.toUrl(getProxyUrlDto);
      expect(url).toBeUndefined();
    });
  });
});
