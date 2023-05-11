import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { mockCreateUrlDto, mockService } from './url.mock';
import { PaginationQueryDto } from './url.read.dto';

describe('UrlController', () => {
  let controller: UrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlController],
      providers: [
        {
          provide: UrlService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<UrlController>(UrlController);
  });

  it('should respond with create hobbit response', async () => {
    const resp = await controller.createUrl(mockCreateUrlDto);
    expect(resp).toBeDefined();
    expect(resp.url).toBe('https://google.com');
    expect(resp.hobbitLink).toBe('wtd_g');
  });

  it('should respond with urls', async () => {
    const paginationQuery: PaginationQueryDto = {};
    const resp = await controller.getUrls(paginationQuery);
    expect(resp).toBeDefined();
    expect(resp.length).toBe(4);
    expect(resp[0].clicks).toBe(0);
  });
});
