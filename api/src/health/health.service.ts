import { Injectable } from '@nestjs/common';
import {
  HealthCheckResult,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class HealthService {
  public constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  /**
   * Checks the service liveness
   *
   * @returns
   */
  public checkLiveness(): HealthCheckResult {
    return {
      status: 'ok',
      details: {
        service: {
          status: 'up',
        },
      },
    };
  }

  /**
   * Checks all the service dependencies
   *
   * @returns HealthCheckResult
   */
  public async checkAll(): Promise<HealthCheckResult> {
    return await this.health.check([() => this.db.pingCheck('database')]);
  }
}
