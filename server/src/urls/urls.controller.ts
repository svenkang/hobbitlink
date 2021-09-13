import { Body, Controller, Post } from '@nestjs/common';
import { CreateHobbitLinkDto } from './create-url.dto';
import { UrlsService } from './urls.service';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post()
  postUrl(@Body() createHobbitLinkDto: CreateHobbitLinkDto) {
    this.urlsService.createHobbitLink(createHobbitLinkDto);
  }
}
