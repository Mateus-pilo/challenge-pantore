import { EnvConfigModule } from '@config/env/env-config.module';
import { EnvConfigService } from '@config/env/env-config.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { models } from './models';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [EnvConfigModule],
      useFactory: (env: EnvConfigService) => {
        return {
          dialect: 'postgres',
          host: env.getDatabaseHost(),
          username: env.getDatabaseUser(),
          password: env.getDatabasePassword(),
          database: env.getDatabaseName(),
          autoLoadModels: false,
          synchronize: false,
          port: env.getDatabasePort(),
          define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
          },
          dialectOptions: {
            useUTC: true,
            ssl:
              env.getStage() !== 'development'
                ? {
                    require: true,
                    rejectUnauthorized: false,
                  }
                : null,
          },
          pool: {
            min: env.getDatabaseMinPoolSize(),
            max: env.getDatabaseMaxPoolSize(),
          },
          models,
        };
      },
      inject: [EnvConfigService],
    }),
  ],
})
export class SequelizeAdapterModule {}
