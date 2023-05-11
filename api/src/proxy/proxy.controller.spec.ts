import { Test } from '@nestjs/testing';
import { ProxyController } from './proxy.controller';
import { GetProxyUrlDto } from './proxy.read.dto';
import { mockHobbitLink, mockProxyService } from './proxy.mock';
import { ProxyService } from './proxy.service';

describe('ProxyController', () => {
  let proxyController: ProxyController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProxyController],
      providers: [
        {
          provide: ProxyService,
          useValue: mockProxyService,
        },
      ],
    }).compile();

    proxyController = moduleRef.get<ProxyController>(ProxyController);
  });

  describe('toUrl', () => {
    it('should return a valid url', async () => {
      const getProxyUrlDto: GetProxyUrlDto = {
        hobbitLink: mockHobbitLink,
      };
      const url = await proxyController.toUrl(getProxyUrlDto);
      expect(url).toBeDefined();
      expect(url.url).toBe('https://www.google.com');
    });

    it('should return undefined for invalid url', async () => {
      const getProxyUrlDto: GetProxyUrlDto = {
        hobbitLink: 'dfg_df',
      };
      const url = await proxyController.toUrl(getProxyUrlDto);
      expect(url).toBeUndefined();
    });
  });
});
