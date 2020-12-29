import {
  container,
  DependencyContainer,
  inject,
  injectable,
  InjectionToken,
} from 'tsyringe';

export const Service = injectable;
export const Inject = inject;

export class ServiceLocator {
  constructor(private readonly container: DependencyContainer) {}

  public get<T>(token: InjectionToken<T>): T {
    return this.container.resolve(token);
  }

  public set<T>(token: InjectionToken<T>, value: T): void {
    this.container.register(token, { useValue: value });
  }

  public child(): ServiceLocator {
    return new ServiceLocator(this.container.createChildContainer());
  }
}

export const globalServiceLocator = new ServiceLocator(container);
