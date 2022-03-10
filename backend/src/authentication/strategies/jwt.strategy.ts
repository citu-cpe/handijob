import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { TokenPayload } from '../types/token-payload.interface';
import { User } from '../../user/user.entity';
import { EnvironmentVariableKeys } from '../../config/environment-variable-keys';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // tslint:disable:no-unused-variable
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(
        EnvironmentVariableKeys.JWT_ACCESS_TOKEN_SECRET
      ),
    });
  }

  public async validate(payload: TokenPayload): Promise<User> {
    return this.userService.findById(payload.userId);
  }
}
