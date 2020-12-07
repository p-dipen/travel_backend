const development = {
  database: 'travel_admin',
  username: 'postgres',
  password: 'Admin@123',
  host: 'localhost',
  dialect: 'postgres',
};

const testing = {
  database: 'd5r15dahrniu7t',
  username: 'kbqhcbciuoibjx',
  password: 'fe38f11b15c3e2afa4278bbbd8753b9dffe8f35e0ac7b6fb17d80abc1f8132eb',
  host: 'ec2-52-20-248-222.compute-1.amazonaws.com',
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
