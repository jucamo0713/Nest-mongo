import {Schema ,Prop, SchemaFactory} from "@nestjs/mongoose";
import { Document} from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User{
  @Prop()
  @ApiProperty()
  name: string
  @Prop()
  @ApiProperty()
  email: string
  @Prop()
  @ApiProperty()
  password: string
}
export const UserSchema = SchemaFactory.createForClass(User);
