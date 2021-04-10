import { Logger } from '../../utils/Logger';
import { ServiceLocator } from '../../utils/ServiceLocator';

export function registerScopedLogger<T extends Record<string, any>>(
  serviceLocator: ServiceLocator,
  context: T,
) {
  const logger = serviceLocator.get(Logger);

  const scopedLogger = logger.child(context);
  serviceLocator.set(Logger, scopedLogger);

  return scopedLogger;
}
