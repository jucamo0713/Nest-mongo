import { Module } from '@nestjs/common';
import { UserService} from "./user/user.service";
import { SchemasModule } from "../schemas/schemas.module";
import { TasksService } from './tasks/tasks.service';

@Module({
  imports:[SchemasModule],
  providers: [UserService, TasksService, ],
  exports:[UserService, TasksService]
})

export class ServicesModule{}