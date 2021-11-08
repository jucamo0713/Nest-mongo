import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { User, UserDocument } from '../user/user.schema';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop()
  @ApiProperty()
  name: string;
  @Prop()
  @ApiProperty()
  description: string;
  @Prop()
  @ApiProperty()
  due_date: Date;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  @ApiProperty()
  user: UserDocument;
}

export const TaskSchema = SchemaFactory.createForClass(Task);