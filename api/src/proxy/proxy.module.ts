import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from '../url/url.entity';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  controllers: [ProxyController],
  providers: [ProxyService],
})
export class ProxyModule {}
