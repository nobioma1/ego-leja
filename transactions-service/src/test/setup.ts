import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { generateID } from './helpers/generate-id';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): { cookie: string[]; id: string };
    }
  }
}

let mongo: any;

jest.mock('../utils/nats-wrapper');

beforeAll(async () => {
  jest.clearAllMocks();

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  process.env.JWT_KEY = 'someTestJWTSecret';
  process.env.MONGO_DB_URI = mongoUri;

  await mongoose.connect(process.env.MONGO_DB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  // Build JwT payload {id, email}
  const id = generateID();
  const payload = {
    id,
    email: 'test@test.com',
  };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object {token: JWT}
  const session = { token };

  // Turn the session object to JSON
  const sessionJSON = JSON.stringify(session);

  // Encode session to base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return encoded express:sess=encoded
  return {
    cookie: [`express:sess=${base64}`],
    id,
  };
};
