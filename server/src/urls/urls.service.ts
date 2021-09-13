import { Injectable } from '@nestjs/common';
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
  createHobbitLink(
    createHobbitLinkDto: CreateHobbitLinkDto,
  ): CreateHobbitResponse {
    return {
      url: createHobbitLinkDto.url,
      hobbitLink:
        createHobbitLinkDto.hobbitLink || nanoid(HOBBIT_LINK_MAX_CHAR),
    };
  }
}
