import { Injectable, Logger } from '@nestjs/common';
import { CreateHobbitLinkDto } from './url.create.dto';
import { nanoid } from 'nanoid';
import {
  CreateHobbitResponse,
  HOBBIT_LINK_DEFAULT_CHAR,
  SaveUrlRequest,
} from './url.interface';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './url.entity';
import { ExpirationService } from '../expiration/expiration.service';
import { PaginationQueryDto } from './url.read.dto';

@Injectable()
export class UrlService {
  public constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
    private readonly expirationService: ExpirationService,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(UrlService.name);
  }

  public async getUrls(paginationQuery: PaginationQueryDto): Promise<Url[]> {
    const { offset, limit, order } = paginationQuery;
    const options: FindManyOptions<Url> = {
      ...(offset && { skip: offset }),
      ...(limit && { take: limit }),
      ...(order && { order: { clicks: 'DESC' } }),
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
