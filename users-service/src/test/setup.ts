import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import { server } from '../api/server';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}

let mongo: any;

beforeAll(async () => {
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

global.signin = async () => {
  const res = await request(server)
    .post('/api/users/signup')
    .send({
      fullName: 'John Doe',
      email: 'test@email.com',
      password: 'password',
    })
    .expect(201);

  const cookie = res.get('Set-Cookie');

  return cookie;
};
