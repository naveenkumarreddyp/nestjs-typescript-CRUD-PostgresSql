import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Enabling CORS
  app.enableCors();
  //global API prefix
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 3000;

  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}/api/v1`);
}

bootstrap();
