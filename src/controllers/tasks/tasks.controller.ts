import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from '../../services/tasks/tasks.service';
import {
  BasicTaskResponse,
  TaskGetAllResponse,
  TaskGetByUserResponse,
  TaskPostOneResponse, TaskPutOneResponse,
} from '../../interfaces/task.controllerResponse';
import { TaskPostDto } from '../../dto/task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {
  }

  @Get()
  @ApiResponse({
    type: TaskGetAllResponse,
  })
  async getAllUser(): Promise<TaskGetAllResponse> {
    return this.taskService.GetAllTasks();
  }

  @Get(':id')
  @ApiResponse({
    type: BasicTaskResponse,
  })
  async getOneTasks(@Param('id') id: string): Promise<BasicTaskResponse> {
    return this.taskService.GetOneTasks(id);
  }

  @Get('/byUser/:id')
  @ApiResponse({
    type: TaskGetByUserResponse,
  })
  async getTaskByUser(@Param('id') id: string): Promise<TaskGetByUserResponse> {
    return this.taskService.GetTasksByUser(id);
  }

  @Post()
  @ApiResponse({
    type: TaskPostOneResponse,
  })
  async PostOneTask(@Body() task: TaskPostDto): Promise<TaskPostOneResponse> {
    return this.taskService.postOneTask(task);
  }

  @Put(':id')
  @ApiResponse({
    type: TaskPutOneResponse,
  })
  async PutOneTask(@Param("id") id:string, @Body() task: TaskPostDto): Promise<TaskPutOneResponse> {
    return this.taskService.putOneTask(id, task);
  }

  @Delete(":id")
  @ApiResponse({
    type: TaskPostOneResponse,
  })
  async DeleteOneTask(@Param("id") id:string,): Promise<TaskPostOneResponse> {
    return this.taskService.deleteOneTask(id);
  }
}
