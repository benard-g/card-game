import { readFile } from 'fs/promises';

import { buildSchema } from '../../../src/api/graphql/schema';

describe('graphql/schema', () => {
  const ORIGINAL_SCHEMA_PATH = '../../schema.graphql';
  const TEST_SCHEMA_PATH = '/tmp/card-game-test-schema.graphql';

  it('should provide an up-to-date schema', async () => {
    await buildSchema({
      emitSchemaFile: TEST_SCHEMA_PATH,
    });

    const originalSchema = await readFile(ORIGINAL_SCHEMA_PATH, 'utf-8');
    const testSchema = await readFile(TEST_SCHEMA_PATH, 'utf-8');

    expect(originalSchema).toEqual(testSchema);
  });
});
