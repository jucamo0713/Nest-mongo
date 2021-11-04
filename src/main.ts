import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Prueba')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .setContact(
      'Innventa Team',
      'https://innventasystem.com',
      'info@innventasystem.com')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('documentation', app, document);
  await app.listen(3000);

}
bootstrap();
