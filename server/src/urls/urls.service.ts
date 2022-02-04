import { Injectable } from '@nestjs/common';
import { CreateHobbitLinkDto } from './urls.dto';
import { nanoid } from 'nanoid';
import { LoggerService } from './../logger/logger.service';
import {
  CreateHobbitResponse,
  HOBBIT_LINK_DEFAULT_CHAR,
  SaveUrlRequest,
} from './urls.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './urls.entity';
import { ExpirationService } from './../expiration/expiration.service';

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
