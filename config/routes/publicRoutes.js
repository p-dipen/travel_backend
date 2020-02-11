const publicRoutes = {
  'GET /state': 'StateController.register',
  'GET /pass': 'Encrypt.passwordEncrytp',
  'GET /demo': 'ResponseApi.alldata',
  'POST /hotelsearch': 'ResponseApi.searchHotel',
};

module.exports = publicRoutes;
