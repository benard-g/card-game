import { Response } from 'express';

import {
  LOCAL_REQUEST_ID_KEY,
  LOCAL_SERVICE_LOCATOR_KEY,
} from '../constants/api';
import { ServiceLocator } from '../utils/ServiceLocator';

export function getServiceLocator(res: Response): ServiceLocator {
  return res.locals[LOCAL_SERVICE_LOCATOR_KEY] as ServiceLocator;
}

export function getRequestId(res: Response): string {
  return res.locals[LOCAL_REQUEST_ID_KEY] as string;
}
