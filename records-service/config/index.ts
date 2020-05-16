// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export const config = {
  JWT_KEY: process.env.JWT_KEY,
  PORT: process.env.PORT || 5000,
};
