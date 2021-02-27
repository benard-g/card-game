/**
 * Base class for all core-related errors
 */
export class CoreError extends Error {
  constructor(public readonly reason: string) {
    super(`CoreError: ${reason}`);
  }
}
