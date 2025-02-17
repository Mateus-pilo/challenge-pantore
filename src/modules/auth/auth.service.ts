import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginRequestDto } from './dtos/login-request.dto';
import { UserService } from '../user/user.service';
import { CryptoUtils } from '@shared/crypto/crypto.util';
import { JwtService } from '@nestjs/jwt';
import { EnvConfigService } from '@config/env/env-config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly env: EnvConfigService,
  ) {}
  async login(input: LoginRequestDto) {
    const user = await this.userService.findByEmail(input.email);
    if (!user) throw new BadRequestException('User or password incorrect');

    const passwordCompare = await CryptoUtils.comparePassword(
      input.password,
      user.password,
    );

    if (!passwordCompare)
      throw new BadRequestException('User or password incorrect');

    const token = await this.jwtService.signAsync({
      user: {
        name: user.name,
        function: user.function,
        email: user.email,
        id: user.id,
      },
    });

    return {
      token,
      expiration: this.env.getExpirationTokenJWT(),
    };
  }
}
