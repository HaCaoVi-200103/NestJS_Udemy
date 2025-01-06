import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //cách sữ dụng .env để get PORT từ .env
  const configService = app.get(ConfigService)
  const port = configService.get("PORT")

  app.useGlobalPipes(new ValidationPipe({
    //Bỏ các thuộc tính không cần thiết khi call api
    whitelist: true,
    //Nếu truyền các thuộc tính không được khai báo thì quăng exception
    forbidNonWhitelisted: true
  }))

  //Setup tiền tố route name
  app.setGlobalPrefix('api/v1', { exclude: [""] });

  await app.listen(port ?? 8080);
}
bootstrap();
