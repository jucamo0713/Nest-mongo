import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schemas/user/user.schema";
import { Model, ObjectId } from 'mongoose';
import { UserPostDto, UserPutDto } from '../dto/user.dto';

@Injectable()
export class UserService{
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  async getAllUsers(): Promise<User[]>{
    return this.userModel.find();
  }
  async getOneUser(id:string): Promise<User>{
    return this.userModel.findById(id);
    //return this.userModel.findById({_id:id});
  }
  async postOneUser(user:UserPostDto): Promise<User>{

    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
  async putOneUser(id:string,user:UserPutDto): Promise<User>{
    return this.userModel.findByIdAndUpdate(id,user,{new:true});
  }
  async DeleteOneUser(id:string){
    this.userModel.findByIdAndDelete(id)
  }
}