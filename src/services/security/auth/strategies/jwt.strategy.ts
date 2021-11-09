import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { BasicUserResponse } from '../../../../interfaces/user.controllerResponse';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_PASSWORD,
    });
  }
  async validate(payload: BasicUserResponse):Promise<BasicUserResponse> {
    console.log(payload)
    return payload;
  }
}