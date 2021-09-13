import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 5050;

export const configuration: ConfigModuleOptions = {
  isGlobal: true,
  validationSchema: Joi.object({
    APP_PORT: Joi.number().default(DEFAULT_PORT),
  }),
  validationOptions: {
    abortEarly: true,
  },
};
