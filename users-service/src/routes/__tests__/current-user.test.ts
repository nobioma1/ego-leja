import supertest from 'supertest';

import { server } from '../../api/server';

const request = supertest(server);

describe('[GET /api/users] Get the current user information', () => {
  it('returns an error 401 if user is not logged in', async () => {
    await request.get('/api/users').expect(401);
  });

  it('return a status of 200 if user is logged and returns user details', async () => {
    const res = await request
      .get('/api/users')
      .set('Cookie', await global.signin());

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('id');
  });
});
