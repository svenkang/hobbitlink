import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './configuration';
import { UrlsModule } from './urls/urls.module';
import { HealthzModule } from './healthz/healthz.module';
import { HttpLoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [ConfigModule.forRoot(configuration), UrlsModule, HealthzModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
