import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService {
  constructor(private readonly configService: ConfigService) {}

  getDatabasePort(): number {
    return Number(this.configService.get<number>('DATABASE_PORT'));
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabaseMinPoolSize(): number {
    return Number(this.configService.get<number>('DATABASE_MIN_POOL'));
  }

  getDatabaseMaxPoolSize(): number {
    return Number(this.configService.get<number>('DATABASE_MAX_POOL'));
  }

  getServerPort(): number {
    return Number(this.configService.get<number>('SERVER_PORT'));
  }

  getStage(): string {
    return String(this.configService.get<string>('NODE_ENV'));
  }

  getSecretJWT(): string {
    return String(this.configService.get<string>('JWT_SECRET'));
  }

  getExpirationTokenJWT(): string {
    return String(this.configService.get<string>('JWT_EXPIRED'));
  }
}
