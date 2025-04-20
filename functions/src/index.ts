import cors from 'cors';
import express from 'express';
import admin, { ServiceAccount } from 'firebase-admin';
import * as logger from 'firebase-functions/logger';
import { onRequest } from 'firebase-functions/v2/https';

import * as serviceAccount from './firebase-admin.json';
import { routesConfig } from './users/routes-config';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});
const app = express();
const allowedOrigins = [
  'https://hotel-management-8a036.web.app/',
  'https://hotel-management-8a036.firebaseapp.com/',
  'http://localhost:4200',
];
const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) {
    if (allowedOrigins.indexOf(<string>origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(express.json());
app.use(cors(corsOptions));

routesConfig(app);

export const api = onRequest(app);

export const helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', {structuredData: true});
  response.send('Hello from Firebase!');
});

