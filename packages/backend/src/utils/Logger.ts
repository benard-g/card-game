import Pino from 'pino';

type ContextData = Record<string, any>;

interface Options {
  enabled: boolean;
  prettyPrint: boolean;
  baseData?: ContextData;
}

export class Logger {
  private readonly enabled: boolean;
  private readonly prettyPrint: boolean;
  private readonly baseData: ContextData;

  private readonly logger: Pino.Logger;

  constructor(options: Options) {
    this.enabled = options.enabled;
    this.prettyPrint = options.prettyPrint;
    this.baseData = options.baseData || {};

    this.logger = Pino({
      enabled: options.enabled,
      prettyPrint: options.prettyPrint,
      base: options.baseData,
      timestamp: true,
    });
  }

  public child(data: ContextData) {
    return new Logger({
      enabled: this.enabled,
      prettyPrint: this.prettyPrint,
      baseData: {
        ...this.baseData,
        ...data,
      },
    });
  }

  public info(message: string, context?: ContextData): void {
    this.log('info', message, context);
  }

  public warn(message: string, context?: ContextData): void {
    this.log('warn', message, context);
  }

  public error(message: string, context?: ContextData): void {
    this.log('error', message, context);
  }

  private log(
    level: 'info' | 'warn' | 'error',
    message: string,
    context?: ContextData,
  ): void {
    if (context) {
      this.logger[level](context, message);
    } else {
      this.logger[level](message);
    }
  }
}
