import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

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
  @IsDate()
  @IsNotEmpty()
  @Type(()=>Date)
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
  @IsDate()
  @IsOptional()
  @Type(()=>Date)
  due_date: Date;
}