import ChildProcess from 'child_process';
import Fs from 'fs';

async function exec(command: string) {
  return new Promise<string>((resolve, reject) => {
    ChildProcess.exec(command, (error, stdout) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

async function readFile(filePath: string) {
  return new Promise<string>((resolve, reject) => {
    Fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
}

describe('graphql/codegen', () => {
  const GENERATION_PATH = `${__dirname}/../codegen.tsx`;
  const TYPES_GENERATION_PATH = `${__dirname}/../codegenPossibleTypes.tsx`;

  const TEST_GENERATION_PATH = `${__dirname}/build/codegen.tsx`;
  const TEST_TYPES_GENERATION_PATH = `${__dirname}/build/codegenPossibleTypes.tsx`;

  it('should provide up-to-date generations from schema', async () => {
    // Generates code from current schema
    await exec(`yarn graphql-codegen --config ${__dirname}/codegen.test.yaml`);

    const originalGeneration = await readFile(GENERATION_PATH);
    const testGeneration = await readFile(TEST_GENERATION_PATH);
    expect(originalGeneration).toEqual(testGeneration);

    const originalTypesGeneration = await readFile(TYPES_GENERATION_PATH);
    const testTypesGeneration = await readFile(TEST_TYPES_GENERATION_PATH);
    expect(originalTypesGeneration).toEqual(testTypesGeneration);
  }, 15000);
});
