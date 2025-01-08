
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '@/modules/users/schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(email: string, password: string): Promise<any> {
        const user: User = await this.authService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException("Email or password invalid!!!");
        }

        if (!user.isActive) {
            throw new BadRequestException("Unverified account")
        }

        return user;
    }
}
