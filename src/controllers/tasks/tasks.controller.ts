import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from '../../services/tasks/tasks.service';
import {
  TaskGetAllResponse,
  TaskGetByUserResponse,
  TaskGetOneResponse,
  TaskPostOneResponse,
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
    const response: TaskGetAllResponse = new TaskGetAllResponse();
    response.data = await this.taskService.GetAllTasks();
    return response;
  }

  @Get(':id')
  @ApiResponse({
    type: TaskGetOneResponse,
  })
  async getOneTaks(@Param('id') id: string): Promise<TaskGetOneResponse> {
    const response: TaskGetOneResponse = new TaskGetOneResponse();
    response.status = true;
    response.data = await this.taskService.GetOneTasks(id).catch(e => {
      response.status = false;
      return e;
    });
    return response;
  }

  @Get('/byUser/:id')
  @ApiResponse({
    type: TaskGetByUserResponse,
  })
  async getTaskByUser(@Param('id') id: string): Promise<TaskGetByUserResponse> {
    const response: TaskGetByUserResponse = new TaskGetByUserResponse();
    response.data = await this.taskService.GetTasksByUser(id);
    return response;
  }

  @Post()
  @ApiResponse({
    type: TaskPostOneResponse,
  })
  async PostOneTask(@Body() task: TaskPostDto): Promise<TaskPostOneResponse> {
    const response: TaskPostOneResponse = new TaskPostOneResponse();
    response.status = true;
    response.data = await this.taskService.postOneTask(task).catch(e => {
      response.status = false;
      return e;
    });
    return response;
  }
}
