import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BasicUserResponse,
  UserDeleteOneResponse,
  UserGetAllResponse,
  UserPostOneResponse,
  UserPutOneResponse,
} from '../../interfaces/user.controllerResponse';
import { UserPostDto, UserPutDto } from '../../dto/user.dto';
import { User } from '../../schemas/user/user.schema';
import { TasksService } from '../../services/tasks/tasks.service';
import * as Process from 'process';

@ApiTags('User')
@Controller('user')
export class UserController {

  constructor(private UserService: UserService, private TasksService: TasksService) {
  }

  @Get()
  @ApiResponse({
    type: UserGetAllResponse,
  })

  async getAllUser(): Promise<UserGetAllResponse> {
    return this.UserService.getAllUsers();
  }

  @Get(':id')
  @ApiResponse({
    type: BasicUserResponse,
  })
  async getOneUser(@Param('id') id: string): Promise<BasicUserResponse> {
    return this.UserService.getOneUser(id);
  }

  @Post()
  @ApiResponse({
    type: UserPostOneResponse,
  })
  async PostOneUser(@Body() user: UserPostDto): Promise<UserPostOneResponse> {
    return this.UserService.postOneUser(user);
  }

  @Put(':id')
  @ApiResponse({
    type: UserPutOneResponse,
  })
  async PutOneUser(@Body() user: UserPutDto, @Param('id') id: string): Promise<UserPutOneResponse> {
    return this.UserService.putOneUser(id, user);
  }

  @Delete(':id')
  @ApiResponse({
    type: UserDeleteOneResponse,
  })
  async DeleteOneUser(@Param('id') id: string): Promise<UserDeleteOneResponse> {
    const response: UserDeleteOneResponse = await this.UserService.DeleteOneUser(id);
    if (response.status) {
      this.TasksService.deleteByUser(id).then(() => {
        console.log('Ended Process');
      });
    }
    return response;
  }
}