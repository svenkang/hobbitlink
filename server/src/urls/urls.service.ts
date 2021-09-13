import { Injectable, Logger } from '@nestjs/common';
import { CreateHobbitUrlDto } from './create-url.dto';

interface CreateHobbitResponse {
  url: string;
  hobbitlink: string;
}

@Injectable()
export class UrlsService {
  constructor(private readonly logger: Logger) {
    this.logger.setContext(this.constructor.name);
  }

  createHobbitLink(
    createHobbitLinkDto: CreateHobbitUrlDto,
  ): CreateHobbitResponse {
    this.logger.log(
      `Attempting to create a hobbit link with ${JSON.stringify(
        createHobbitLinkDto,
      )}`,
    );
    return {
      url: 'https://svenkang.io',
      hobbitlink: 'wow',
    };
  }
}
