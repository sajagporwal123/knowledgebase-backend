/**
 * Enviornment Variables
 */
const envConfig = {
  secretKey: process.env.SECRET_KEY,
  serverPort: process.env.SERVER_PORT,
  nodeEnv: process.env.NODE_ENV,
  S3ContentBuckerPath: process.env.S3_CONTENT_BUCKET_PATH,
  contentPath: process.env.CONTENT_PATH,
  contentDbName: process.env.CONTENT_DB_DATABSE,
  contentDbUser: process.env.CONTENT_DB_USER,
  contentDbPassword: process.env.CONTENT_DB_PASSWORD,
  contentDbHost: process.env.CONTENT_DB_HOST,
  contentDbPort: process.env.CONTENT_DB_PORT,
  userDbHost: process.env.USER_DB_HOST,
  userDbPort: process.env.USER_DB_PORT,
  userDbName: process.env.USER_DB_DATABSE,
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsSecretKey: process.env.AWS_SECRET_KEY,
  S3BucketName: process.env.S3_BUCKET_NAME,
  showLog: process.env.SHOW_LOG,
  timeZone: process.env.TIMEZONE,
  saltRounds: process.env.SALT_ROUNDS,
};

module.exports = envConfig;
