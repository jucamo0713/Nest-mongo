import { ApiProperty } from "@nestjs/swagger";
import { User } from "../schemas/user/user.schema";
import { Prop } from '@nestjs/mongoose';

export class BasicUserResponse{
  @ApiProperty()
  _id: string;
  @ApiProperty()
  name: string
  @ApiProperty()
  email: string
}
export class UserGetAllResponse{
  @ApiProperty({type:[BasicUserResponse]})
  data: BasicUserResponse[]
}
export class UserActualResponse{
  @ApiProperty()
  status:boolean
  @ApiProperty()
  data: string
}
export class UserPostOneResponse{
  @ApiProperty()
  status:boolean
  @ApiProperty({type:BasicUserResponse})
  data: BasicUserResponse
}
export class UserPutOneResponse{
  @ApiProperty()
  status:boolean
  @ApiProperty({type:BasicUserResponse})
  data: BasicUserResponse
}
export class UserDeleteOneResponse{
  @ApiProperty()
  status:boolean
  @ApiProperty()
  data:BasicUserResponse
}