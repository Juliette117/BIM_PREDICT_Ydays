import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let appController: AppController;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appController = moduleFixture.get(AppController);
  });

  it('/api/health (GET)', () => {
    expect(appController.getHealth()).toMatchObject({
      name: 'bim-predict-backend',
      status: 'ok',
    });
  });
});
