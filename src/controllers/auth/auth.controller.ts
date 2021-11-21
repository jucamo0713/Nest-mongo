import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserActualResponse } from '../../interfaces/user.controllerResponse';
import { LocalAuthGuard } from '../../services/security/auth/guards/localAuth.guard';
import { AuthService } from '../../services/security/auth/auth.service';
import { LoginDto } from '../../dto/auth.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @ApiResponse({
    type: UserActualResponse,
  })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Body() user: LoginDto,
    @Request() req,
  ): Promise<UserActualResponse> {
    return this.authService.login(req.user);
  }

  @Get()
  async root(): Promise<any> {
    return { hi: 'test for deploy' };
  }
}
