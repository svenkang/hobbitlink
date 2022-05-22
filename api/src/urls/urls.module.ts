import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpirationModule } from './../expiration/expiration.module';
import { UrlsController } from './urls.controller';
import { Url } from './urls.entity';
import { UrlsService } from './urls.service';

@Module({
  imports: [TypeOrmModule.forFeature([Url]), ExpirationModule],
  controllers: [UrlsController],
  providers: [UrlsService, Logger],
})
export class UrlsModule {}
