import { Logger } from '@nestjs/common';
import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

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
    request.on('error', () => {
      requestTime = Date.now();
    });

    response.on('close', () => {
      const { params } = request;
      const { statusCode } = response;
      const contentLength = response.get('content-length') || 0;
      const responseTime = Date.now() - requestTime || 0;

      const isError = statusCode >= 400 && statusCode <= 520;
      const contents = {
        params,
        method,
        url,
        statusCode,
        contentLength,
        userAgent,
        ip,
        responseTime,
      };

      if (isError) {
        this.logger.error(contents);
      } else {
        this.logger.log(contents);
      }
    });
    next();
  }
}
