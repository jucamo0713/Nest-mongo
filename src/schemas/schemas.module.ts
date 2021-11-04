import { Module } from '@nestjs/common';
import { MongooseModule} from "@nestjs/mongoose";
import { User, UserSchema } from "./user/user.schema";

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  exports: [MongooseModule]
})
export class SchemasModule{}