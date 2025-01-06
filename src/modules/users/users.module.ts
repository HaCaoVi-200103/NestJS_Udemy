import { Module } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { UsersController } from '@/modules/users/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/modules/users/schemas/user.schema';

@Module({
  //imports ra để có thể sữ dụng model
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
  // exports de co the su dung trong module khac
  exports: [UsersService]
})
export class UsersModule { }
