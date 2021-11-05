import { Injectable } from '@nestjs/common';
import { InjectModel, Prop } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../../schemas/tasks/task.schema';
import { TaskPostDto } from '../../dto/task.dto';
import { UserService } from '../user/user.service';
import { User } from '../../schemas/user/user.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>, private userService: UserService) {
  }

  async GetAllTasks(): Promise<Task[]> {
    const tasksList: Task[] = await this.taskModel.find();
    const tasksListRes: Task[] = [];

    for (let i = 0; i < tasksList.length; i++) {
      const userData = await this.userService.getOneUser(tasksList[i].user[0]);
      tasksListRes.push({
        _id:tasksList[i]._id,
        name: tasksList[i].name,
        description: tasksList[i].description,
        due_date: tasksList[i].due_date,
        user: userData,
      });
    }
    return tasksListRes;
  }

  async GetOneTasks(id: string): Promise<Task> {
    let task: Task = await this.taskModel.findById(id);
    return {
      _id:task._id,
      name: task.name,
      description: task.description,
      due_date: task.due_date,
      user:await this.userService.getOneUser(task.user[0])
    };
  }

  async postOneTask(task: TaskPostDto): Promise<Task> {
    const user: User = await this.userService.getOneUser(task.user);
    if (user['_id'] == task.user) {
      let createdTask = new this.taskModel(task);
      return await createdTask.save();
    } else {
      return new Task();
    }
  }
  async GetTasksByUser(id): Promise<Task[]> {
    return this.taskModel.find({user:id});
  }
  async deleteByUser(id): Promise<void> {
    let x: Task;
    do {
      x = await this.taskModel.findOneAndDelete({ user: id });
    } while (!!x);
  }
}
