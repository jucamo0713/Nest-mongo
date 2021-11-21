import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/allException.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  const options = new DocumentBuilder()
    .setTitle('Prueba')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .setContact(
      'Innventa Team',
      'https://innventasystem.com',
      'info@innventasystem.com',
    )
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentation', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
