import mongoose from 'mongoose';

import { server } from './api/server';
import { config } from './config';

async function startServer() {
  if (!config.JWT_KEY) {
    throw new Error('JWT_KEY not provided');
  }

  if (!config.MONGO_DB_URI) {
    throw new Error('MONGO_DB_URI not provided');
  }

  await mongoose.connect(config.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  server.listen(config.PORT, () => {
    console.log(`####🚀 Server listening on port: ${config.PORT} 🚀 ####`);
  });
}

startServer();
