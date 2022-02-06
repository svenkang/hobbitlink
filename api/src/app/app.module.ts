import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './app.config';
import { UrlsModule } from './../urls/urls.module';
import { HealthzModule } from './../healthz/healthz.module';
import { HttpLoggerMiddleware } from './../logger/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmAsyncConfig } from './../typeorm/typeorm.config';
import { ProxyModule } from './../proxy/proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot(AppConfig),
    TypeOrmModule.forRootAsync(TypeOrmAsyncConfig),
    HealthzModule,
    UrlsModule,
    ProxyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
