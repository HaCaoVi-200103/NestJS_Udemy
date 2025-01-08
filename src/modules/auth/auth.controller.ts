import { Controller, Request, Post, UseGuards, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from '@/decorator/customize';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public()
  handleLogin(@Request() req) {
    return this.authService.login(req.user)
  }

  @Get("profile")
  getProfile(@Request() req) {
    return req.user
  }
  // signIn(@Body() signInDto: CreateAuthDto) {
  //   return this.authService.signIn(signInDto.email, signInDto.password);
  // }
}
