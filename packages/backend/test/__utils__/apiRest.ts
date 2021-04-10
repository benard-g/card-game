import SuperTest from 'supertest';

import { Server } from '../../src/api/Server';
import { Logger } from '../../src/utils/Logger';
import { globalServiceLocator } from '../../src/utils/ServiceLocator';

import { loggerMock } from './loggerMock';

export type RequestClient = ReturnType<typeof SuperTest>;

export async function createRequestClient(): Promise<RequestClient> {
  const serviceLocator = globalServiceLocator.child();
  serviceLocator.set(Logger, loggerMock);

  const server = new Server(serviceLocator);

  await server.init({ isDevMode: false });

  return SuperTest(server.getApp());
}
