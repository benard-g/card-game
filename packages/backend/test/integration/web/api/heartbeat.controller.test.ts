import request from 'supertest';

import { createWebProcess } from '../../../__utils__/createWebProcess';

describe('web/api/heartbeat', () => {
  const [app, webProcess] = createWebProcess();

  beforeAll(async () => {
    await webProcess.start();
  });

  afterAll(async () => {
    await webProcess.stop();
  });

  it('should return a valid heartbeat', async () => {
    const res = await request(app).get('/api');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      name: 'Card-Game API',
      heartbeat: expect.any(Number),
    });
  });

  it('should return a higher value after every new call', async () => {
    const res1 = await request(app).get('/api');
    const res2 = await request(app).get('/api');

    const heartbeat1 = res1.body.heartbeat;
    const heartbeat2 = res2.body.heartbeat;

    expect(heartbeat2).toBeGreaterThanOrEqual(heartbeat1);
  });
});
