import { Connection } from 'typeorm';

import { loadConfig } from '../../src/config/Config';
import { createDatabaseConnection } from '../../src/model/database';

export let conn: Connection;

beforeAll(async () => {
  const { DATABASE_URI } = loadConfig();
  conn = await createDatabaseConnection({ databaseUri: DATABASE_URI });
});

afterAll(async () => {
  await conn.close();
});
