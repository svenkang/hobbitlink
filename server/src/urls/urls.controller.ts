import { Body, Controller, Post } from '@nestjs/common';
import { CreateHobbitUrlDto } from './create-url.dto';
import { UrlsService } from './urls.service';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post()
  postUrl(@Body() createHobbitUrlDto: CreateHobbitUrlDto) {
    this.urlsService.createHobbitLink(createHobbitUrlDto);
  }
}
