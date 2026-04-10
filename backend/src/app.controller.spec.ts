import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseAdminService } from './firebase-admin.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      controllers: [AppController],
      providers: [AppService, FirebaseAdminService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('health', () => {
    it('should return an ok payload', () => {
      expect(appController.getHealth()).toMatchObject({
        name: 'bim-predict-backend',
        status: 'ok',
      });
    });
  });
});
