import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { SwaggerConfigModule } from '@config/swagger';
import { EnvConfigModule } from '@config/env/env-config.module';
import { SequelizeAdapterModule } from '@shared/database/sequelize/sequelize.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    HealthModule,
    SwaggerConfigModule,
    EnvConfigModule,
    SequelizeAdapterModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
