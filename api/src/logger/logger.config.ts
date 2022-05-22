import { NodeEnv } from 'src/env/env.interface';
import * as winston from 'winston';

const GlobalOptions = [
  winston.format.timestamp(),
  winston.format.ms(),
  winston.format.json(),
];

const DevOptions = [winston.format.prettyPrint()];

const EnvOptions = [...GlobalOptions];
if (process.env.NODE_ENV === NodeEnv.DEVELOPMENT) {
  EnvOptions.push(...DevOptions);
}

export const WinstonConfig: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(...EnvOptions),
    }),
  ],
};
