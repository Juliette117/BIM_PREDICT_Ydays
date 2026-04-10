import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { App as FirebaseAdminApp, cert, getApps, initializeApp } from 'firebase-admin/app';

@Injectable()
export class FirebaseAdminService {
  private readonly logger = new Logger(FirebaseAdminService.name);
  private firebaseApp: FirebaseAdminApp | null = null;
  private message = 'Firebase Admin non configure.';

  constructor(private readonly configService: ConfigService) {
    this.tryInitialize();
  }

  getStatus() {
    return {
      configured: this.firebaseApp !== null,
      projectId: this.configService.get<string>('FIREBASE_PROJECT_ID') ?? null,
      message: this.message,
    };
  }

  private tryInitialize(): void {
    const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');
    const clientEmail = this.configService.get<string>('FIREBASE_CLIENT_EMAIL');
    const privateKey = this.configService
      .get<string>('FIREBASE_PRIVATE_KEY')
      ?.replace(/\\n/g, '\n');
    const storageBucket = this.configService.get<string>('FIREBASE_STORAGE_BUCKET');

    if (!projectId || !clientEmail || !privateKey) {
      this.message =
        'Renseignez FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL et FIREBASE_PRIVATE_KEY.';
      return;
    }

    try {
      this.firebaseApp =
        getApps()[0] ??
        initializeApp({
          credential: cert({
            projectId,
            clientEmail,
            privateKey,
          }),
          storageBucket,
        });

      this.message = 'Firebase Admin initialise.';
    } catch (error) {
      this.firebaseApp = null;
      this.message = 'Firebase Admin n a pas pu etre initialise.';
      this.logger.error(
        error instanceof Error
          ? error.message
          : 'Erreur inconnue pendant l initialisation Firebase Admin.',
      );
    }
  }
}
