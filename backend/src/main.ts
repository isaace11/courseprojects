import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // todas las rutas aparecen por API

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
