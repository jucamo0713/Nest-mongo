import { ApiProperty } from "@nestjs/swagger";
import { User } from "../schemas/user/user.schema";

export class UserGetAllResponse{
  @ApiProperty({type:[User]})
  data: User[]
}
export class UserPostOneResponse{
  @ApiProperty()
  status:boolean
  @ApiProperty({type:User})
  data: User
}
export class UserPutOneResponse{
  @ApiProperty()
  status:boolean
  @ApiProperty({type:User})
  data: User
}
export class UserDeleteOneResponse{
  @ApiProperty()
  status:boolean
}