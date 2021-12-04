import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppService, WelcomeMessage } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags('hobbitlink')
  @ApiOkResponse({
    description: 'The app is successfully bootstrapped.',
  })
  getWelcome(): WelcomeMessage {
    return this.appService.getWelcome();
  }
}
