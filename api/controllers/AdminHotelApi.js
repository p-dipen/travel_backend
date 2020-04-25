const AdminHotelModel = require('../models/HotelAdmin/AdminHotel');
const AdminHotelContactModel = require('../models/HotelAdmin/AdminHotelContact');
const AdminHotelFacilitiesModel = require('../models/HotelAdmin/AdminHotelFacilities');

const AdminHotelRoomModel = require('../models/HotelAdmin/AdminHotelRoom');
const AdminHotelRoomFacilitiesModel = require('../models/HotelAdmin/AdminHotelRoomFacilities');
const AdminHotelRoomBeddingModel = require('../models/HotelAdmin/AdminHotelRoomBedding');
const AdminHotelRoomInclusionsModel = require('../models/HotelAdmin/AdminHotelRoomInclusions');
const AdminHotelRoomRatesModel = require('../models/HotelAdmin/AdminHotelRoomRates');
const AdminHotelStopSaleModel = require('../models/HotelAdmin/AdminHotelStopSale');

const crudService = require('../services/crud.service');
const schema = require('../schemas/AdminHotel');
const moment = require('moment');

const AdminHotelApi = () => {

    const createProperty = (req, res) => {
        crudService.validate(req.body, schema.saveProperty).then(async (reqData) => {
            try {
                let response = {};
                if (reqData.images && reqData.images.length > 0) {
                    reqData.images = reqData.images.join('~');
                }
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
                console.error(error);
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
                if (reqData.images && reqData.images.length > 0) {
                    reqData.images = reqData.images.join('~');
                }
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
                console.error(error);
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

    const destroyProperty = async (req, res) => {
        try {
            if (req.params.hotelId) {
                // DELETE ROOM REALTED STUFF
                await crudService.destroy(AdminHotelStopSaleModel, { hotelId: req.params.hotelId });
                await crudService.destroy(AdminHotelRoomRatesModel, { hotelId: req.params.hotelId });
                await crudService.destroy(AdminHotelRoomInclusionsModel, { hotelId: req.params.hotelId });
                await crudService.destroy(AdminHotelRoomBeddingModel, { hotelId: req.params.hotelId });
                await crudService.destroy(AdminHotelRoomFacilitiesModel, { hotelId: req.params.hotelId });
                await crudService.destroy(AdminHotelRoomModel, { hotelId: req.params.hotelId });

                // DELETE HOTEL FACILITIES REALTED STUFF
                await crudService.destroy(AdminHotelFacilitiesModel, { hotelId: req.params.hotelId });

                // DELETE HOTEL CONTACT REALTED STUFF
                await crudService.destroy(AdminHotelContactModel, { hotelId: req.params.hotelId });

                // DELETE HOTEL STUFF
                await crudService.destroy(AdminHotelModel, { id: req.params.hotelId });

                return res.status(200).json({
                    code: 2000,
                    success: true,
                    message: `Hotel related Record(s) deleted successfully.`,
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
            console.error(error);
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
            console.error(error);
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

                // GET HOTEL DETAILS
                let response = await crudService.getOne(AdminHotelModel, {
                    where: { isDeleted: false, id: req.params.hotelId },
                    attributes: ["id", "name", "member_name", "addressLine1", "addressLine2", "country", "city", "province", "pincode", "timezone", "telephone_num", "contact_num", "email", "contact_person_name", "website_link", "communication_address", "images"],
                    distinct: true,
                });
                propertyData = response;

                // GET CONTACT DETAILS OF HOTEL
                let responseContact = await crudService.get(AdminHotelContactModel, {
                    where: { isDeleted: false, hotelId: req.params.hotelId },
                    attributes: ["id", "firstname", "lastname", "email", "mobile_num", "telephone_num", "fax_num", "website_link"],
                    distinct: true,
                });
                propertyData.contactDetail = responseContact || [];

                // GET HOTEL FACILITIES
                let responseFacilities = await crudService.get(AdminHotelFacilitiesModel, {
                    where: { isDeleted: false, hotelId: req.params.hotelId },
                    attributes: ["facilityId", "id"],
                    distinct: true,
                });
                propertyData.facilities = responseFacilities.map(t => t.facilityId) || [];

                // GET ROOMS OF HOTELS
                let responseRoom = await crudService.get(AdminHotelRoomModel, {
                    where: { isDeleted: false, hotelId: req.params.hotelId },
                    attributes: ["id", "name", "description", "room_type", "total_room", "max_capacity", "total_bedroom_per_unit", "max_child", "max_adult", "max_infant", "buffer_room", "available_room"],
                    distinct: true,
                });
                propertyData.room = responseRoom || {};

                // GET ROOM FACILITIES
                let responseRoomFacilities = await crudService.get(AdminHotelRoomFacilitiesModel, {
                    where: { isDeleted: false, hotelId: req.params.hotelId },
                    attributes: ["id", "roomId", "room_facility"],
                    distinct: true,
                });

                for (let room of propertyData.room) {
                    room.facilities = responseRoomFacilities.filter(t => t.roomId === parseInt(room.id)).map(t => t.room_facility);
                }

                // GET ROOM BEDDING TYPE 
                let responseBedding = await crudService.get(AdminHotelRoomBeddingModel, {
                    where: { isDeleted: false, hotelId: req.params.hotelId },
                    attributes: ["id", "roomId", "bedding_config", "bedding_type"],
                    distinct: true,
                });
                for (let room of propertyData.room) {
                    room.bedding = responseBedding.filter(t => t.roomId === parseInt(room.id)).map(t => { return { bedding_config: t.bedding_config, bedding_type: t.bedding_type, id: t.id } });
                }

                // GET ROOM INCLUSIONS
                let responseInclusions = await crudService.get(AdminHotelRoomInclusionsModel, {
                    where: { isDeleted: false, hotelId: req.params.hotelId },
                    attributes: ["id", "roomId", "room_inclusions"],
                    distinct: true,
                });
                for (let room of propertyData.room) {
                    room.inclusions = responseInclusions.filter(t => t.roomId === parseInt(room.id)).map(t => t.room_inclusions);
                }

                // GET ROOM RATES
                let responseRoomRates = await crudService.get(AdminHotelRoomRatesModel, {
                    where: { isDeleted: false, hotelId: req.params.hotelId },
                    attributes: ["id", "roomId", "date_from", "date_to", "commission_type", "commission_weekday", "commission_weekend", "net_rate_weekday", "net_rate_weekend", "cost_rate_weekday", "cost_rate_weekend", "per_adult_net_rate_weekday", "per_adult_net_rate_weekend", "per_adult_cost_rate_weekday", "per_adult_cost_rate_weekend", "per_child_net_rate_weekday", "per_child_net_rate_weekend", "per_child_cost_rate_weekday", "per_child_cost_rate_weekend", "per_infant_net_rate_weekday", "per_infant_net_rate_weekend", "per_infant_cost_rate_weekday", "per_infant_cost_rate_weekend", "extra_adult_weekday", "extra_adult_weekend", "extra_child_weekday", "extra_child_weekend", "extra_infant_weekday", "extra_infant_weekend", "allocation_weekday", "allocation_weekend", "min_stay", "max_room_per_booking", "notification_after_units", "cut_of_day"],
                });
                for (let room of propertyData.room) {
                    room.rates = responseRoomRates.filter(t => t.roomId === parseInt(room.id));
                }


                let responseStopSells = await crudService.get(AdminHotelStopSaleModel, {
                    where: { isDeleted: false, hotelId: req.params.hotelId },
                    attributes: ['id', 'date', 'roomId'],
                    distinct: true,
                });
                propertyData.stopSales = {};
                // propertyData.stopSalesRawData = responseStopSells;
                for (let stopSaleData of responseStopSells) {
                    let roomId = stopSaleData.roomId;
                    let year = moment(stopSaleData.date, 'YYYY-MM-DD').format('YYYY');
                    let month = moment(stopSaleData.date, 'YYYY-MM-DD').format('MM');
                    propertyData.stopSales[roomId] = propertyData.stopSales[roomId] ? propertyData.stopSales[roomId] : {};
                    propertyData.stopSales[roomId][year] = propertyData.stopSales[roomId][year] ? propertyData.stopSales[roomId][year] : {};
                    propertyData.stopSales[roomId][year][month] = propertyData.stopSales[roomId][year][month] ? propertyData.stopSales[roomId][year][month] : [];
                    propertyData.stopSales[roomId][year][month].push(stopSaleData);
                }

                return res.status(200).json({
                    code: 2000,
                    success: true,
                    message: '',
                    data: propertyData || {}
                });
            } catch (error) {
                console.error(error);
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
                if (isHotelIdValid(req.params.hotelId)) {
                    // DELETE ALL FACILITIES OF THE PROPERTY
                    await crudService.destroy(AdminHotelFacilitiesModel, {
                        hotelId: req.params.hotelId
                    });
                    for (let facilities of reqData.facilities) {
                        if (facilities.facilityId) {
                            let facilitiesData = { hotelId: req.params.hotelId, facilityId: facilities.facilityId, description: facilities.description };
                            await crudService.insert(AdminHotelFacilitiesModel, facilitiesData);
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
                console.error(error);
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

    const isHotelIdValid = (hotelId) => {
        return new Promise(async (resolve, reject) => {
            try {
                let hotelList = await crudService.get(AdminHotelModel, {
                    where: { isDeleted: false, id: hotelId },
                    attributes: ["id"],
                    distinct: true
                });
                resolve(hotelList && hotelList.length > 0)
            } catch (error) {
                reject(error);
            }
        });
    }

    const isRoomIdValid = (hotelId, roomId) => {
        return new Promise(async (resolve, reject) => {
            try {
                let roomList = await crudService.get(AdminHotelRoomModel, {
                    where: { isDeleted: false, hotelId: hotelId, id: roomId },
                    attributes: ["id"],
                    distinct: true
                });
                resolve(roomList && roomList.length > 0)
            } catch (error) {
                reject(error);
            }
        });
    }

    const saveRoom = (req, res) => {
        crudService.validate(req.body, schema.saveRoom).then(async (reqData) => {
            try {
                if (isHotelIdValid(req.params.hotelId)) {
                    let resRoomDetail = {};
                    reqData.hotelId = req.params.hotelId;
                    if (req.params.roomId) {
                        resRoomDetail = await crudService.update(AdminHotelRoomModel, { id: roomId }, reqData);
                    } else {
                        resRoomDetail = await crudService.insert(AdminHotelRoomModel, reqData);
                    }
                    await saveRoomBedding({ hotelId: req.params.hotelId, roomId: resRoomDetail.id }, reqData.bedding);
                    await saveRoomFacilities({ hotelId: req.params.hotelId, roomId: resRoomDetail.id }, reqData.facilities);
                    await saveRoomInclusions({ hotelId: req.params.hotelId, roomId: resRoomDetail.id }, reqData.inclusions);
                    return res.status(200).json({
                        code: 2000,
                        success: true,
                        message: `Room saved successfully.`,
                        data: { roomId: resRoomDetail.id }
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
                console.error(error);
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

    const saveRoomFacilities = ({ hotelId, roomId }, roomFacilitiesReqData) => {
        return new Promise(async (resolve, reject) => {
            try {
                // GET ALL ROOM FACILITIES OF THE PROPERTY
                await crudService.destroy(AdminHotelRoomFacilitiesModel, {
                    hotelId: hotelId, roomId: roomId
                });
                for (let room_facility of roomFacilitiesReqData) {
                    if (room_facility) {
                        let facilitiesData = { hotelId: hotelId, roomId: roomId, room_facility: room_facility };
                        await crudService.insert(AdminHotelRoomFacilitiesModel, facilitiesData);
                    }
                }
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }

    const saveRoomBedding = ({ hotelId, roomId }, beddingReqData) => {
        return new Promise(async (resolve, reject) => {
            try {
                // GET ALL BeedingType OF THE ROOM
                await crudService.destroy(AdminHotelRoomBeddingModel, {
                    hotelId: hotelId,
                    roomId: roomId
                });
                for (let bedding of beddingReqData) {
                    if (bedding) {
                        let beddingData = {
                            hotelId: hotelId,
                            roomId: roomId,
                            bedding_config: bedding.bedding_config,
                            bedding_type: bedding.bedding_type
                        };
                        await crudService.insert(AdminHotelRoomBeddingModel, beddingData);
                    }
                }
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }

    const saveRoomInclusions = ({ hotelId, roomId }, inclusionsReqData) => {
        return new Promise(async (resolve, reject) => {
            try {
                // DELETE ALL INCLUSIONS AND INSERT AGAIN
                await crudService.destroy(AdminHotelRoomInclusionsModel, {
                    hotelId: hotelId,
                    roomId: roomId
                });
                for (let room_inclusion of inclusionsReqData) {
                    if (room_inclusion) {
                        let inclusionsData = { hotelId: hotelId, roomId: roomId, room_inclusions: room_inclusion };
                        await crudService.insert(AdminHotelRoomInclusionsModel, inclusionsData);
                    }
                }
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }

    const saveRoomRates = (req, res) => {
        crudService.validate(req.body, schema.saveRoomRates).then(async (reqData) => {
            try {
                let response = 0;
                reqData.hotelId = req.params.hotelId;
                reqData.roomId = req.params.roomId;
                let isHotelIdExists = isHotelIdValid(req.params.hotelId);
                let isRoomIdExists = isRoomIdValid(req.params.hotelId, req.params.roomId);
                if (isHotelIdExists && isRoomIdExists) {
                    if (req.params.id) {
                        response = await crudService.update(AdminHotelRoomRatesModel, { hotelId: req.params.hotelId, roomId: req.params.roomId, id: req.params.id }, reqData);
                        response = { id: req.params.id };
                    } else {
                        let res = await crudService.insert(AdminHotelRoomRatesModel, reqData);
                        response = { id: res.id };
                    }
                    return res.status(200).json({
                        code: 2000,
                        success: true,
                        message: `Rates saved successfully.`,
                        data: response
                    });
                } else {
                    return res.status(200).json({
                        code: 4004,
                        success: false,
                        message: 'Invalid Hotel Id or Room Id',
                        data: {},
                    });
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({
                    code: 5000,
                    message: 'Internal server error',
                    error: error,
                });
            }
        }).catch(err => {
            console.error(err);
            return res.status(200).json({
                code: 4002,
                success: false,
                message: 'Validation Failed',
                error: err,
            });
        });
    };

    insertStopSale = (arrayOfStopSale, hotelId, roomId) => {
        return new Promise(async (resolve, reject) => {
            try {
                for (let stopSaleObj of arrayOfStopSale) {
                    stopSaleObj.hotelId = hotelId;
                    stopSaleObj.roomId = roomId;
                    let whereClause = { hotelId: stopSaleObj.hotelId, roomId: stopSaleObj.roomId, date: stopSaleObj.date };
                    let isStopSellExists = await crudService.get(AdminHotelStopSaleModel, {
                        where: whereClause,
                        attributes: ['id', 'date', 'hotelId', 'roomId'],
                        distinct: true
                    });
                    if (isStopSellExists && isStopSellExists.length > 0) {
                        if (stopSaleObj.stopSell) {
                            await crudService.update(AdminHotelStopSaleModel, whereClause, stopSaleObj, false);
                        } else {
                            await crudService.destroy(AdminHotelStopSaleModel, whereClause);
                        }
                    } else {
                        if (stopSaleObj.stopSell) {
                            await crudService.insert(AdminHotelStopSaleModel, stopSaleObj);
                        } else {
                            await crudService.destroy(AdminHotelStopSaleModel, whereClause);
                        }
                    }
                }
                let allStopSells = await crudService.get(AdminHotelStopSaleModel, {
                    where: { isDeleted: false, hotelId: hotelId, roomId: roomId },
                    attributes: ['id', 'date', 'hotelId', 'roomId'],
                    distinct: true,
                });
                resolve(allStopSells);
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    }

    const stopSalesRange = (req, res) => {
        crudService.validate(req.body, schema.stopSalesRange).then(async (reqData) => {
            try {
                reqData.hotelId = req.params.hotelId;
                reqData.roomId = req.params.roomId;
                let isHotelIdExists = isHotelIdValid(req.params.hotelId);
                let isRoomIdExists = isRoomIdValid(req.params.hotelId, req.params.roomId);
                if (isHotelIdExists && isRoomIdExists) {
                    let arrayOfStopSale = [];
                    let dateInc = moment(reqData.date_from, 'YYYY-MM-DD');
                    for (let i = 0; moment(dateInc, 'YYYY-MM-DD') <= moment(reqData.date_to, 'YYYY-MM-DD'); i++) {
                        arrayOfStopSale.push({
                            date: moment(dateInc),
                            stopSell: reqData.stopSell
                        });
                        dateInc = moment(dateInc, 'YYYY-MM-DD').add('day', 1).format('YYYY-MM-DD');
                    }
                    crudService.validate({ stopSales: arrayOfStopSale }, schema.stopSales).then(async (reqData) => {
                        let response = await insertStopSale(arrayOfStopSale, req.params.hotelId, req.params.roomId);
                        return res.status(200).json({
                            code: 2000,
                            success: true,
                            message: `Stop Sales saved successfully.`,
                            data: response
                        });
                    }).catch(err => {
                        console.error(err);
                        return res.status(200).json({
                            code: 4002,
                            success: false,
                            message: 'Validation Failed',
                            error: err,
                        });
                    });
                } else {
                    return res.status(200).json({
                        code: 4004,
                        success: false,
                        message: 'Invalid Hotel Id or Room Id',
                        data: {},
                    });
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({
                    code: 5000,
                    message: 'Internal server error',
                    error: error,
                });
            }
        }).catch(err => {
            console.error(err);
            return res.status(200).json({
                code: 4002,
                success: false,
                message: 'Validation Failed',
                error: err,
            });
        });
    };


    const stopSales = (req, res) => {
        crudService.validate(req.body, schema.stopSales).then(async (reqData) => {
            try {
                reqData.hotelId = req.params.hotelId;
                reqData.roomId = req.params.roomId;
                let isHotelIdExists = isHotelIdValid(req.params.hotelId);
                let isRoomIdExists = isRoomIdValid(req.params.hotelId, req.params.roomId);
                if (isHotelIdExists && isRoomIdExists) {
                    let response = await insertStopSale(reqData.stopSales, req.params.hotelId, req.params.roomId);
                    return res.status(200).json({
                        code: 2000,
                        success: true,
                        message: `Stop Sales saved successfully.`,
                        data: response
                    });
                } else {
                    return res.status(200).json({
                        code: 4004,
                        success: false,
                        message: 'Invalid Hotel Id or Room Id',
                        data: {},
                    });
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({
                    code: 5000,
                    message: 'Internal server error',
                    error: error,
                });
            }
        }).catch(err => {
            console.error(err);
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
        assignFacilities,
        saveRoom,
        saveRoomRates,
        stopSalesRange,
        stopSales
    };
};
module.exports = AdminHotelApi;
