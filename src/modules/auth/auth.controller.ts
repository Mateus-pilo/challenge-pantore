import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dtos/login-request.dto';
import { ApiOkResponse } from '@nestjs/swagger';
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
  @Public()
  login(@Body() input: LoginRequestDto) {
    return this.authService.login(input);
  }
}
