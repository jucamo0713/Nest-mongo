import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BasicUserResponse,
  UserDeleteOneResponse,
  UserGetAllResponse,
  UserPostOneResponse,
  UserPutOneResponse,
  UserActualResponse,
} from '../../interfaces/user.controllerResponse';
import { UserPostDto, UserPutDto } from '../../dto/user.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User } from '../../schemas/user/user.schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from '../../services/user/user.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TasksService } from '../../services/tasks/tasks.service';
import { JwtAuthGuard } from '../../services/security/auth/guards/jwtAuth.guard';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(
    private UserService: UserService,
    private TasksService: TasksService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    type: UserGetAllResponse,
  })
  async getAllUser(): Promise<UserGetAllResponse> {
    return this.UserService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/actual')
  @ApiResponse({
    type: BasicUserResponse,
  })
  async getActualUser(@Request() req): Promise<BasicUserResponse> {
    return req.user;
  }

  @Post('/actual')
  @ApiResponse({
    type: UserActualResponse,
  })
  async PostActualUser(@Body() user: UserPostDto): Promise<UserActualResponse> {
    return this.UserService.postActualUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/actual')
  @ApiResponse({
    type: UserActualResponse,
  })
  async PutActualUser(
    @Body() user: UserPutDto,
    @Request() req,
  ): Promise<UserActualResponse> {
    return this.UserService.putActualUser(req.user._id, user);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    type: BasicUserResponse,
  })
  async getOneUser(@Param('id') id: string): Promise<BasicUserResponse> {
    return this.UserService.getOneUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({
    type: UserPostOneResponse,
  })
  async PostOneUser(@Body() user: UserPostDto): Promise<UserPostOneResponse> {
    return this.UserService.postOneUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiResponse({
    type: UserPutOneResponse,
  })
  async PutOneUser(
    @Body() user: UserPutDto,
    @Param('id') id: string,
  ): Promise<UserPutOneResponse> {
    return this.UserService.putOneUser(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({
    type: UserDeleteOneResponse,
  })
  async DeleteOneUser(@Param('id') id: string): Promise<UserDeleteOneResponse> {
    const response: UserDeleteOneResponse =
      await this.UserService.DeleteOneUser(id);
    if (response.status) {
      this.TasksService.deleteByUser(id).then(() => {
        console.log('Ended Process');
      });
    }
    return response;
  }
}
