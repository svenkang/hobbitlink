import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  constructor(context: string) {
    super(context);
  }

  debug(message: string) {
    super.debug(message);
  }
}
