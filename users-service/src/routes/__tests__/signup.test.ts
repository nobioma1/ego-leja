import supertest from 'supertest';

import { server } from '../../api/server';
import { User } from '../../models/user';

const request = supertest(server);

describe('[POST /api/users/signup] Create New User', () => {
  it('returns an error 400 if fields are not valid', async () => {
    await request
      .post('/api/users/signup')
      .send({
        fullName: 'John Doe',
        email: '',
        password: '',
      })
      .expect(400);

    await request
      .post('/api/users/signup')
      .send({
        email: '',
        password: '',
      })
      .expect(400);

    const res = await request
      .post('/api/users/signup')
      .send({
        fullName: '',
        password: 'somePassword',
      })
      .expect(400);

    expect(res.body.errors).toBeInstanceOf(Array);
    expect(res.body.errors).toHaveLength(2);
    expect(res.body.errors[0].message).toEqual(
      'Full Name is not allowed to be empty'
    );
    expect(res.body.errors[0].field).toEqual('fullName');
  });

  it('does not store plain password', async () => {
    const userField = {
      fullName: 'John Doe',
      email: 'test@email.com',
      password: 'somePassword',
    };

    const res = await request
      .post('/api/users/signup')
      .send(userField)
      .expect(201);

    const user = await User.findById(res.body.id);

    expect(user!.password).toBeDefined();
    expect(user!.password).not.toEqual(userField.password);
  });

  it('ensures email is unique', async () => {
    await request.post('/api/users/signup').send({
      fullName: 'John Doe',
      email: 'test@email.com',
      password: 'somePassword',
    });

    const res = await request.post('/api/users/signup').send({
      fullName: 'John Doe',
      email: 'test@email.com',
      password: 'somePassword',
    });

    expect(res.status).toBe(400);
  });

  it('return a status of 201 if fields are valid', async () => {
    await request
      .post('/api/users/signup')
      .send({
        fullName: 'John Doe',
        email: 'test@email.com',
        password: 'somePassword',
      })
      .expect(201);
  });

  it('creates user account and send response', async () => {
    const userField = {
      fullName: 'John Doe',
      email: 'test@email.com',
      password: 'somePassword',
    };

    const res = await request.post('/api/users/signup').send(userField);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('createdAt');
    expect(res.body).not.toHaveProperty('password');
    expect(res.body.fullName).toEqual(userField.fullName);
    expect(res.body.email).toEqual(userField.email);
  });

  it('sets cookie after successful signup', async () => {
    const res = await request.post('/api/users/signup').send({
      fullName: 'John Doe',
      email: 'test@test.com',
      password: 'somepassword',
    });

    expect(res.get('Set-Cookie')).toBeDefined();
  });
});
