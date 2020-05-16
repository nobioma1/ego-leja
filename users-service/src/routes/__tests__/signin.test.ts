import supertest from 'supertest';

import { server } from '../../api/server';

const request = supertest(server);

describe('[POST /api/users/signin] Sign in Existing User', () => {
  it('returns an error 400 if fields are not valid', async () => {
    await request
      .post('/api/users/signin')
      .send({
        email: '',
        password: '',
      })
      .expect(400);

    await request
      .post('/api/users/signin')
      .send({
        email: '',
      })
      .expect(400);

    const res = await request
      .post('/api/users/signin')
      .send({
        someField: '',
        password: 'somePassword',
      })
      .expect(400);

    expect(res.body.errors).toBeInstanceOf(Array);
    expect(res.body.errors).toHaveLength(2);
    expect(res.body.errors[1].message).toEqual('someField is not allowed');
    expect(res.body.errors[1].field).toEqual('someField');
  });

  it('return a status of 200 if fields are valid', async () => {
    await request.post('/api/users/signup').send({
      fullName: 'John Doe',
      email: 'test@test.com',
      password: 'somepassword',
    });

    await request
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'somepassword',
      })
      .expect(200);
  });

  it('validates user credentials', async () => {
    await request.post('/api/users/signup').send({
      fullName: 'John Doe',
      email: 'test@test.com',
      password: 'somepassword',
    });

    const passRes = await request.post('/api/users/signin').send({
      email: 'test@email.com',
      password: 'wrongPassword',
    });

    const emailRes = await request.post('/api/users/signin').send({
      email: 'email@email.com',
      password: 'somepassword',
    });

    expect(emailRes.status).toBe(400);
    expect(passRes.status).toBe(400);
    expect(passRes.body.errors[0].message).toEqual(
      'Invalid Username or Password'
    );
  });

  it('sign in user and set cookie header', async () => {
    await request.post('/api/users/signup').send({
      fullName: 'John Doe',
      email: 'test@test.com',
      password: 'somepassword',
    });

    const res = await request.post('/api/users/signin').send({
      email: 'test@test.com',
      password: 'somepassword',
    });

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email');
    expect(res.get('Set-Cookie')).toBeDefined();
  });
});
