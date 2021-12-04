import { NestApplication, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
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
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT', { infer: true });
  const nodeEnv = configService.get<string>('NODE_ENV', { infer: true });
  await app.listen(port);
  app
    .get(LoggerService)
    .log(
      `Listening on port ${port} in ${nodeEnv} environment`,
      NestApplication.name,
    );
}

bootstrap();
