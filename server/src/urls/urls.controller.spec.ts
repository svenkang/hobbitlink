import { Test, TestingModule } from '@nestjs/testing';
import { UrlsController } from './urls.controller';
import { UrlsService } from './urls.service';
import { mockCreateUrlDto, mockService } from './urls.mock';

describe('UrlsController', () => {
  let controller: UrlsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlsController],
      providers: [
        {
          provide: UrlsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<UrlsController>(UrlsController);
  });

  it('should respond with create hobbit response', async () => {
    const resp = await controller.createUrl(mockCreateUrlDto);
    expect(resp).toBeDefined();
    expect(resp.url).toBe('https://google.com');
    expect(resp.hobbitLink).toBe('wtd_g');
  });

  it('should respond with urls', async () => {
    const resp = await controller.getUrls();
    expect(resp).toBeDefined();
    expect(resp.length).toBe(4);
    expect(resp[0].clicks).toBe(0);
  });
});
