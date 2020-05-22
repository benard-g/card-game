import Express from 'express';

import { __TEST__ } from '../../src/main';
import { logger, loggerMock } from './loggerMock';

interface TestWebProcess {
  start: () => Promise<void>;
  stop: () => Promise<void>;
}

export function createWebProcess(): [Express.Application, TestWebProcess] {
  const app = Express();
  const webProcess = __TEST__.createWebProcess(logger, app);

  const wrappeWebProcess = {
    start: async (): Promise<void> => {
      await webProcess.init();
      // Clear the logs made during the setup phase
      loggerMock.info.mockClear();
      loggerMock.warn.mockClear();
      loggerMock.error.mockClear();
    },
    stop: webProcess.stop,
  };

  return [app, wrappeWebProcess];
}
