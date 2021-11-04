import { Module } from '@nestjs/common';
import { UserService} from "./user.service";
import { SchemasModule } from "../schemas/schemas.module";

@Module({
  imports:[SchemasModule],
  providers: [UserService],
  exports:[UserService]
})

export class ServicesModule{}