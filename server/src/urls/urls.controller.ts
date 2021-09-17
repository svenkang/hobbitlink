import { Body, Controller, Post } from '@nestjs/common';
import { CreateHobbitLinkDto } from './urls.dto';
import { UrlsService, CreateHobbitResponse } from './urls.service';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post()
  createUrl(
    @Body() createHobbitLinkDto: CreateHobbitLinkDto,
  ): CreateHobbitResponse {
    return this.urlsService.createHobbitLink(createHobbitLinkDto);
  }
}
