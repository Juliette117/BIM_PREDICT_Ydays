import { FirebaseOptions } from 'firebase/app';

interface AppEnvironment {
  apiUrl: string;
  firebase: FirebaseOptions;
}

export const environment: AppEnvironment = {
  apiUrl: 'http://localhost:3000/api',
  firebase: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  },
};
