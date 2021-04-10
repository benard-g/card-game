import { ServiceLocator } from '../../utils/ServiceLocator';

export function createScopedServiceLocator(
  initialServiceLocator: ServiceLocator,
) {
  const scopedServiceLocator = initialServiceLocator.child();
  scopedServiceLocator.set(ServiceLocator, scopedServiceLocator);
  return scopedServiceLocator;
}
