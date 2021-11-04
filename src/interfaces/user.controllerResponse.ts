import { ApiProperty } from "@nestjs/swagger";
import { User } from "../schemas/user/user.schema";

export class UserGetAllResponse{
  @ApiProperty({type:[User]})
  data: User[]
}