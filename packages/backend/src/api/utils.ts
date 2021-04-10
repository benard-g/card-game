import { Response } from 'express';

import { User } from '../core/types/User';
import { ServiceLocator } from '../utils/ServiceLocator';

import {
  LOCAL_REQUESTING_USER_KEY,
  LOCAL_SERVICE_LOCATOR_KEY,
  LOCAL_TRACE_ID_KEY,
} from './constants';

export function getServiceLocator(res: Response): ServiceLocator {
  return res.locals[LOCAL_SERVICE_LOCATOR_KEY] as ServiceLocator;
}

export function getTraceId(res: Response): string {
  return res.locals[LOCAL_TRACE_ID_KEY] as string;
}

export function getRequestingUser(res: Response): User {
  return res.locals[LOCAL_REQUESTING_USER_KEY];
}
