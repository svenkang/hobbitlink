import { Injectable } from '@nestjs/common';

export interface WelcomeMessage {
  message: string;
  visitedAt: string;
}

export const WELCOME_MESSAGE = {
  message: 'Welcome to Hobbit Link API 💚',
  visitedAt: new Date().toISOString(),
};

@Injectable()
export class AppService {
  getWelcome(): WelcomeMessage {
    return WELCOME_MESSAGE;
  }
}
