import { Injectable, Logger } from '@nestjs/common';
import { CreateHobbitLinkDto } from './create-url.dto';
import { nanoid } from 'nanoid';

export const HOBBIT_LINK_MIN_CHAR = 1;
export const HOBBIT_LINK_MAX_CHAR = 5;

export interface CreateHobbitResponse {
  url: string;
  hobbitLink: string;
}

@Injectable()
export class UrlsService {
  constructor(private readonly logger: Logger) {
    this.logger.setContext(this.constructor.name);
  }

  createHobbitLink(
    createHobbitLinkDto: CreateHobbitLinkDto,
  ): CreateHobbitResponse {
    this.logger.log(
      `Attempting to create a hobbit link with ${JSON.stringify(
        createHobbitLinkDto,
      )}`,
    );

    return {
      url: createHobbitLinkDto.url,
      hobbitLink:
        createHobbitLinkDto.hobbitLink || nanoid(HOBBIT_LINK_MAX_CHAR),
    };
  }
}
