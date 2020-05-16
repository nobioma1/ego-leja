import supertest from 'supertest';

import { server } from '../../api/server';

const request = supertest(server);

describe('[POST /api/users/signout] Sign out user', () => {
  it('sign out user and remove token ', async () => {
    const user = await request
      .post('/api/users/signup')
      .send({
        fullName: 'John Doe',
        email: 'test@email.com',
        password: 'password',
      })
      .expect(201);

    const cookie = user.get('Set-Cookie');

    const res = await request
      .post('/api/users/signout')
      .set('Cookie', cookie)
      .send({});

    expect(res.status).toBe(200);
    expect(res.get('Set-Cookie')[0]).toEqual(
      'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    );
  });
});
