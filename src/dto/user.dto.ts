import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserPostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name:string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email:string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password:string;
}
export class UserPutDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name:string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  email:string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  password:string;
}