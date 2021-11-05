import { ApiProperty } from '@nestjs/swagger';
import { User } from '../schemas/user/user.schema';
import { Task } from '../schemas/tasks/task.schema';

export class TaskPostOneResponse{
  @ApiProperty()
  status:boolean
  @ApiProperty({type:Task})
  data: Task
}
export class TaskGetAllResponse{
  @ApiProperty({type:[Task]})
  data: Task[]
}
export class TaskGetOneResponse{
  @ApiProperty()
  status:boolean
  @ApiProperty({type:Task})
  data: Task
}
export class TaskGetByUserResponse{
  @ApiProperty({type:[Task]})
  data: Task[]
}