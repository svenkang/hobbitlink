export interface WelcomeMessage {
  message: string;
  visitedAt: string;
}

export const WELCOME_MESSAGE = {
  message: 'Welcome to Hobbit Link API 💚',
  visitedAt: new Date().toISOString(),
};
