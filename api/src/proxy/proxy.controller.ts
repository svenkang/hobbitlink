import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { Url } from '../url/url.entity';
import { GetProxyUrlDto } from './proxy.read.dto';
import { ProxyService } from './proxy.service';
import { PermissionGuard, SetPermissions } from './../auth/auth.guard';
import { UserTier } from './../user/user.interface';

@Controller('proxy')
export class ProxyController {
  public constructor(private readonly proxyService: ProxyService) {}

  @Get()
  @ApiTags('proxy')
  @ApiBadRequestResponse({
    description: 'The given request body is not valid.',
  })
  @SetPermissions([UserTier.BASIC, UserTier.PRO])
  @UseGuards(PermissionGuard)
  public async toUrl(
    @Body() getProxyUrlDto: GetProxyUrlDto,
  ): Promise<Url | undefined> {
    return await this.proxyService.toUrl(getProxyUrlDto);
  }
}
