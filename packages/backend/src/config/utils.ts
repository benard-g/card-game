export class EnvironmentVariableError extends Error {
  constructor(message: string) {
    super(`EnvironmentVariableError: ${message}`);
  }
}

export function getFromEnv(
  variableName: string,
  defaultValue?: string,
): string {
  const value = process.env[variableName];
  if (!value) {
    if (!defaultValue) {
      throw new EnvironmentVariableError(
        `missing environment variable "${variableName}"`,
      );
    }
    return defaultValue;
  }

  return value;
}

export function getNumberFromEnv(
  variableName: string,
  defaultValue?: number,
): number {
  const value = process.env[variableName];
  if (!value) {
    if (!defaultValue) {
      throw new EnvironmentVariableError(
        `missing environment variable "${variableName}"`,
      );
    }
    return defaultValue;
  }

  const numberValue = Number(value);
  if (Number.isNaN(numberValue)) {
    throw new EnvironmentVariableError(
      `value of "${variableName}" is not a number`,
    );
  }

  return numberValue;
}
