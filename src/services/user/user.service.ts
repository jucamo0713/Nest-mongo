import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/user/user.schema';
import { Model } from 'mongoose';
import { UserPostDto, UserPutDto } from '../../dto/user.dto';
import {
  BasicUserResponse,
  UserActualResponse,
  UserDeleteOneResponse,
  UserGetAllResponse,
  UserPostOneResponse,
  UserPutOneResponse,
} from '../../interfaces/user.controllerResponse';
import { HashingService } from '../security/hashing/hashing.service';
import { AuthService } from '../security/auth/auth.service';
import { EncryptingService } from '../security/encrypting/encrypting.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private hashingService: HashingService,
    private encryptingService: EncryptingService,
    private authService: AuthService,
  ) {}

  private async parseUserResponse(
    User: UserDocument,
  ): Promise<BasicUserResponse> {
    return {
      _id: User._id,
      name: User.name,
      email: User.email,
    };
  }

  async getAllUsers(): Promise<UserGetAllResponse> {
    const response: UserGetAllResponse = new UserGetAllResponse();
    response.data = [];
    await this.userModel
      .find()
      .then((data: UserDocument[]): void => {
        data.map(async (value: UserDocument) => {
          response.data.push(await this.parseUserResponse(value));
        });
      })
      .catch((err) => {
        response.data = err;
      });
    return response;
  }

  async getOneUser(id: string): Promise<BasicUserResponse> {
    const user: BasicUserResponse = await this.userModel
      .findById(id)
      .then((data: UserDocument) => {
        return this.parseUserResponse(data);
      })
      .catch((err) => {
        return err;
      });
    return user;
  }

  async postOneUser(user: UserPostDto): Promise<UserPostOneResponse> {
    const response: UserPostOneResponse = new UserPostOneResponse();
    user.password = await this.hashingService.hash(user.password);
    const createdUser = new this.userModel(user);
    await createdUser
      .save()
      .then(async (data: UserDocument) => {
        response.data = await this.parseUserResponse(data);
        response.status = true;
      })
      .catch((err) => {
        response.data = err;
        response.status = false;
      });
    return response;
  }

  async putOneUser(id: string, user: UserPutDto): Promise<UserPutOneResponse> {
    const response: UserPutOneResponse = new UserPutOneResponse();
    this.userModel
      .findByIdAndUpdate(id, user, { new: true })
      .then(async (data: UserDocument) => {
        response.data = await this.parseUserResponse(data);
        response.status = true;
      })
      .catch((err) => {
        response.data = err;
        response.status = false;
      });
    return response;
  }

  async postActualUser(user: UserPostDto): Promise<UserActualResponse> {
    let response: UserActualResponse = new UserActualResponse();
    user.password = await this.hashingService.hash(user.password);
    const createdUser = new this.userModel(user);
    await createdUser
      .save()
      .then(async (data: UserDocument) => {
        response = await this.authService.login(
          await this.parseUserResponse(data),
        );
      })
      .catch((err) => {
        response.data = err;
        response.status = false;
      });
    return response;
  }

  async putActualUser(
    id: string,
    user: UserPutDto,
  ): Promise<UserActualResponse> {
    let response: UserActualResponse = new UserActualResponse();
    this.userModel
      .findByIdAndUpdate(id, user, { new: true })
      .then(async (data: UserDocument) => {
        response = await this.authService.login(
          await this.parseUserResponse(data),
        );
      })
      .catch((err) => {
        response.data = err;
        response.status = false;
      });
    return response;
  }

  async DeleteOneUser(id: string): Promise<UserDeleteOneResponse> {
    const response: UserDeleteOneResponse = new UserDeleteOneResponse();
    await this.userModel
      .findByIdAndDelete(id)
      .then(async (data: UserDocument) => {
        response.data = await this.parseUserResponse(data);
        response.status = true;
      })
      .catch((err) => {
        response.data = err;
        response.status = false;
      });
    return response;
  }
}
