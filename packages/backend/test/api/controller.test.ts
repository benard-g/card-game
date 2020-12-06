import { createRequestClient, RequestClient } from '../__utils__/apiRest';

describe('api/controller', () => {
  let request: RequestClient;

  beforeEach(async () => {
    request = await createRequestClient();
  });

  describe('GET /', () => {
    it('should send a successful response', async () => {
      const { status, body } = await request.get('/api');

      expect({ status, body }).toEqual({
        status: 200,
        body: {
          title: 'Card game API',
          status: 'UP',
          timestamp: expect.any(Number),
        },
      });
    });

    it('should send a higher timestamp every time', async () => {
      const {
        body: { timestamp: timestamp1 },
      } = await request.get('/api');
      const {
        body: { timestamp: timestamp2 },
      } = await request.get('/api');

      expect(timestamp2).toBeGreaterThan(timestamp1);
    });
  });
});
