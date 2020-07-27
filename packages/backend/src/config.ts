import dotenv from 'dotenv';
dotenv.config();

const {
  HOST,
  PORT,
  MONGO_URI,
  DB_NAME,
  JWT_SECRET,
  JWT_EXPIRY,
  REFRESH_EXPIRY,
  APP_ENV,
  SMTP_HOST,
  SMTP_USER,
  SMTP_PASS,
  STORAGE_BUCKET,
  STORAGE_SIGNED_URI_EXPIRY,
  STORAGE_PREFIX,
} = process.env;

const config = {
  host: HOST || 'localhost',
  port: Number(PORT) || 5000,
  mongoURI: MONGO_URI,
  DBName: DB_NAME || 'fund',
  JWTSecret: JWT_SECRET,
  JWTExpiry: JWT_EXPIRY || '15m',
  refreshTokenExpiry: REFRESH_EXPIRY || '365d',
  frontendOrigins: [/localhost/, /gov\.in/, /127\.0\.0\.1/],
  isProd: APP_ENV === 'production',
  smtp: {
    host: SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  },
  storage: {
    bucket: STORAGE_BUCKET || 'fund-stg',
    signedExpiry: STORAGE_SIGNED_URI_EXPIRY || '1h',
    prefix: STORAGE_PREFIX || 'fund/', // Global prefix for objects on bucket
  },
};

export default config;
