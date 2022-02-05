import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from 'src/urls/urls.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { GetProxyUrlDto } from './proxy.dto';

@Injectable()
export class ProxyService {
  public constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
  ) {}

  public async toUrl(getProxyUrlDto: GetProxyUrlDto): Promise<Url> {
    return await this.urlRepository.findOne({
      hobbitLink: getProxyUrlDto.hobbitLink,
      isActive: true,
      expiresAt: MoreThanOrEqual(new Date()),
    });
  }
}
