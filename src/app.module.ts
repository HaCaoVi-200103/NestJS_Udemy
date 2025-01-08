import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@/modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/passport/jwt-auth.guard';

@Module({
  imports: [
    //Khai báo để có thể sữ dụng file .env thay vì phải cài lib dotenv
    ConfigModule.forRoot({
      isGlobal: true
    }),
    //Cách kết nối mongodb với server
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    //init user để sữ dụng model
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
})

export class AppModule { }


