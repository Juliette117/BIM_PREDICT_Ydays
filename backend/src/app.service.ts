import { Injectable } from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin.service';

@Injectable()
export class AppService {
  constructor(private readonly firebaseAdminService: FirebaseAdminService) {}

  getHealth() {
    return {
      name: 'bim-predict-backend',
      status: 'ok',
      timestamp: new Date().toISOString(),
      firebaseAdmin: this.firebaseAdminService.getStatus(),
    };
  }
}
