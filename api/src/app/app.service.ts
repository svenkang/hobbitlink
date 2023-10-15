import { Injectable } from '@nestjs/common';
import { WELCOME_MESSAGE, WelcomeMessage } from './app.interface';

@Injectable()
export class AppService {
  /**
   * Get the welcome message
   *
   * @returns WelcomeMessage
   */
  getWelcome(): WelcomeMessage {
    return WELCOME_MESSAGE;
  }
}
