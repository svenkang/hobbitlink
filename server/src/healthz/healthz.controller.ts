import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { HealthzService } from './healthz.service';

@Controller('healthz')
export class HealthzController {
  constructor(private readonly healthzService: HealthzService) {}

  @Get()
  @HealthCheck()
  @ApiTags('hobbitlink')
  async check(): Promise<HealthCheckResult> {
    return await this.healthzService.checkAll();
  }
}
