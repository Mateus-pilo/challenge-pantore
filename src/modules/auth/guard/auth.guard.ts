import { EnvConfigService } from '@config/env/env-config.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { extractTokenFromHeader } from './extract-token-from-header.util';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private env: EnvConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.env.getSecretJWT(),
      });

      const currentTime = Math.floor(Date.now() / 1000);

      if (payload.exp < currentTime) {
        throw new UnauthorizedException('Token has expired');
      }

      request['user'] = {
        ...payload,
      };
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
