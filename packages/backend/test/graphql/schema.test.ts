import { readFile } from 'fs/promises';

import { Server } from '../../src/graphql/Server';

describe('graphql/schema', () => {
  const ORIGINAL_SCHEMA_PATH = '../../schema.graphql';
  const TEST_SCHEMA_PATH = '/tmp/card_game-test-schema.graphql';

  it('Should provide an up-to-date schema', async () => {
    await new Server().init({
      devMode: true,
      emitSchemaFile: TEST_SCHEMA_PATH,
    });

    const originalSchema = await readFile(ORIGINAL_SCHEMA_PATH, 'utf-8');
    const testSchema = await readFile(TEST_SCHEMA_PATH, 'utf-8');

    expect(originalSchema).toEqual(testSchema);
  });
});
