import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerConfigModule, SwaggerConfigService } from '@config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('v1', { exclude: ['health'] });

  const swaggerModule = SwaggerConfigModule;
  const swaggerService = app.select(swaggerModule).get(SwaggerConfigService);
  swaggerService.setupSwagger(app);

  const serverPort = process.env.PORT || 3000;
  await app.listen(serverPort, '0.0.0.0', () => {
    Logger.log(`Server is running on port ${serverPort}`);
  });
}
bootstrap();
