import { Request, Response } from 'express';

import { Logger } from '../utils/Logger';

import { getServiceLocator } from './utils';

export class ApiController {
  public endpoint = (_req: Request, res: Response) => {
    const serviceLocator = getServiceLocator(res);
    const logger = serviceLocator.get(Logger);

    const timestamp = Date.now();

    logger.info('[api][ApiController] heartbeat', { timestamp });

    res.status(200).json({
      title: 'Card game API',
      status: 'UP',
      timestamp,
    });
  };
}
