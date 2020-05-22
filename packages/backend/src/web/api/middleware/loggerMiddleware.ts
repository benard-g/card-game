import { Request, Response, NextFunction } from 'express';
import onFinished from 'on-finished';

import { Logger } from '../../../utils/Logger';

const LOGGER_PREFIX = '[web][middleware][logger]';

export function loggerMiddleware(logger: Logger) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const startTime = new Date();

    onFinished(res, () => {
      const endTime = new Date();

      logger.info(`${LOGGER_PREFIX} New request`, {
        req: {
          method: req.method,
          path: req.originalUrl,
        },
        res: {
          code: res.statusCode,
          message: res.statusMessage,
        },
        duration: endTime.getTime() - startTime.getTime(),
      });
    });

    next();
  };
}
