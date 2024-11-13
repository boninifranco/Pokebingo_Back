import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,POST,PUT,PATCH,DELETE', 
    allowedHeaders: 'Content-Type, Authorization',
    });
  

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions:{
        enableImplicitConversion: true,
      }
    })
  )

  app.useStaticAssets(join(__dirname, '..', 'static-assets'), {
    prefix: '/static-assets/',
  });
  
  await app.listen(3000);
}
bootstrap();
