import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  public constructor(context: string) {
    super(context, { timestamp: true });
  }
}
