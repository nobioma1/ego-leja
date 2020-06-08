import supertest from 'supertest';

import { server } from '../server';

const request = supertest(server);

describe('[GET /] Server up checks endpoint', () => {
  it('returns an success with message if server is up', async () => {
    const res = await request.get('/');

    expect(res.status).toBe(200);
    expect(res.body.message).toEqual('transactions-service up 🚀');
  });
});
