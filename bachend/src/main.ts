import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync('../../../../../../../../etc/certs/admin/gravitino.ru_08-08-2023_11:14:30_letencrypt.key'),
  //   cert: fs.readFileSync('../../../../../../../../etc/certs/admin/gravitino.ru_08-08-2023_11:14:30_letencrypt.crt_v2'),
  // };
  const app = await NestFactory.create(AppModule, {
    // httpsOptions,
  });
  app.enableCors({
    origin: [
      'http://localhost:5000',
      'https://localhost:5000',
      'http://localhost',
      'https://localhost',
      'http://31.172.73.217',
      'https://31.172.73.217',
      'https://gravitino.ru/',
      'https://gravitino.ru:3001',
      'https://gravitino.ru:3002',
      'https://gravitino.ru:3003',
      'http://www.gravitino.ru',
      'https://gravitino.ru',
      'https://www.gravitino.ru',
      'http://217.113.20.38',
      'http://217.113.20.38:3001',
      'https://217.113.20.38',
      'https://217.113.20.38:3001',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Graviton api')
    .setDescription('Graviton api for site')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe())
  const configService = app.get(ConfigService)
  const port = configService.get('port')
  await app.listen(port);
}
bootstrap();