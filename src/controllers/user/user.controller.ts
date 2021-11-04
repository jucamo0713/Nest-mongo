import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  UserDeleteOneResponse,
  UserGetAllResponse,
  UserPostOneResponse,
  UserPutOneResponse,
} from '../../interfaces/user.controllerResponse';
import { UserPostDto, UserPutDto } from '../../dto/user.dto';
import { User } from '../../schemas/user/user.schema';

@ApiTags('User')
@Controller('user')
export class UserController {

  constructor(private UserService: UserService) {
  }

  @Get()
  @ApiResponse({
    type: UserGetAllResponse,
  })
  async getAllUser(): Promise<UserGetAllResponse> {
    const response: UserGetAllResponse = new UserGetAllResponse();
    response.data = await this.UserService.getAllUsers();
    return response;
  }

  @Get(':id')
  @ApiResponse({
    type: User,
  })
  async getOneUser(@Param('id') id: string): Promise<User> {
    const response = await this.UserService.getOneUser(id);
    return response;
  }

  @Post()
  @ApiResponse({
    type: UserPostOneResponse,
  })
  async PostOneUser(@Body() user: UserPostDto): Promise<UserPostOneResponse> {
    const response: UserPostOneResponse = new UserPostOneResponse();
    try {
      response.data = await this.UserService.postOneUser(user);
      response.status = true;
    } catch (e) {
      response.data = e;
      response.status = false;
    }
    return response;
  }

  @Put(':id')
  @ApiResponse({
    type: UserPutOneResponse,
  })
  async PutOneUser(@Body() user: UserPutDto, @Param('id') id: string): Promise<UserPutOneResponse> {
    const response: UserPutOneResponse = new UserPutOneResponse();
    try {
      response.data = await this.UserService.putOneUser(id, user);
      response.status = true;
    } catch (e) {
      response.data = e;
      response.status = false;
    }
    return response;
  }

  @Delete(':id')
  @ApiResponse({
    type: UserDeleteOneResponse,
  })
  async DeleteOneUser(@Param('id') id: string): Promise<UserDeleteOneResponse> {
    const response: UserDeleteOneResponse = new UserDeleteOneResponse();
    await this.UserService.DeleteOneUser(id).then(() => {
      response.status = true;
    }).catch(() => {
      response.status = false;
    });
    response.status = true;
    return response;
  }
}