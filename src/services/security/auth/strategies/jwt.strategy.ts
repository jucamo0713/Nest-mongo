import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { BasicUserResponse } from '../../../../interfaces/user.controllerResponse';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_PASSWORD,
      usernameField: 'email',
    });
  }

  async validate(payload: BasicUserResponse): Promise<any> {
    return {
      _id: payload._id,
      name: payload.name,
      email: payload.email,
    };
  }
}
