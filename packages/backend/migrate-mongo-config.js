// In this file you can configure migrate-mongo

const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cardgame';
const DB_NAME = DB_URI.slice(DB_URI.lastIndexOf('/') + 1);

const config = {
  mongodb: {
    url: DB_URI,
    databaseName: DB_NAME,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  migrationsDir: 'db-migrations',
  changelogCollectionName: 'migrations',
  migrationFileExtension: '.js',
};

module.exports = config;
