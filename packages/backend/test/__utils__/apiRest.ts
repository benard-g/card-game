import SuperTest from 'supertest';

import { Server } from '../../src/Server';

export type RequestClient = ReturnType<typeof SuperTest>;

export async function createRequestClient(): Promise<RequestClient> {
  const server = new Server();

  await server.init({ devMode: false });

  return SuperTest(server.getApp());
}
