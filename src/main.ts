import { NestFactory } from '@nestjs/core';
import { AppModule } from './application.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const server = await NestFactory.create(AppModule);

  // server.useGlobalPipes(new ValidationPipe());

  await server.listen(3000);
}

bootstrap();
