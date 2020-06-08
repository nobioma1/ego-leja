import mongoose from 'mongoose';

import { server } from './api/server';
import { config } from './config';
import {
  RecordCreatedListener,
  RecordUpdatedListener,
  RecordDeletedListener,
} from './events/listeners';
import { natsWrapper } from './utils/nats-wrapper';

async function startServer() {
  if (!config.JWT_KEY) {
    throw new Error('JWT_KEY not provided');
  }

  if (!config.MONGO_DB_URI) {
    throw new Error('MONGO_DB_URI not provided');
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID not provided');
  }

  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL not provided');
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID not provided');
  }

  try {
    await natsWrapper.connect({
      clusterId: process.env.NATS_CLUSTER_ID,
      clientId: process.env.NATS_CLIENT_ID,
      url: process.env.NATS_URL,
    });

    natsWrapper.client.on('close', () => {
      console.log('Transactions-Service NATS connection closed');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new RecordCreatedListener(natsWrapper.client).listen();
    new RecordUpdatedListener(natsWrapper.client).listen();
    new RecordDeletedListener(natsWrapper.client).listen();

    await mongoose.connect(config.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (e) {
    console.log(e);
  }

  server.listen(config.PORT, () => {
    console.log(`####🚀 Server listening on port: ${config.PORT} 🚀 ####`);
  });
}

startServer();
