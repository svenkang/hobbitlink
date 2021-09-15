import { NestApplication, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const port = app.get(ConfigService).get<number>('APP_PORT', { infer: true });
  await app.listen(port);
  app
    .get(LoggerService)
    .log(`Application listening on port ${port}`, NestApplication.name);
}

bootstrap();
