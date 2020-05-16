import supertest from 'supertest';

import { server } from '../../api/server';
import { User } from '../../models/user';

const request = supertest(server);

describe('[POST /api/users/change-password] Change user password', () => {
  it('returns an error 400 if fields are not valid', async () => {
    const token = await global.signin();
    await request
      .post('/api/users/change-password')
      .set('Cookie', token)
      .send({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      .expect(400);

    await request
      .post('/api/users/change-password')
      .set('Cookie', token)
      .send({
        newPassword: '',
        confirmPassword: '',
      })
      .expect(400);
  });

  it('does not store plain password', async () => {
    const res = await request
      .post('/api/users/change-password')
      .set('Cookie', await global.signin())
      .send({
        currentPassword: 'password',
        newPassword: 'newPassword',
        confirmPassword: 'newPassword',
      })
      .expect(200);

    const user = await User.findById(res.body.id);

    expect(user!.password).toBeDefined();
    expect(user!.password).not.toEqual('newPassword');
  });

  it('validate old password match', async () => {
    const res = await request
      .post('/api/users/change-password')
      .set('Cookie', await global.signin())
      .send({
        currentPassword: 'wrongPassword',
        newPassword: 'newPassword',
        confirmPassword: 'newPassword',
      });
    expect(res.status).toBe(400);
    expect(res.body.errors[0]).toEqual({ message: 'Incorrect Password' });
  });

  it('changes user password', async () => {
    await request
      .post('/api/users/change-password')
      .set('Cookie', await global.signin())
      .send({
        currentPassword: 'password',
        newPassword: 'newPassword',
        confirmPassword: 'newPassword',
      })
      .expect(200);

    await request
      .post('/api/users/signin')
      .send({
        email: 'test@email.com',
        password: 'newPassword',
      })
      .expect(200);
  });
});
