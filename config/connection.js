const development = {
  database: 'travel',
  username: 'postgres',
  password: '21225',
  host: 'localhost',
  dialect: 'postgres',
};

const testing = {
  database: 'databasename',
  username: 'username',
  password: 'password',
  host: 'localhost',
  dialect: 'postgres',
};

const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
};

module.exports = {
  development,
  testing,
  production,
};
