import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { WELCOME_MESSAGE } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('getWelcome', () => {
    it('should get the welcome message', () => {
      expect(appService.getWelcome()).toBe(WELCOME_MESSAGE);
    });
  });
});
