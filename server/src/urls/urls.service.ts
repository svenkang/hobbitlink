import { Injectable } from '@nestjs/common';
import { CreateHobbitLinkDto } from './urls.dto';
import { nanoid } from 'nanoid';
import { LoggerService } from './../logger/logger.service';
import { CreateHobbitResponse } from './urls.interface';

export const HOBBIT_LINK_MIN_CHAR = 1;
export const HOBBIT_LINK_MAX_CHAR = 5;

@Injectable()
export class UrlsService {
  constructor(private readonly logger: LoggerService) {
    logger.setContext(UrlsService.name);
  }

  createHobbitLink(
    createHobbitLinkDto: CreateHobbitLinkDto,
  ): CreateHobbitResponse {
    const hobbitLink =
      createHobbitLinkDto.hobbitLink || nanoid(HOBBIT_LINK_MAX_CHAR);
    this.logger.debug(
      `url: '${createHobbitLinkDto.url}' hobbitLink: '${hobbitLink}'`,
    );
    return {
      url: createHobbitLinkDto.url,
      hobbitLink: hobbitLink,
    };
  }
}
