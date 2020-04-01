const AdminHotelModel = require('../models/HotelAdmin/AdminHotel');
const AdminHotelContactModel = require('../models/HotelAdmin/AdminHotelContact');
const AdminHotelFacilitiesModel = require('../models/HotelAdmin/AdminHotelFacilities');

const crudService = require('../services/crud.service');
const schema = require('../schemas/AdminHotel');

const AdminHotelApi = () => {

    const createProperty = (req, res) => {
        crudService.validate(req.body, schema.saveProperty).then(async (reqData) => {
            try {
                let response = {};
                let resHotelDetail = await crudService.insert(AdminHotelModel, reqData);
                response = resHotelDetail;
                response.contactDetail = [];
                for (let contact of reqData.contactDetail) {
                    contact.hotelId = resHotelDetail.id;
                    let resContactDetail = await crudService.insert(AdminHotelContactModel, contact);
                    response.contactDetail.push(resContactDetail);
                }
                return res.status(200).json({
                    code: 2000,
                    success: true,
                    message: `${resHotelDetail.name} property created successfully.`,
                    data: response || {}
                });
            } catch (error) {
                return res.status(500).json({
                    code: 5000,
                    message: 'Internal server error',
                    error: error,
                });
            }
        }).catch(err => {
            return res.status(200).json({
                code: 4002,
                success: false,
                message: 'Validation Failed',
                error: err,
            });
        });

    };

    const updateProperty = (req, res) => {
        crudService.validate(req.body, schema.saveProperty).then(async (reqData) => {
            try {
                if (req.params.hotelId) {
                    await crudService.update(AdminHotelModel, { id: req.params.hotelId }, reqData);
                    for (let contact of reqData.contactDetail) {
                        contact.hotelId = req.params.hotelId;
                        if (contact.id && contact.hotelId) {
                            await crudService.update(AdminHotelContactModel, { id: contact.id, hotelId: req.params.hotelId }, contact);
                        } else {
                            let res = await crudService.insert(AdminHotelContactModel, contact);
                            contact.id = res.id;
                        }
                    }
                    return res.status(200).json({
                        code: 2000,
                        success: true,
                        message: `${reqData.name} property updated successfully.`,
                        data: reqData || {}
                    });
                } else {
                    return res.status(200).json({
                        code: 4000,
                        success: false,
                        message: `Invalid Url Parameters`,
                        data: {}
                    });
                }
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    code: 5000,
                    message: 'Internal server error',
                    error: error,
                });
            }
        }).catch(err => {
            console.log(err);
            return res.status(200).json({
                code: 4002,
                success: false,
                message: 'Validation Failed',
                error: err,
            });
        });
    };

    const destroyProperty = async (req, res) => {
        try {
            if (req.params.hotelId) {
                let response = await crudService.destroy(AdminHotelModel, { id: req.params.hotelId });
                await crudService.destroy(AdminHotelContactModel, { hotelId: req.params.hotelId });
                return res.status(200).json({
                    code: 2000,
                    success: true,
                    message: `${response} Record(s) of property deleted successfully.`,
                    data: {}
                });
            } else {
                return res.status(200).json({
                    code: 4000,
                    success: false,
                    message: `Invalid Url Parameters`,
                    data: {}
                });
            }
        } catch (error) {
            return res.status(500).json({
                code: 5000,
                message: 'Internal server error',
                error: error,
            });
        }
    };

    const getProperty = async (req, res) => {
        try {
            let response = await crudService.get(AdminHotelModel, {
                where: { isDeleted: false },
                attributes: ['id', 'name'],
                distinct: true,
            });
            return res.status(200).json({
                code: 2000,
                success: true,
                message: `${response.length} matching record(s) found for hotel.`,
                data: response || []
            });
        } catch (error) {
            return res.status(500).json({
                code: 5000,
                message: 'Internal server error',
                error: error,
            });
        }
    };

    const getPropertyById = async (req, res) => {
        if (req.params.hotelId) {
            try {
                let propertyData = {};
                let response = await crudService.getOne(AdminHotelModel, {
                    where: { isDeleted: false, id: req.params.hotelId },
                    attributes: ["id", "name", "member_name", "addressLine1", "addressLine2", "country", "city", "province", "pincode", "timezone", "telephone_num", "contact_num", "email", "contact_person_name", "website_link", "communication_address", "images"],
                    distinct: true,
                });
                propertyData = response;
                let responseContact = await crudService.get(AdminHotelContactModel, {
                    where: { isDeleted: false, hotelId: req.params.hotelId },
                    attributes: ["id", "firstname", "lastname", "email", "mobile_num", "telephone_num", "fax_num", "website_link"],
                    distinct: true,
                });
                propertyData.contactDetail = responseContact || [];
                let responseFacilities = await crudService.get(AdminHotelFacilitiesModel, {
                    where: { isDeleted: false, hotelId: req.params.hotelId },
                    attributes: ["facilityId", "id"],
                    distinct: true,
                });
                propertyData.facilities = responseFacilities.map(t => t.facilityId) || [];
                return res.status(200).json({
                    code: 2000,
                    success: true,
                    message: '',
                    data: propertyData || {}
                });
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    code: 5000,
                    message: 'Internal server error',
                    error: error,
                });
            }
        } else {
            return res.status(200).json({
                code: 4000,
                success: false,
                message: `Invalid Url Parameters`,
                data: {}
            });
        }
    };

    const assignFacilities = (req, res) => {
        crudService.validate(req.body, schema.saveFacilities).then(async (reqData) => {
            try {
                let hotelList = await crudService.get(AdminHotelModel, {
                    where: { isDeleted: false, id: req.params.hotelId },
                    attributes: ["id"],
                    distinct: true
                });
                if (hotelList && hotelList.length > 0) {
                    // GET ALL FACILITIES OF THE PROPERTY
                    let allHotelFacilities = await crudService.get(AdminHotelFacilitiesModel, {
                        where: { hotelId: req.params.hotelId },
                        attributes: ["id", "hotelId", "facilityId"],
                        distinct: true
                    });
                    if (allHotelFacilities && allHotelFacilities.length > 0) {
                        for (let facilitiesData of allHotelFacilities) {
                            let isExists = reqData.facilities.findIndex(t => t == facilitiesData.facilityId);
                            console.log(facilitiesData + isExists);
                            if (isExists === -1) {
                                console.log("hi")
                                await crudService.destroy(AdminHotelFacilitiesModel, {
                                    id: facilitiesData.id,
                                    hotelId: facilitiesData.hotelId
                                });
                            } else {
                                await crudService.update(AdminHotelFacilitiesModel, {
                                    id: facilitiesData.id,
                                    hotelId: facilitiesData.hotelId
                                }, { isDeleted: false }, false);
                            }
                        }
                    } else {
                        for (let facilityId of reqData.facilities) {
                            if (facilityId) {
                                let facilitiesData = { hotelId: req.params.hotelId, facilityId: facilityId };
                                await crudService.insert(AdminHotelFacilitiesModel, facilitiesData);
                            }
                        }
                    }
                    return res.status(200).json({
                        code: 2000,
                        success: true,
                        message: `Property facilities assigned successfully.`,
                        data: {}
                    });
                } else {
                    return res.status(200).json({
                        code: 4004,
                        success: false,
                        message: 'Invalid Hotel Id',
                        data: {},
                    });
                }
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    code: 5000,
                    message: 'Internal server error',
                    error: error,
                });
            }
        }).catch(err => {
            return res.status(200).json({
                code: 4002,
                success: false,
                message: 'Validation Failed',
                error: err,
            });
        });
    };

    return {
        createProperty,
        updateProperty,
        destroyProperty,
        getProperty,
        getPropertyById,

        assignFacilities
    };
};
module.exports = AdminHotelApi;
