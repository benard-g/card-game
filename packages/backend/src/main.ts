import 'source-map-support/register';

/**
 * The entry point of the program.
 */
async function main(): Promise<void> {
  console.log('Hello World !');
  throw new Error('TEST ERROR');
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
  });
}
