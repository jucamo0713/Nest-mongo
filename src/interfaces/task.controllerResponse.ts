import { ApiProperty } from '@nestjs/swagger';
import { BasicUserResponse } from './user.controllerResponse';

export class BasicTaskResponse {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  due_date: Date;
  @ApiProperty()
  user: BasicUserResponse;
}
export class TaskPostOneResponse {
  @ApiProperty()
  status: boolean;
  @ApiProperty({ type: BasicTaskResponse })
  data: BasicTaskResponse;
}
export class TaskGetAllResponse {
  @ApiProperty({ type: [BasicTaskResponse] })
  data: BasicTaskResponse[];
}
export class TaskGetByUserResponse {
  @ApiProperty({ type: [BasicTaskResponse] })
  data: BasicTaskResponse[];
}
export class TaskPutOneResponse {
  @ApiProperty()
  status: boolean;
  @ApiProperty({ type: BasicTaskResponse })
  data: BasicTaskResponse;
}
export class TaskDeleteOneResponse {
  @ApiProperty()
  status: boolean;
  @ApiProperty({ type: BasicTaskResponse })
  data: BasicTaskResponse;
}
