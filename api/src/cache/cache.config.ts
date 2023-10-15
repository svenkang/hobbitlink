import { RedisModuleAsyncOptions } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const RedisAsyncConfig: RedisModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    config: {
      host: configService.get<string>('REDIS_HOST', { infer: true }),
      port: configService.get<number>('REDIS_PORT', { infer: true }),
      password: configService.get<string>('REDIS_PASSWORD', { infer: true }),
    },
  }),
  inject: [ConfigService],
};
