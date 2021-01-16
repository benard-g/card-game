import { Request, Response } from 'express';

import { User } from '../../core/types/User';
import { ServiceLocator } from '../../utils/ServiceLocator';

export interface Context {
  req: Request;
  res: Response;
  serviceLocator: ServiceLocator;
  user: User;
}
