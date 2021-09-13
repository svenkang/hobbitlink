import { Logger, Module } from '@nestjs/common';
import { UrlsController } from './urls.controller';
import { UrlsService } from './urls.service';

@Module({
  providers: [UrlsService, Logger],
  controllers: [UrlsController],
})
export class UrlsModule {}
