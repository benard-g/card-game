export class EnvironmentVariableError extends Error {
  constructor(message: string) {
    super(`EnvironmentVariableError: ${message}`);
  }
}

/**
 * Returns the value found in the environment or `null` if it does not exist.
 */
export function getFromEnv(varName: string, defaultValue: null): string | null;
/**
 * Returns the value found in the environment or `defaultValue` if it does not exist.
 *
 * If it does not exist and `defaultValue` is not provided, it will throw an `EnvironmentVariableError`.
 */
export function getFromEnv(varName: string, defaultValue?: string): string;
export function getFromEnv(
  varName: string,
  defaultValue?: string | null,
): string | null {
  const envValue = process.env[varName];

  if (envValue !== undefined) {
    return envValue;
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new EnvironmentVariableError(
    `Missing environment variable "${varName}"`,
  );
}

/**
 * Returns the number found in the environment or `null` if it does not exist.
 *
 * If the value is not a number it will throw an `EnvironmentVariableError`.
 */
export function getNumberFromEnv(
  varName: string,
  defaultValue: null,
): number | null;
/**
 * Returns the number found in the environment or `defaultValue` if it does not exist.
 *
 * If the value is not a number, or if it does not exist and `defaultValue` is not provided,
 * it will throw an `EnvironmentVariableError`.
 */
export function getNumberFromEnv(
  varName: string,
  defaultValue?: number,
): number;
export function getNumberFromEnv(
  varName: string,
  defaultValue?: number | null,
): number | null {
  const envValue =
    defaultValue === null
      ? getFromEnv(varName, null)
      : getFromEnv(
          varName,
          defaultValue !== undefined ? defaultValue.toString() : undefined,
        );
  if (envValue === null) {
    return null;
  }

  const value = Number(envValue);
  if (isNaN(value)) {
    throw new EnvironmentVariableError(
      `Expected "${varName}" to be of type number, got "${envValue}"`,
    );
  }

  return value;
}
