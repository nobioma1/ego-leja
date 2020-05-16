import supertest from 'supertest';

import { server } from '../../api/server';
import { User } from '../../models/user';

const request = supertest(server);

describe('[PUT /api/users] Update User Details', () => {
  it('returns an error 400 if fields are not valid', async () => {
    const token = await global.signin();
    await request.put('/api/users').set('Cookie', token).send({}).expect(400);

    await request
      .put('/api/users')
      .set('Cookie', token)
      .send({
        fullName: '',
      })
      .expect(400);

    const res = await request.put('/api/users').set('Cookie', token).send({
      fullName: 'FullName',
      password: 'somePassword',
      email: 'test@email.com',
    });

    expect(res.body.errors).toHaveLength(3);
    expect(res.body.errors[1]).toEqual({
      message: 'password is not allowed',
      field: 'password',
    });
    expect(res.body.errors[2]).toEqual({
      message: 'email is not allowed',
      field: 'email',
    });
  });

  it('return a status of 401 if not authenticated', async () => {
    await request
      .put('/api/users')
      .send({
        fullName: 'New Name',
      })
      .expect(401);
  });

  it('return a status of 200 if fields are valid', async () => {
    await request
      .put('/api/users')
      .set('Cookie', await global.signin())
      .send({
        fullName: 'New Name',
      })
      .expect(200);
  });

  it('updates user account and send response', async () => {
    const newDetails = {
      fullName: 'New Test Name',
    };
    const res = await request
      .put('/api/users')
      .set('Cookie', await global.signin())
      .send(newDetails);

    const user = await User.findById(res.body.id);

    expect(user!.fullName).toEqual(newDetails.fullName);
    expect(res.body.fullName).toEqual(newDetails.fullName);
  });
});
