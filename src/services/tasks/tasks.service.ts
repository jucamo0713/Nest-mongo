import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../../schemas/tasks/task.schema';
import { TaskPostDto, TaskPutDto } from '../../dto/task.dto';
import { UserService } from '../user/user.service';
import { BasicUserResponse } from '../../interfaces/user.controllerResponse';
import {
  BasicTaskResponse,
  TaskDeleteOneResponse,
  TaskGetAllResponse,
  TaskGetByUserResponse,
  TaskPostOneResponse,
  TaskPutOneResponse,
} from '../../interfaces/task.controllerResponse';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    private userService: UserService,
  ) {}

  private async parseTaskResponse(
    Task: TaskDocument,
  ): Promise<BasicTaskResponse> {
    return {
      _id: Task._id,
      name: Task.name,
      description: Task.description,
      due_date: new Date(Task.due_date),
      user: await this.userService.getOneUser(Task.user[0]),
    };
  }

  async GetAllTasks(): Promise<TaskGetAllResponse> {
    const response: TaskGetAllResponse = new TaskGetAllResponse();
    response.data = [];
    await this.taskModel.find().then((data: TaskDocument[]): void => {
      data.map(async (Task: TaskDocument) => {
        response.data.push(await this.parseTaskResponse(Task));
      });
    });
    return response;
  }

  async GetOneTasks(id: string): Promise<BasicTaskResponse> {
    return await this.taskModel
      .findById(id)
      .then(async (data: TaskDocument) => {
        return await this.parseTaskResponse(data);
      })
      .catch((err) => {
        return err;
      });
  }

  async GetTasksByUser(id): Promise<TaskGetByUserResponse> {
    const response: TaskGetByUserResponse = new TaskGetByUserResponse();
    response.data = [];
    await this.taskModel
      .find({ user: id })
      .then((data: TaskDocument[]): void => {
        data.map(async (Task: TaskDocument) => {
          response.data.push(await this.parseTaskResponse(Task));
        });
      });
    return response;
  }

  async postOneTask(task: TaskPostDto): Promise<TaskPostOneResponse> {
    const user: BasicUserResponse = await this.userService.getOneUser(
      task.user,
    );
    const response: TaskPostOneResponse = new TaskPostOneResponse();
    if (user._id.toString() === task.user.toString()) {
      const createdTask = new this.taskModel(task);
      await createdTask
        .save()
        .then(async (data: TaskDocument) => {
          response.data = await this.parseTaskResponse(data);
          response.status = true;
        })
        .catch((err) => {
          response.data = err;
          response.status = false;
        });
    } else {
      response.data = new BasicTaskResponse();
      response.status = false;
    }
    return response;
  }

  async putOneTask(id: string, task: TaskPutDto): Promise<TaskPutOneResponse> {
    const response: TaskPutOneResponse = new TaskPutOneResponse();
    await this.taskModel
      .findByIdAndUpdate(id, task, { new: true })
      .then(async (data: TaskDocument) => {
        response.data = await this.parseTaskResponse(data);
        response.status = true;
      })
      .catch((err) => {
        response.data = err;
        response.status = false;
      });
    return response;
  }

  async deleteOneTask(id: string): Promise<TaskDeleteOneResponse> {
    const response: TaskDeleteOneResponse = new TaskDeleteOneResponse();
    await this.taskModel
      .findByIdAndDelete(id)
      .then(async (data: TaskDocument) => {
        response.data = await this.parseTaskResponse(data);
        response.status = true;
      })
      .catch((err) => {
        response.data = err;
        response.status = false;
      });
    return response;
  }

  async deleteByUser(id): Promise<void> {
    await this.taskModel.deleteMany({ user: id });
  }
}
