import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

const dbConfig = {
  type: 'postgres' as const,
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'tenant-service',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
  ssl: true,
};

export const databaseConfig: TypeOrmModuleOptions = dbConfig;

export const AppDataSource = new DataSource(dbConfig);


// NODE_ENV=local # production, development, local
// CONTEXT=TEST
// DEFAULT_SUPERADMIN_EMAIL=tdasdi@ivorypay.io
// DEFAULT_SUPERADMIN_PASSWORD=dasdasd
// PORT=7008

// DATABASE_TYPE=postgres
// DATABASE_HOST=localhost
// DATABASE_PORT=5432
// DATABASE_USER=postgres
// DATABASE_PASSWORD=123Password
// DATABASE_NAME=duffle_v2
// DATABASE_SYNCHRONIZE=false
// DATABASE_MAX_CONNECTIONS=100
// DATABASE_IDLE_TIMEOUT=10000
// DATABASE_KEEPALIVE_IDLE=30
// DATABASE_SSL_ENABLED=false
// DATABASE_REJECT_UNAUTHORIZED=false
// DATABASE_CA=""
// DATABASE_KEY=""
// DATABASE_CERT=""


// MAIL_HOST=sandbox.smtp.mailtrap.io
// MAIL_PORT=2525
// MAIL_USERNAME=73c3b7d4b3647a
// MAIL_PASSWORD=1b87c115497e65

// AWS_ACCESS_KEY_ID=sads
// AWS_SECRET_ACCESS_KEY=sadasd
// AWS_S3_BUCKET=mansa-dev
// AWS_S3_BUCKET_REGION=eu-west-2
// REDIS_HOST=localhost
// REDIS_PORT=6379
// REDIS_USER=
// REDIS_PASSWORD=
// # Ivorypay
// IVORYPAY_API_BASE_URL=https://api.ivorypay.io/v1
// IVORYPAY_API_SECRET_KEY=dasdasdas
// # Firebase
// FIREBASE_ACCOUNT_TYPE=service_account
// FIREBASE_PROJECT_ID=mansa-mobile
// FIREBASE_PRIVATE_KEY_ID="00ec4d9022d0b73f85a391146f685284b00f9e49"
// FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDlr8oq4iEjicqN\nOvJFq/i9SAtuqmrl4oqE+45YHm1YTaHhQ2HQx5F1lDU9WwnHvPxJ0gDE4sME/ekK\nbxA8YwnMqZJ1hLgx+pIuMPEoH4i6w6/IlpzbOuYND8UcLcoASpzWgeAgs/cjsvpm\nvb0VMiasgqQStfRORH49kM3fMezX2bKkti4xDKBRB/SQmRqJl5GwZBNbRsLG9wZa\nV6K3qMwHJ9CP2Wku5cJRwrKGQxCto6oXh4jVM4PvYfVbNMWMWJa9TqUFhsxfEOq2\nICw4FqnVoK4w0cgYx6dqCGpKG1/be4A4U0EhIlvG/Nrcdej6RIV/GKBdOcCEMMSA\n64T9U151AgMBAAECggEACgd8rsCvAmvq3J3dTwOCWf7XrkkMtTsIzLkQmcfCWIpo\nmNB7aJq+PuxuIrQN9PB18mHpcgTAz+qnuV0+JT+Mgaj0jI3Is+NQF2pAWCiAV5S3\nNpgKWLGgB/lPTxAEyQcjsA4oaOUoKSE7OS9ByWImOX7UMT5MC6WGqaOKtHCWpJoi\nEFS53z3sd+/icAa0dbLzgVbr5y+nx9L/zNWVOp9X+isxj9ffHzLH4wY7SDbA5Re7\n3SFcHfZ5TFviNVZcJwhwdIS8F9IAyqzh+scZZMWyTmWN9uNZKyUttQ0BL9uLEuvE\nUeIfuCWZ+yzNkTJ8MLFml/PobT6QG4ZnRv73hUFQhQKBgQD04Yey5vMqakjpEGOG\nxoKB8uRskcRu4L09Sff/vUCbsKLHkvEFqD86WINJdlzJ1zo6w9NoXi+Wy+eGLzKT\nvQplbMYgIm01D7XtO2Xk+7DDXqNuOicCtisT+IX1iHupnbGgploSUPzo3Pt7n87P\nXFP0POLUskM5QPWzBXYiDQI/+wKBgQDwHaSMaJ9+vYi1zsVSuDD0R8NZi43PqrIr\nmjHUCufSc0e4eNu39+nbGQ3xPM3vLp8GOb2d+dcN9Hdub7zCyWDJP5vRNH+buOLC\nWRWR8fXr0u9hnrOXr/3res8pBvptxLS9VsWZ1zbxAr64AmkhYkcbjzf/gp5C2VNy\nzppn5hLgTwKBgQDiRPIqMJRHgOXV1Lrh8dLtWA4Q86/Z8/doBk0NFUX5lgES/4eN\nfqTNuLO20ZNzPVgkrIVPTpgScl5/8mR9dpOAnD2Fu8nE2bt0dQn1x0rRe0TvuPQK\n4WB0l5LQCUiatYdHte5MNmE6mdYVqNhjaiB48Tl25zCOWqOsw0Mgu3x0uQKBgBJN\n8DFT+HSs9jMF5Dz+FZ1Jqza0UMc3+AUi6BGGE04Tw6/oZreLiqRNMKbnP7uwDidn\nV3EnjqFdtY0Rr44Z0+sDkllMaz3vxjmSmPZbP6gOmHkUpBQ4Ml81KX2zLnwXtr+I\nUd/8bA/LacaVSHZnC4yqSlaMGox2DMp/vX2WKHI5AoGAW9ZLUg9wR+7u5uwgbtrG\nb1xfR3JZTAcz89Ucggm85xKZlbZejSbTsS3axpdGF2xyMYlb2lzRSh+fa3NbsXMJ\nNU2krWB8g/Ezpf8NtTxhTWIo8m8ghF5zaxuZnrXNeAmQWAu4Qam2RqgxfQEdY0Xu\nfrjb9Yy6It2tDn4dv+FYwxw=\n-----END PRIVATE KEY-----\n"
// FIREBASE_CLIENT_EMAIL=firebase-adminsdk-wh4kc@mansa-mobile.iam.gserviceaccount.com
// FIREBASE_CLIENT_ID=107368503885702671005
// FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wh4kc%40mansa-mobile.iam.gserviceaccount.com

// # Two-factor authentication
// TFA_SECRET_ENCRYPTION_KEY=v84tVfnfh8M3hna1H5vr1Prfedj7tvm7
// TFA_ENCRYPTION_IV=v84tVfnfh8M3hna1H5vr1Prfedj7tvm7
// TFA_ENCRYPTION_ALGORITHM=aes-256-cbc
// TFA_TOTP_TIME_STEPS=90
// # Admin
// ADMIN_DASHBOARD_UI_BASE_URL=http://localhost:3001

// API_KEYS_ENCRYPTION_KEY=JFh45nvcn5i0heji5P3bePn45SnZW
// THROTTLE_TTL=600000
// THROTTLE_LIMIT=60000

// #JWT
// JWT_SECRET=dasdasd
// JWT_EXPIRATION=1d
// JWT_REFRESH_EXPIRATION=7d
// JWT_SALT_ROUND=10


// # KAFKA
// KAFKA_BROKERS=18.130.220.103:9092
// KAFKA_CLIENT_ID=duffle
// KAFKA_CONSUMER_ID=duffle-consumer
// KAFKA_USERNAME=
// KAFKA_PASSWORD=


// #SWAGGER
// SWAGGER_TITLE="Mansa API"
// SWAGGER_DESCRIPTION="Mansa API Documentation"
// SWAGGER_PATH=api-docs


// PAYMENT_SERVICE_URL=http://18.130.220.103:7001
// PAYMENT_SERVICE_API_KEY=a7dba466ef4ad6f0bc9745b437193cd9fd29a7e74c99173b6358342808ec0ee4


// CONVERSION_SERVICE_URL=http://18.130.220.103:7005
// CONVERSION_SERVICE_API_KEY=a7dba466ef4ad6f0bc9745b437193cd9fd29a7e74c99173b6358342808ec0ee4


// NOTIFICATION_SERVICE_URL=http://18.130.220.103:7007
// NOTIFICATION_SERVICE_API_KEY=a7dba466ef4ad6f0bc9745b437193cd9fd29a7e74c99173b6358342808ec0ee4

// IVORYPAY_BUSINESS_URL=http://18.130.220.103:7006
// IVORYPAY_BUSINESS_API_KEY=a7dba466ef4ad6f0bc9745b437193cd9fd29a7e74c99173b6358342808ec0ee4


// DOJAH_APP_ID=6788dc22a5a0229a0abc6074
// DOJAH_TEST_URL=https://sandbox.dojah.io
// DOJAH_TEST_API_KEY=dasdasda
// DOJAH_LIVE_URL=https://api.dojah.io
// DOJAH_LIVE_API_KEY=dsadasd

// IOS_INTERCOM_SECRET_KEY=dasdasd-l
// INTERCOM_SECRET_KEY=dasdasdas