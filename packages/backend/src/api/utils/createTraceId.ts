import { v4 as uuid } from 'uuid';

export function createTraceId(): string {
  return uuid();
}
