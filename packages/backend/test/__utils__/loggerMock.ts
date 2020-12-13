import { Logger } from '../../src/utils/Logger';

export const loggerMock = new Logger({
  enabled: false,
  prettyPrint: false,
});
