import { NestApplicationOptions } from '@nestjs/common';
import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config';
import { ThrottlerAsyncOptions } from '@nestjs/throttler';
import * as Joi from 'joi';
import { WinstonModule } from 'nest-winston';
import { WinstonConfig } from 'src/logger/logger.config';

export const ConfigOptions: ConfigModuleOptions = {
  isGlobal: true,
  ignoreEnvFile: true,
  validationSchema: Joi.object({
    API_PORT: Joi.number().required(),
    NODE_ENV: Joi.string().required(),
    APP_NAME: Joi.string().required(),
    APP_VER: Joi.string().default('1.0.0'),
    MYSQL_HOST: Joi.string().required(),
    MYSQL_PORT: Joi.number().required(),
    MYSQL_USER: Joi.string().required(),
    MYSQL_PASSWORD: Joi.string().required(),
    MYSQL_DATABASE: Joi.string().required(),
    SESSION_KEY: Joi.string().required(),
    COOKIE_MAX_AGE: Joi.number().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),
    REDIS_PASSWORD: Joi.string().required(),
    API_THROTTLE_TTL: Joi.number().required(),
    API_THROTTLE_LIMIT: Joi.number().required(),
  }),
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
};

export const ThrottlerOptions: ThrottlerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => [
    {
      ttl: config.get<number>('API_THROTTLE_TTL', { infer: true }),
      limit: config.get<number>('API_THROTTLE_LIMIT', { infer: true }),
    },
  ],
};

export const NestConfig: NestApplicationOptions = {
  logger: WinstonModule.createLogger(WinstonConfig),
};
