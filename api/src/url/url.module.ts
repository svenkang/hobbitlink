import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpirationModule } from '../expiration/expiration.module';
import { UrlsController } from './url.controller';
import { Url } from './url.entity';
import { UrlsService } from './url.service';

@Module({
  imports: [TypeOrmModule.forFeature([Url]), ExpirationModule],
  controllers: [UrlsController],
  providers: [UrlsService, Logger],
})
export class UrlsModule {}
