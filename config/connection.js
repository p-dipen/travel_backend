const development = {
  database: 'travel_admin',
  username: 'postgres',
  password: 'Admin@123',
  host: 'localhost',
  dialect: 'postgres',
};

const testing = {
  database: 'ddi3ntoi419oje',
  username: 'cnchtehkgwzlpa',
  password: 'd56bdde55bb74b3875bc849f638fd6d95654d406cf874629c24622a0cc6c53fd',
  host: 'ec2-50-17-178-87.compute-1.amazonaws.com',
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
