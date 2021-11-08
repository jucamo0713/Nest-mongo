import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TaskPostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  due_date: Date;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user: string;
}
export class TaskPutDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
  @ApiProperty()
  @IsOptional()
  due_date: Date;
}