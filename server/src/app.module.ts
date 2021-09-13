import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './configuration';
import { UrlsController } from './urls/urls.controller';
import { UrlsService } from './urls/urls.service';
import { UrlsModule } from './urls/urls.module';

@Module({
  imports: [ConfigModule.forRoot(configuration), UrlsModule],
  controllers: [AppController, UrlsController],
  providers: [AppService, UrlsService, Logger],
})
export class AppModule {}
