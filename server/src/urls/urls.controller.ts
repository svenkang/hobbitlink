import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateHobbitLinkDto } from './urls.dto';
import { Url } from './urls.entity';
import { CreateHobbitResponse } from './urls.interface';
import { UrlsService } from './urls.service';

@Controller('urls')
export class UrlsController {
  public constructor(private readonly urlsService: UrlsService) {}

  @Get()
  @ApiTags('urls')
  @ApiOkResponse({
    description: 'All urls have been successfully fetched',
  })
  public async getUrls(): Promise<Url[]> {
    return await this.urlsService.getUrls();
  }

  @Post()
  @ApiTags('urls')
  @ApiCreatedResponse({
    description: 'The url has been successfully shortened.',
  })
  @ApiBadRequestResponse({
    description: 'The given request body is not valid.',
  })
  public async createUrl(
    @Body() createHobbitLinkDto: CreateHobbitLinkDto,
  ): Promise<CreateHobbitResponse> {
    return await this.urlsService.createHobbitLink(createHobbitLinkDto);
  }
}
