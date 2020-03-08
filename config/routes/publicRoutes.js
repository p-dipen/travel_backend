const publicRoutes = {
  'GET /state': 'SEGAControl.register',
  'GET /pass': 'Encrypt.passwordEncrytp',
  'GET /demo': 'ResponseApi.alldata',
  'POST /hotelsearch': 'ResponseApi.searchHotel',
  'POST /dotalink': 'DOTAControl.migratedb',
};

module.exports = publicRoutes;
