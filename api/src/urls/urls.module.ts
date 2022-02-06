import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpirationModule } from 'src/expiration/expiration.module';
import { LoggerModule } from './../logger/logger.module';
import { UrlsController } from './urls.controller';
import { Url } from './urls.entity';
import { UrlsService } from './urls.service';

@Module({
  imports: [TypeOrmModule.forFeature([Url]), ExpirationModule, LoggerModule],
  controllers: [UrlsController],
  providers: [UrlsService],
})
export class UrlsModule {}
