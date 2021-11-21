import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from '../../services/tasks/tasks.service';
import {
  BasicTaskResponse,
  TaskGetAllResponse,
  TaskGetByUserResponse,
  TaskPostOneResponse,
  TaskPutOneResponse,
} from '../../interfaces/task.controllerResponse';
import { TaskPostDto } from '../../dto/task.dto';
import { JwtAuthGuard } from '../../services/security/auth/guards/jwtAuth.guard';

@ApiTags('tasks')
@Controller('tasks')
@ApiBearerAuth()
export class TasksController {
  constructor(private taskService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    type: TaskGetAllResponse,
  })
  async getAllTasks(): Promise<TaskGetAllResponse> {
    return this.taskService.GetAllTasks();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    type: BasicTaskResponse,
  })
  async getOneTasks(@Param('id') id: string): Promise<BasicTaskResponse> {
    return this.taskService.GetOneTasks(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/byUser/:id')
  @ApiResponse({
    type: TaskGetByUserResponse,
  })
  async getTaskByUser(@Param('id') id: string): Promise<TaskGetByUserResponse> {
    return this.taskService.GetTasksByUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({
    type: TaskPostOneResponse,
  })
  async PostOneTask(@Body() task: TaskPostDto): Promise<TaskPostOneResponse> {
    return this.taskService.postOneTask(task);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiResponse({
    type: TaskPutOneResponse,
  })
  async PutOneTask(
    @Param('id') id: string,
    @Body() task: TaskPostDto,
  ): Promise<TaskPutOneResponse> {
    return this.taskService.putOneTask(id, task);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({
    type: TaskPostOneResponse,
  })
  async DeleteOneTask(@Param('id') id: string): Promise<TaskPostOneResponse> {
    return this.taskService.deleteOneTask(id);
  }
}
