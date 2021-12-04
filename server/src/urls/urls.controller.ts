import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateHobbitLinkDto } from './urls.dto';
import { UrlsService, CreateHobbitResponse } from './urls.service';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post()
  @ApiTags('hobbitlink')
  @ApiCreatedResponse({
    description: 'The url has been successfully shortened.',
  })
  @ApiBadRequestResponse({
    description: 'The given request body is not valid.',
  })
  createUrl(
    @Body() createHobbitLinkDto: CreateHobbitLinkDto,
  ): CreateHobbitResponse {
    return this.urlsService.createHobbitLink(createHobbitLinkDto);
  }
}
