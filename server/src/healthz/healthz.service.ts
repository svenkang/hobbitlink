import { Injectable } from '@nestjs/common';
import {
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class HealthzService {
  public constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  public async checkAll(): Promise<HealthCheckResult> {
    return await this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
      () => this.db.pingCheck('database'),
    ]);
  }
}
