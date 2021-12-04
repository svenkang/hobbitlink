import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestApplication, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('NODE_PORT', { infer: true });
  const nodeEnv = configService.get<string>('NODE_ENV', { infer: true });
  const appName = configService.get<string>('APP_NAME', { infer: true });
  const appVersion = configService.get<string>('APP_VER', { infer: true });

  if (nodeEnv !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(appName)
      .setDescription(`Welcome to ${appName} API documentation`)
      .setVersion(appVersion)
      .addTag(appName)
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port);
  app
    .get(LoggerService)
    .log(
      `Listening on port ${port} in ${nodeEnv} environment`,
      NestApplication.name,
    );
}

bootstrap();
