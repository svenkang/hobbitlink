import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { WelcomeMessage } from './app.interface';
import { Public } from './../auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @ApiTags('hobbitlink')
  @ApiOkResponse({
    description: 'The app is successfully bootstrapped.',
  })
  getWelcome(): WelcomeMessage {
    return this.appService.getWelcome();
  }
}
