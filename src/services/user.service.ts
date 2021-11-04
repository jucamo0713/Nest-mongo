import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schemas/user/user.schema";
import { Model } from "mongoose";

@Injectable()
export class UserService{
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  async getAllUsers(): Promise<User[]>{
    return this.userModel.find();
  }
  async getAllUsers(): Promise<User[]>{
    return this.userModel.find();
  }
}