import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpirationModule } from '../expiration/expiration.module';
import { UrlController } from './url.controller';
import { Url } from './url.entity';
import { UrlService } from './url.service';

@Module({
  imports: [TypeOrmModule.forFeature([Url]), ExpirationModule],
  controllers: [UrlController],
  providers: [UrlService, Logger],
})
export class UrlsModule {}
