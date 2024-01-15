import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin,Accept,Content-Type,Authorization',
  });
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 4000;
  await app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
  });
}
bootstrap();
