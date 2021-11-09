import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../../schemas/user/user.schema';
import { Model } from 'mongoose';
import { HashingService } from '../hashing/hashing.service';
import { LoginDto } from '../../../dto/auth.dto';
import {
  BasicUserResponse,
  UserActualResponse,
} from '../../../interfaces/user.controllerResponse';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
              private hashingService: HashingService, private jwtService: JwtService) {
  }

  private async parseUserResponse(User: UserDocument): Promise<BasicUserResponse> {
    return {
      _id: User._id,
      name: User.name,
      email: User.email,
    };
  }

  async validateUser(User: LoginDto): Promise<BasicUserResponse> {
    const user: UserDocument = (await this.userModel.find({ email: User.email }))[0];
    if ((!!user) && (await this.hashingService.compareHash(User.password, user.password))) {
      const result = this.parseUserResponse(user);
      return result;
    }
    return null;
  }

  async login(user: BasicUserResponse): Promise<UserActualResponse> {
    const response: UserActualResponse = new UserActualResponse();
    try {
      console.log(user)
      response.status = true;
      response.data = this.jwtService.sign(user);
    } catch (e) {
      console.log(e);
      response.status = false;
      response.data = { ...e };
    }
    console.log(response);
    return response;
  }
}
