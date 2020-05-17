// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export const config = {
  JWT_KEY: process.env.JWT_KEY,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  PORT: process.env.PORT || 5000,
};
