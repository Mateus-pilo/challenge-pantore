import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dtos/login-request.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { LoginResponseDto } from './dtos/login-response.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({
    description: `User logged successfully`,
    type: LoginResponseDto,
  })
  @ApiOperation({
    description: 'Login user',
    summary: 'Login',
  })
  @Public()
  login(@Body() input: LoginRequestDto) {
    return this.authService.login(input);
  }
}
