import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './exceptions/exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionFilter());
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
