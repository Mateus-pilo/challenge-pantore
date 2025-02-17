import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { EnvConfigService } from '@config/env/env-config.service';
import { EnvConfigModule } from '@config/env/env-config.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [
    EnvConfigModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory: (env: EnvConfigService) => {
        return {
          global: true,
          secret: env.getSecretJWT(),
          signOptions: { expiresIn: env.getExpirationTokenJWT() },
        };
      },
      inject: [EnvConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
