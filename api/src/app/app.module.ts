import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './app.config';
import { UrlsModule } from '../url/url.module';
import { HealthModule } from './../health/health.module';
import { HttpLoggerMiddleware } from './../logger/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmAsyncConfig } from '../database/database.config';
import { ProxyModule } from './../proxy/proxy.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(AppConfig),
    TypeOrmModule.forRootAsync(TypeOrmAsyncConfig),
    HealthModule,
    UrlsModule,
    ProxyModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
