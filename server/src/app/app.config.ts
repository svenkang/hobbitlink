import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 5050;
const DEFAULT_NODE_ENV = 'development';

export const configuration: ConfigModuleOptions = {
  isGlobal: true,
  validationSchema: Joi.object({
    NODE_PORT: Joi.number().required().default(DEFAULT_PORT),
    NODE_ENV: Joi.string().required().default(DEFAULT_NODE_ENV),
  }),
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
};
