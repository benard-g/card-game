const Config = require('./build/src/config/Config');

const config = Config.loadConfig();

module.exports = {
  type: 'postgres',
  logging: false,
  url: config.DATABASE_URI,
  entities: ['build/src/model/entities/*.js'],
  migrations: ['build/src/model/migrations/*.js'],
  cli: {
    migrationsDir: 'src/model/migrations',
  },
};
