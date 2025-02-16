import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { comparePassword } from '@/utils/utils';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    const isValidPassword = await comparePassword(password, user.password)

    if (!user || !isValidPassword) return null;

    return user;
  }

  // async signIn(username: string, password: string): Promise<any> {
  //   const user = await this.usersService.findByEmail(username);
  //   const isValidPassword = await comparePassword(password, user.password)
  //   if (!isValidPassword) {
  //     throw new UnauthorizedException("Email or password invalid!!!");
  //   }
  //   const payload = { sub: user._id, username: user.email }
  //   const token = await this.jwtService.signAsync(payload)
  //   return {
  //     access_token: token
  //   }
  // }

  async login(user: any) {
    const payload = { sub: user._id, username: user.email }
    const token = await this.jwtService.signAsync(payload)
    return {
      access_token: token
    }
  }

  async handleRegister(registerDto: CreateAuthDto) {
    return await this.usersService.register(registerDto)
  }

  async handleResendEmail(email: string) {
    try {
      if (!email) {
        throw new BadRequestException("Email is required!!!")
      }

    } catch (error) {
      console.log(error);
      return error.response
    }
  }
}
