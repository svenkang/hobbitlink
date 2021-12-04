import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WELCOME_MESSAGE } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Welcome', () => {
    it('should respond with welcome message', () => {
      expect(appController.getWelcome()).toBe(WELCOME_MESSAGE);
    });
  });
});
