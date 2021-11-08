import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/user/user.schema';
import { Model, ObjectId } from 'mongoose';
import { UserPostDto, UserPutDto } from '../../dto/user.dto';
import {
  BasicUserResponse, UserDeleteOneResponse,
  UserGetAllResponse,
  UserPostOneResponse,
  UserPutOneResponse,
} from '../../interfaces/user.controllerResponse';
import { ApiProperty } from '@nestjs/swagger';
import { response } from 'express';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  private async parseUserResponse(User: UserDocument): Promise<BasicUserResponse> {
    return {
      _id: User._id,
      name: User.name,
      email: User.email,
    };
  }

  async getAllUsers(): Promise<UserGetAllResponse> {
    const response: UserGetAllResponse = new UserGetAllResponse();
    response.data = [];
    await this.userModel.find().then((data: UserDocument[]):void => {
      data.map(async (value: UserDocument)=> {
        response.data.push(await this.parseUserResponse(value));
      });
    }).catch(err => {
      response.data = err;
    });
    return response;
  }

  async getOneUser(id: string): Promise<BasicUserResponse> {
    const user: BasicUserResponse = await this.userModel.findById(id).then((data: UserDocument) => {
      return this.parseUserResponse(data);
    }).catch(err => {
      return err;
    });
    return user;
  }

  async postOneUser(user: UserPostDto): Promise<UserPostOneResponse> {
    const response: UserPostOneResponse = new UserPostOneResponse();

    const createdUser = new this.userModel(user);
    await createdUser.save().then(async(data: UserDocument) => {
      response.data = await this.parseUserResponse(data);
      response.status = true;
    }).catch((err) => {
      response.data = err;
      response.status = false;
    });
    return response;
  }

  async putOneUser(id: string, user: UserPutDto): Promise<UserPutOneResponse> {
    const response: UserPutOneResponse = new UserPutOneResponse();
    this.userModel.findByIdAndUpdate(id, user, { new: true }).then(async(data: UserDocument) => {
      response.data = await this.parseUserResponse(data);
      response.status = true;
    }).catch((err) => {
      response.data = err;
      response.status = false;
    });
    return response;
  }

  async DeleteOneUser(id: string): Promise<UserDeleteOneResponse> {
    const response: UserDeleteOneResponse = new UserDeleteOneResponse();
    await this.userModel.findByIdAndDelete(id).then(async (data: UserDocument) => {
      response.data = await this.parseUserResponse(data);
      response.status = true;
    }).catch((err) => {
      response.data = err;
      response.status = false;
    });
    return response;
  }
}