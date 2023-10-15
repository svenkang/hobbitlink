import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { HealthService } from './health.service';
import { Public } from './../auth/auth.guard';

@Controller('health')
export class HealthController {
  public constructor(private readonly healthzService: HealthService) {}

  @Public()
  @Get()
  @HealthCheck()
  @ApiTags('health')
  public checkHealth(): HealthCheckResult {
    return this.healthzService.checkLiveness();
  }

  @Public()
  @HealthCheck()
  @ApiTags('liveness')
  public checkLiveness(): HealthCheckResult {
    return this.healthzService.checkLiveness();
  }

  @Public()
  @HealthCheck()
  @ApiTags('readiness')
  public async checkReadiness(): Promise<HealthCheckResult> {
    return await this.healthzService.checkAll();
  }
}
