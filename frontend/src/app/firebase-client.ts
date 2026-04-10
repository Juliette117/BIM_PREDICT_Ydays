import { FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';

function hasRequiredFirebaseKeys(config: FirebaseOptions): boolean {
  return Boolean(config.apiKey && config.appId && config.projectId);
}

export function getFirebaseClientStatus() {
  if (!hasRequiredFirebaseKeys(environment.firebase)) {
    return {
      configured: false,
      projectId: environment.firebase.projectId ?? null,
      message: 'Renseignez la configuration Firebase web dans environment.ts.',
    };
  }

  const app = getApps()[0] ?? initializeApp(environment.firebase);

  return {
    configured: true,
    projectId: app.options.projectId ?? null,
    message: `Firebase web initialise avec l application ${getApp().name}.`,
  };
}
