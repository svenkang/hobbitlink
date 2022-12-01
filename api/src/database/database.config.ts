import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { NodeEnv } from './../env/env.interface';

export const TypeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get('MYSQL_HOST', { infer: true }),
    port: configService.get('MYSQL_PORT', { infer: true }),
    username: configService.get('MYSQL_USER', { infer: true }),
    password: configService.get('MYSQL_PASSWORD', { infer: true }),
    database: configService.get('MYSQL_DATABASE', { infer: true }),
    entities: ['dist/**/*.entity{.ts,.js}'],
    retryAttempts: 5,
    retryDelay: 5000,
    keepConnectionAlive: false,
    migrationsRun:
      configService.get('NODE_ENV', { infer: true }) === NodeEnv.PRODUCTION,
    synchronize:
      configService.get('NODE_ENV', { infer: true }) !== NodeEnv.PRODUCTION,
    autoLoadEntities:
      configService.get('NODE_ENV', { infer: true }) !== NodeEnv.PRODUCTION,
  }),
  inject: [ConfigService],
};
