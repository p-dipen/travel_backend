const development = {
  database: 'travel',
  username: 'postgres',
  password: '21225',
  host: 'localhost',
  dialect: 'postgres',
};

const testing = {
  database: 'dflqrtsv52tp2f',
  username: 'arekrbzyzpvkvl',
  password: '9e6890f12865a85527172a0bb5435fa1ed3a7621f3bfc2a639cb1187476057e5',
  host: 'ec2-52-71-55-81.compute-1.amazonaws.com',
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
