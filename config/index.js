const privateRoutes = require('./routes/privateRoutes');
const publicRoutes = require('./routes/publicRoutes');

const config = {
  migrate: true,
  privateRoutes,
  publicRoutes,
  port: process.env.PORT || '2020',
};

module.exports = config;
