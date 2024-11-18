import admin from 'firebase-admin';
import path from 'path';

const serviceAccount =
  process.env.NEXT_PUBLIC_FIREBASE_ADMIN_MODE === 'development'
    ? path.join(process.cwd(), 'configs', 'firebaseSecrets-dev.json')
    : require('./firebaseSecrets-prod.json');

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });
  }
} catch (error) {
  console.log('error init firebase admin: ', error);
}

export default admin;
