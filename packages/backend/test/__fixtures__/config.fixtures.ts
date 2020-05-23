import { Config } from '../../src/config/Config';

const CONFIG: Config = {
  server: {
    port: 8080,
  },
  services: {
    mongo: {
      DATABASE_URI: 'mongodb://localhost:27017/cardgame',
    },
  },
};

export default Object.freeze({
  config: CONFIG,
});
