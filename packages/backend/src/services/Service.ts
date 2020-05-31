export abstract class Service {
  public static readonly NAME: string = '';
}

export abstract class ResourcefulService extends Service {
  public abstract start(): Promise<boolean>;
  public abstract stop(): Promise<boolean>;
}
