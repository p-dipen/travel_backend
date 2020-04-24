const publicRoutes = {
  'GET /pass': 'Encrypt.passwordEncrytp',
  'GET /demo': 'ResponseApi.alldata',

  'GET /country/get': 'CountryApi.get',
  'POST /country/save': 'CountryApi.save',
  'PUT /country/save/:id': 'CountryApi.save',
  'DELETE /country/delete/:id': 'CountryApi.destroy',

  'GET /province/get': 'ProvinceApi.get',
  'GET /province/get/:countryId': 'ProvinceApi.get',
  'POST /province/save/:countryId': 'ProvinceApi.save',
  'PUT /province/save/:countryId/:id': 'ProvinceApi.save',
  'DELETE /province/delete/:countryId/:id': 'ProvinceApi.destroy',

  'GET /timezone/get': 'TimezoneApi.get',
  'GET /timezone/get/:countryId': 'TimezoneApi.get',
  'POST /timezone/save/:countryId': 'TimezoneApi.save',
  'PUT /timezone/save/:countryId/:id': 'TimezoneApi.save',
  'DELETE /timezone/delete/:countryId/:id': 'TimezoneApi.destroy',

  'GET /city/get': 'CityApi.get',
  'GET /city/get/:provinceId': 'CityApi.get',
  'POST /city/save/:provinceId': 'CityApi.save',
  'PUT /city/save/:provinceId/:id': 'CityApi.save',
  'DELETE /city/delete/:provinceId/:id': 'CityApi.destroy',


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
  'POST /admin-hotel/room/save/:hotelId': 'AdminHotelApi.saveRoom',
  'PUT /admin-hotel/room/save/:hotelId/:roomId': 'AdminHotelApi.saveRoom',
  'POST /admin-hotel/room-rate/save/:hotelId/:roomId': 'AdminHotelApi.saveRoomRates',
  'PUT /admin-hotel/room-rate/save/:hotelId/:roomId/:id': 'AdminHotelApi.saveRoomRates'
};

module.exports = publicRoutes;
