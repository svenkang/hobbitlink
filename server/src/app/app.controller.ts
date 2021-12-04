import { Controller, Get } from '@nestjs/common';
import { AppService, WelcomeMessage } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getWelcome(): WelcomeMessage {
    return this.appService.getWelcome();
  }
}