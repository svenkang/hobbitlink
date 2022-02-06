import { Injectable } from '@nestjs/common';
import { CreateHobbitLinkDto } from './urls.post.dto';
import { nanoid } from 'nanoid';
import { LoggerService } from './../logger/logger.service';
import {
  CreateHobbitResponse,
  HOBBIT_LINK_DEFAULT_CHAR,
  SaveUrlRequest,
} from './urls.interface';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './urls.entity';
import { ExpirationService } from './../expiration/expiration.service';
import { PaginationQueryDto } from './urls.get.dto';

@Injectable()
export class UrlsService {
  public constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
    private readonly expirationService: ExpirationService,
    private readonly logger: LoggerService,
  ) {
    logger.setContext(UrlsService.name);
  }

  public async getUrls(paginationQuery: PaginationQueryDto): Promise<Url[]> {
    const { offset, limit, ordered } = paginationQuery;
    const options: FindManyOptions<Url> = {
      ...(offset && { skip: offset }),
      ...(limit && { take: limit }),
      ...(ordered && { order: { clicks: 'DESC' } }),
    };
    return await this.urlRepository.find(options);
  }

  public async createHobbitLink(
    createHobbitLinkDto: CreateHobbitLinkDto,
  ): Promise<CreateHobbitResponse> {
    const hobbitLink =
      createHobbitLinkDto.hobbitLink || nanoid(HOBBIT_LINK_DEFAULT_CHAR);
    const urlToSave: SaveUrlRequest = {
      url: createHobbitLinkDto.url,
      hobbitLink,
      expiresAt: this.expirationService.getExpirationDate(),
    };
    this.logger.debug(urlToSave);
    const savedUrl = await this.urlRepository.save(urlToSave);
    return {
      url: savedUrl.url,
      hobbitLink: savedUrl.hobbitLink,
    };
  }
}
