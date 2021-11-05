import { Module } from '@nestjs/common';
import { ServicesModule} from "../services/services.module";
import {UserController} from "./user/user.controller";
import { TasksController } from './tasks/tasks.controller';

@Module({
  imports:[ServicesModule],
  controllers: [UserController, TasksController]
})

export class ControllersModule {}