import { ApiProperty } from '@nestjs/swagger';

export class UserPostDto {
  @ApiProperty()
  name:string;
  @ApiProperty()
  email:string;
  @ApiProperty()
  password:string;
}