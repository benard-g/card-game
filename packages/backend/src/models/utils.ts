export function isDupKeyError(error: Error): boolean {
  return error.name === 'MongoError' && (error as any).code === 11000;
}
