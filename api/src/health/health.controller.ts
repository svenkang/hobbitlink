import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  public constructor(private readonly healthzService: HealthService) {}

  @Get()
  @HealthCheck()
  @ApiTags('health')
  public async check(): Promise<HealthCheckResult> {
    return await this.healthzService.checkAll();
  }
}
