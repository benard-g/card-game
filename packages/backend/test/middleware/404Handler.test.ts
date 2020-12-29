import { createRequestClient, RequestClient } from '../__utils__/apiRest';

describe('middleware/404Handler', () => {
  let request: RequestClient;

  beforeEach(async () => {
    request = await createRequestClient();
  });

  it('should return a 404 response', async () => {
    const { status, text } = await request.get('/not/existing/route');

    expect({ status, text }).toEqual({
      status: 404,
      text: 'Route or Resource not found',
    });
  });
});
