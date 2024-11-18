import admin from 'firebase-admin';

const serviceAccount = JSON.parse(
  Buffer.from(process.env.NEXT_PUBLIC_FIREBASE_SECRET!, "base64").toString()
);


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
