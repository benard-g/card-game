import * as Config from '../../../src/config/Config';

import configFixtures from '../../__fixtures__/config.fixtures';

describe('config/Config', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = {};
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it('should return default values for all attributes', () => {
    const config = Config.load();

    expect(config).toEqual(configFixtures.config);
  });
});
