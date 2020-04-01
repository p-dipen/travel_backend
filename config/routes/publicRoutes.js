const publicRoutes = {
  'GET /pass': 'Encrypt.passwordEncrytp',
  'GET /demo': 'ResponseApi.alldata',

  'GET /bedding-type/get': 'BeddingTypeApi.get',
  'POST /bedding-type/save': 'BeddingTypeApi.create',
  'PUT /bedding-type/save/:id': 'BeddingTypeApi.update',
  'DELETE /bedding-type/delete/:id': 'BeddingTypeApi.destroy',

  'GET /inclusions/get': 'InclusionsApi.get',
  'POST /inclusions/save': 'InclusionsApi.create',
  'PUT /inclusions/save/:id': 'InclusionsApi.update',
  'DELETE /inclusions/delete/:id': 'InclusionsApi.destroy',

  'GET /meal-type/get': 'MealTypeApi.get',
  'POST /meal-type/save': 'MealTypeApi.create',
  'PUT /meal-type/save/:id': 'MealTypeApi.update',
  'DELETE /meal-type/delete/:id': 'MealTypeApi.destroy',

  'GET /policy-type/get': 'PolicyTypeApi.get',
  'POST /policy-type/save': 'PolicyTypeApi.create',
  'PUT /policy-type/save/:id': 'PolicyTypeApi.update',
  'DELETE /policy-type/delete/:id': 'PolicyTypeApi.destroy',

  'GET /promotion-type/get': 'PromotionTypeApi.get',
  'POST /promotion-type/save': 'PromotionTypeApi.create',
  'PUT /promotion-type/save/:id': 'PromotionTypeApi.update',
  'DELETE /promotion-type/delete/:id': 'PromotionTypeApi.destroy',

  'GET /property-facilities/get': 'PropertyFacilitiesApi.get',
  'POST /property-facilities/save': 'PropertyFacilitiesApi.create',
  'PUT /property-facilities/save/:id': 'PropertyFacilitiesApi.update',
  'DELETE /property-facilities/delete/:id': 'PropertyFacilitiesApi.destroy',

  'GET /room-facilities/get': 'RoomFacilitiesApi.get',
  'POST /room-facilities/save': 'RoomFacilitiesApi.create',
  'PUT /room-facilities/save/:id': 'RoomFacilitiesApi.update',
  'DELETE /room-facilities/delete/:id': 'RoomFacilitiesApi.destroy',

  'GET /room-type/get': 'RoomTypeApi.get',
  'POST /room-type/save': 'RoomTypeApi.create',
  'PUT /room-type/save/:id': 'RoomTypeApi.update',
  'DELETE /room-type/delete/:id': 'RoomTypeApi.destroy',

  'GET /service/get': 'ServicesApi.get',
  'POST /service/save': 'ServicesApi.create',
  'PUT /service/save/:id': 'ServicesApi.update',
  'DELETE /service/delete/:id': 'ServicesApi.destroy',

  'GET /admin-hotel/property/get': 'AdminHotelApi.getProperty',
  'GET /admin-hotel/property/get/:hotelId': 'AdminHotelApi.getPropertyById',
  'POST /admin-hotel/property/save': 'AdminHotelApi.createProperty',
  'PUT /admin-hotel/property/save/:hotelId': 'AdminHotelApi.updateProperty',
  'DELETE /admin-hotel/property/delete/:hotelId': 'AdminHotelApi.destroyProperty',

  'POST /admin-hotel/facility/assign/:hotelId': 'AdminHotelApi.assignFacilities',
};

module.exports = publicRoutes;
