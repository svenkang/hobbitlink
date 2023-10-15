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
  public checkHealth(): HealthCheckResult {
    return this.healthzService.checkLiveness();
  }

  @HealthCheck()
  @ApiTags('liveness')
  public checkLiveness(): HealthCheckResult {
    return this.healthzService.checkLiveness();
  }

  @HealthCheck()
  @ApiTags('readiness')
  public async checkReadiness(): Promise<HealthCheckResult> {
    return await this.healthzService.checkAll();
  }
}
