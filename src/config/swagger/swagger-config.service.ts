import { Injectable } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

@Injectable()
export class SwaggerConfigService {
  constructor() {}

  setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Desafio Pantore')
      .setDescription('Projeto relacionado ao teste técnico da pantore')
      .setVersion('1.0')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'authorization',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }
}
