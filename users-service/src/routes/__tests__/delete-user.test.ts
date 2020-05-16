import supertest from 'supertest';

import { server } from '../../api/server';
import { User } from '../../models/user';

const request = supertest(server);

describe('[DELETE /api/users] Delete User Account', () => {
  it('returns an error 400 if password field is not valid', async () => {
    const token = await global.signin();
    await request
      .delete('/api/users')
      .set('Cookie', token)
      .send({})
      .expect(400);

    await request
      .delete('/api/users')
      .set('Cookie', token)
      .send({ password: '' })
      .expect(400);
  });

  it('return a status of 401 if users is not authenticated', async () => {
    await request
      .delete('/api/users')
      .send({ password: 'somepassword' })
      .expect(401);
  });

  it('validates user password', async () => {
    const res = await request
      .delete('/api/users')
      .set('Cookie', await global.signin())
      .send({ password: 'wrongpassword' });

    expect(res.status).toBe(400);
    expect(res.body.errors[0]).toEqual({ message: 'Incorrect Password' });
  });

  it('deletes user account and return status of 204', async () => {
    let users = await User.find();
    expect(users).toHaveLength(0);

    const token = await global.signin();
    users = await User.find();
    expect(users).toHaveLength(1);

    const res = await request
      .delete('/api/users')
      .set('Cookie', token)
      .send({ password: 'password' });

    users = await User.find();
    expect(res.status).toBe(204);
    expect(users).toHaveLength(0);
  });
});
