import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigOptions } from './app.config';
import { UrlsModule } from '../url/url.module';
import { HealthModule } from './../health/health.module';
import { HttpLoggerMiddleware } from './../logger/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmAsyncConfig } from '../database/database.config';
import { ProxyModule } from './../proxy/proxy.module';
import { UserModule } from 'src/user/user.module';
import { ExpirationModule } from 'src/expiration/expiration.module';
import { CryptoModule } from 'src/crypto/crypto.module';
import { AuthModule } from 'src/auth/auth.module';
import { RedisAsyncConfig } from 'src/cache/cache.config';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigOptions),
    TypeOrmModule.forRootAsync(TypeOrmAsyncConfig),
    RedisModule.forRootAsync(RedisAsyncConfig),
    AuthModule,
    HealthModule,
    UrlsModule,
    ProxyModule,
    UserModule,
    ExpirationModule,
    CryptoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
