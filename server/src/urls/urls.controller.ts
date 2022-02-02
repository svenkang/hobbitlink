import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateHobbitLinkDto } from './urls.dto';
import { CreateHobbitResponse } from './urls.interface';
import { UrlsService } from './urls.service';

@Controller('urls')
export class UrlsController {
  public constructor(private readonly urlsService: UrlsService) {}

  @Post()
  @ApiTags('hobbitlink')
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
