import { Module } from '@nestjs/common';
import { ServicesModule} from "../services/services.module";
import {UserController} from "./user/user.controller";
import { TasksController } from './tasks/tasks.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports:[ServicesModule],
  controllers: [UserController, TasksController, AuthController]
})

export class ControllersModule {}