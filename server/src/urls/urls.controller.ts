import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CreateHobbitLinkDto } from './create-url.dto';
import { UrlsService, CreateHobbitResponse } from './urls.service';

@Controller('urls')
export class UrlsController {
  constructor(
    private readonly urlsService: UrlsService,
    private readonly logger: Logger,
  ) {
    logger.setContext(this.constructor.name);
  }

  @Post()
  postUrl(
    @Body() createHobbitLinkDto: CreateHobbitLinkDto,
  ): CreateHobbitResponse {
    const startTime = new Date().getTime();
    const response = this.urlsService.createHobbitLink(createHobbitLinkDto);
    const endTime = new Date().getTime();
    this.logger.log(
      `Successfully created a hobbit link +${endTime - startTime}ms`,
    );
    return response;
  }
}
