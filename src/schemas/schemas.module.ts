import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/user.schema';
import { Task, TaskSchema } from './tasks/task.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },
    { name: Task.name, schema:TaskSchema }])],
  exports: [MongooseModule],
})
export class SchemasModule {
}