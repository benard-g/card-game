import Winston from 'winston';

export class Logger {
  private readonly logger: Winston.Logger;

  constructor() {
    this.logger = Winston.createLogger({
      level: 'info',
      format: Winston.format.json(),
      transports: [new Winston.transports.Console()],
    });
  }

  public info(message: string, data?: Record<string, any>): void {
    this.logger.info(message, { data });
  }

  public warn(message: string, data?: Record<string, any>): void {
    this.logger.warn(message, { data });
  }

  public error(
    message: string,
    data?: { error: Error; [key: string]: any },
  ): void {
    if (data) {
      const { error, ...rest } = data;
      const dataPayload = Object.keys(rest).length === 0 ? undefined : rest;
      this.logger.error(message, {
        error: { message: error.message, stack: error.stack },
        data: dataPayload,
      });
    } else {
      this.logger.error(message);
    }
  }
}
