import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from '../url/url.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { GetProxyUrlDto } from './proxy.dto';

@Injectable()
export class ProxyService {
  public constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
  ) {}

  public async toUrl(getProxyUrlDto: GetProxyUrlDto): Promise<Url | undefined> {
    const url = await this.urlRepository.findOneBy({
      hobbitLink: getProxyUrlDto.hobbitLink,
      isActive: true,
      expiresAt: MoreThanOrEqual(new Date()),
    });
    if (url) {
      await this.urlRepository.save({
        id: url.id,
        clicks: url.clicks + 1,
      });
    }
    return url;
  }
}
