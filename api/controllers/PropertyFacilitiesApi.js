const PropertyFacilitiesModel = require('../models/Master/PropertyFacilities');
const crudService = require('../services/crud.service');
const { PropertyFacilitiesSchemas } = require('../schemas/Master');

const PropertyFacilitiesApi = () => {

    const create = (req, res) => {
        crudService.validate(req.body, PropertyFacilitiesSchemas.save).then(async (reqData) => {
            try {
                let response = await crudService.insert(PropertyFacilitiesModel, reqData);
                return res.status(200).json({
                    code: 2000,
                    success: true,
                    message: `${response.name} property facility created successfully.`,
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

    const update = (req, res) => {
        if (req.params.id) {
            crudService.validate(req.body, PropertyFacilitiesSchemas.save).then(async (reqData) => {
                try {
                    let response = await crudService.update(PropertyFacilitiesModel, { id: req.params.id }, reqData);
                    reqData.id = req.params.id;
                    return res.status(200).json({
                        code: 2000,
                        success: true,
                        message: `${response} Record(s) of property facility updated successfully.`,
                        data: reqData || {}
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
        } else {
            return res.status(200).json({
                code: 4000,
                success: false,
                message: `Invalid Url Parameters`,
                data: {}
            });
        }
    };

    const destroy = async (req, res) => {
        try {
            if (req.params.id) {
                let response = await crudService.destroy(PropertyFacilitiesModel, { id: req.params.id });
                return res.status(200).json({
                    code: 2000,
                    success: true,
                    message: `${response} Record(s) of property facility deleted successfully.`,
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

    const get = async (req, res) => {
        try {
            let response = await crudService.get(PropertyFacilitiesModel, {
                where: { isDeleted: false },
                attributes: ['id', 'name', 'description'],
                distinct: true,
            });
            return res.status(200).json({
                code: 2000,
                success: true,
                message: `${response.length} matching record(s) found for property facility.`,
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

    return {
        create,
        update,
        destroy,
        get
    };
};
module.exports = PropertyFacilitiesApi;
