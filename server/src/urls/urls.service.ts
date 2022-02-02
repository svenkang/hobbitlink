import { Injectable } from '@nestjs/common';
import { CreateHobbitLinkDto } from './urls.dto';
import { nanoid } from 'nanoid';
import { LoggerService } from './../logger/logger.service';
import { CreateHobbitResponse, SaveUrlRequest } from './urls.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './urls.entity';
import { ExpirationService } from 'src/expiration/expiration.service';

export const HOBBIT_LINK_MIN_CHAR = 1;
export const HOBBIT_LINK_MAX_CHAR = 5;

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
      createHobbitLinkDto.hobbitLink || nanoid(HOBBIT_LINK_MAX_CHAR);
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
