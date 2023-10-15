import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateHobbitLinkDto } from './url.create.dto';
import { Url } from './url.entity';
import { CreateHobbitResponse } from './url.interface';
import { UrlService } from './url.service';
import { PaginationQueryDto } from './url.read.dto';
import { PermissionGuard, SetPermissions } from './../auth/auth.guard';
import { UserTier } from './../user/user.interface';

@Controller('url')
export class UrlController {
  public constructor(private readonly urlsService: UrlService) {}

  @Get()
  @ApiTags('url')
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'limit the length of result set',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'offset the result set position',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    description: 'order the query by highest clicks',
  })
  @ApiOkResponse()
  @SetPermissions([UserTier.BASIC, UserTier.PRO])
  @UseGuards(PermissionGuard)
  public async getUrls(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Url[]> {
    return await this.urlsService.getUrls(paginationQuery);
  }

  @Post()
  @ApiTags('url')
  @ApiCreatedResponse()
  @ApiBadRequestResponse({
    description: 'The given request body is not valid.',
  })
  @SetPermissions([UserTier.BASIC, UserTier.PRO])
  @UseGuards(PermissionGuard)
  public async createUrl(
    @Body() createHobbitLinkDto: CreateHobbitLinkDto,
  ): Promise<CreateHobbitResponse> {
    return await this.urlsService.createHobbitLink(createHobbitLinkDto);
  }
}
