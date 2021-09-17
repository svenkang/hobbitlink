import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthzController } from './healthz.controller';
import { HealthzService } from './healthz.service';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthzController],
  providers: [HealthzService],
})
export class HealthzModule {}
