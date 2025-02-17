import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  SequelizeHealthIndicator,
} from '@nestjs/terminus';
import { AppHealthIndicator } from './app.health';
import { Public } from 'src/modules/auth/decorators/public.decorator';

@ApiTags('Health Check')
@Controller(['health'])
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private appIndicator: AppHealthIndicator,
    private dbhealth: SequelizeHealthIndicator,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Verifica a disponibilidade de API',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: String,
  })
  @Public()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.dbhealth.pingCheck('Database'),
      () => this.appIndicator.isHealthy(),
    ]);
  }
}
