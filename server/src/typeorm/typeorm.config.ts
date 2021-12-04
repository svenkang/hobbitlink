import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const TypeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get('MYSQL_HOST', { infer: true }),
    port: configService.get('MYSQL_PORT', { infer: true }),
    username: configService.get('MYSQL_USER', { infer: true }),
    password: configService.get('MYSQL_PASSWORD', { infer: true }),
    database: configService.get('MYSQL_DATABASE', { infer: true }),
    entities: [],
    retryAttempts: 5,
    retryDelay: 5000,
    keepConnectionAlive: false,
    synchronize:
      configService.get('NODE_ENV', { infer: true }) !== 'production',
    autoLoadEntities:
      configService.get('NODE_ENV', { infer: true }) !== 'production',
  }),
  inject: [ConfigService],
};
