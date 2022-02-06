import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateHobbitLinkDto } from './urls.post.dto';
import { Url } from './urls.entity';
import { CreateHobbitResponse } from './urls.interface';
import { UrlsService } from './urls.service';
import { PaginationQueryDto } from './urls.get.dto';

@Controller('urls')
export class UrlsController {
  public constructor(private readonly urlsService: UrlsService) {}

  @Get()
  @ApiTags('urls')
  @ApiOkResponse({
    description: 'All urls have been successfully fetched',
  })
  public async getUrls(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Url[]> {
    return await this.urlsService.getUrls(paginationQuery);
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
