import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //cách sữ dụng .env để get PORT từ .env
  const configService = app.get(ConfigService)
  const port = configService.get("PORT")
  
  await app.listen(port ?? 8080);
}
bootstrap();
