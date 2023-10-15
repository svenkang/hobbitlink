import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestApplication, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { NodeEnv } from './env/env.interface';
import { NestConfig } from './app/app.config';
import * as session from 'express-session';
import * as passport from 'passport';
import { AuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, NestConfig);
  const configService = app.get(ConfigService);
  const authGuard = app.get(AuthGuard);
  const logger = app.get(Logger);
  const port = configService.get<number>('API_PORT', { infer: true });
  const nodeEnv = configService.get<string>('NODE_ENV', { infer: true });
  const appName = configService.get<string>('APP_NAME', { infer: true });
  const appVersion = configService.get<string>('APP_VER', { infer: true });
  const sessionKey = configService.get<string>('SESSION_KEY', { infer: true });
  const cookieMaxAge = configService.get<number>('COOKIE_MAX_AGE', {
    infer: true,
  });

  if (nodeEnv !== NodeEnv.PRODUCTION) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(appName)
      .setDescription(`Welcome to ${appName} API documentation`)
      .setVersion(appVersion)
      .addTag(appName)
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
  }

  app.use(
    session({
      resave: false,
      secret: sessionKey,
      saveUninitialized: false,
      cookie: { maxAge: cookieMaxAge },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(helmet());
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalGuards(authGuard);

  await app.listen(port);
  logger.log(
    `Listening on port ${port} in ${nodeEnv} environment`,
    NestApplication.name,
  );
}

bootstrap();
