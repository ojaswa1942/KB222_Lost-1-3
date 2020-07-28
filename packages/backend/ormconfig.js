const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'staging';
const { PG_HOST, PG_PORT, PG_USER, PG_PASS, DB_NAME } = process.env;

const DEFAULTS = {
  type: 'postgres',
  entities: [path.join(__dirname, 'src/database/entity/**/*.ts')],
  host: PG_HOST || 'localhost',
  port: Number(PG_PORT) || 5432,
  username: PG_USER || 'postgres',
  password: PG_PASS,
  database: DB_NAME || 'fund',
  synchronize: false,
  logging: false,
  cli: {
    entitiesDir: 'src/database/entity',
    migrationsDir: 'src/database/migrations',
  },
};

if (NODE_ENV === 'test') {
  module.exports = {
    ...DEFAULTS,
    database: 'fund-test',
    synchronize: true,
  };
}

if (NODE_ENV === 'staging') {
  module.exports = {
    ...DEFAULTS,
    logging: true,
    synchronize: true,
  };
}

if (NODE_ENV === 'production') {
  module.exports = {
    ...DEFAULTS,
    entities: [path.join(__dirname, 'dist/src/database/entity/**/*.js')],
  };
}
