const development = {
  database: 'travel',
  username: 'postgres',
  password: '21225',
  host: 'localhost',
  dialect: 'postgres',
};

const testing = {
  database: 'd88dkq9091mcrf',
  username: 'qdfwokmotxmjbd',
  password: '905b742eb55c5f7658ff6d39a277e27919f78e4c12e6ab3a2176416b9e404a1d',
  host: 'ec2-23-20-129-146.compute-1.amazonaws.com',
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
