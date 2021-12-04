import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export const configuration: ConfigModuleOptions = {
  isGlobal: true,
  validationSchema: Joi.object({
    NODE_PORT: Joi.number().required(),
    NODE_ENV: Joi.string().required(),
    APP_NAME: Joi.string().required(),
    APP_VER: Joi.string().required(),
  }),
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
};
