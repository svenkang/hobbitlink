import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { UrlsController } from './urls.controller';
import { UrlsService } from './urls.service';

@Module({
  imports: [LoggerModule],
  controllers: [UrlsController],
  providers: [UrlsService],
})
export class UrlsModule {}
