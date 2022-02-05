import { Body, Controller, Get } from '@nestjs/common';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { GetProxyUrlDto } from './proxy.dto';
import { ProxyService } from './proxy.service';

@Controller('proxy')
export class ProxyController {
  public constructor(private readonly proxyService: ProxyService) {}

  @Get()
  @ApiTags('proxy')
  @ApiBadRequestResponse({
    description: 'The given request body is not valid.',
  })
  public async toUrl(@Body() getProxyUrlDto: GetProxyUrlDto): Promise<any> {
    return await this.proxyService.toUrl(getProxyUrlDto);
  }
}
