import { Controller, Get} from '@nestjs/common';
import { UserService} from "../../services/user.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserGetAllResponse } from '../../interfaces/user.controllerResponse';

@ApiTags('User')
@Controller('user')
export class UserController{

  constructor (private UserService: UserService) {}

  @Get()
  @ApiResponse({
    type: UserGetAllResponse
  })
    async getAllUser(): Promise<UserGetAllResponse>{
      const response: UserGetAllResponse= new UserGetAllResponse();
      response.data = await this.UserService.getAllUsers();
      return response;
  }
}