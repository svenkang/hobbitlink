import { Injectable, NestMiddleware } from '@nestjs/common';
import * as clc from 'cli-color';

import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new LoggerService('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl: url } = request;
    const userAgent = request.get('user-agent') || '';

    let requestTime: number;
    request.on('close', () => {
      requestTime = Date.now();
    });
    request.on('readable', () => {
      requestTime = Date.now();
    });

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length') || '?';
      const responseTime = Date.now() - requestTime || 0;

      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip} ${clc.yellow(
          `~${responseTime}ms`,
        )}`,
      );
    });

    next();
  }
}
