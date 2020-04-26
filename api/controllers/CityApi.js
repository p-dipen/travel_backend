const ProvinceModel = require('../models/Master/Province');
const CityModel = require('../models/Master/City');
const crudService = require('../services/crud.service');
const { ProvinceSchemas } = require('../schemas/Master');

const CityApi = () => {

    const getCountryByProvinceId = (provinceId) => {
        return new Promise(async (resolve, reject) => {
            try {
                let whereClause = { isDeleted: false, id: provinceId };
                let response = await crudService.get(ProvinceModel, {
                    where: whereClause,
                    attributes: ['id', 'name', 'countryId'],
                    distinct: true,
                });
                if (response.length > 0) {
                    resolve(response[0])
                } else {
                    reject({})
                }
            } catch (error) {
                return res.status(500).json({
                    code: 5000,
                    message: 'Internal server error',
                    error: error,
                });
            }
        });
    }

    const save = (req, res) => {
        crudService.validate(req.body, ProvinceSchemas.save).then(async (reqData) => {
            try {
                let response;
                reqData.provinceId = req.params.provinceId;
                getCountryByProvinceId(req.params.provinceId).then(async (province) => {
                    reqData.countryId = province.countryId;
                    if (req.params.id) {
                        response = await crudService.update(CityModel, { id: req.params.id }, reqData);
                        response = { id: req.params.id };
                    } else {
                        response = await crudService.insert(CityModel, reqData);
                        response = { id: response.id };
                    }
                    return res.status(200).json({
                        code: 2000,
                        success: true,
                        message: `${reqData.name} city saved successfully.`,
                        data: response || {}
                    });
                }).catch((err) => {
                    return res.status(500).json({
                        code: 4000,
                        message: 'Invalid Province Id',
                        error: err,
                    });
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

    const destroy = async (req, res) => {
        try {
            if (req.params.provinceId && req.params.id) {
                getCountryByProvinceId(req.params.provinceId).then(async (province) => {
                    let response = await crudService.destroy(CityModel, { countryId: province.countryId, provinceId: req.params.provinceId, id: req.params.id });
                    return res.status(200).json({
                        code: 2000,
                        success: true,
                        message: `${response} Record(s) of city deleted successfully.`,
                        data: {}
                    });
                }).catch((err) => {
                    return res.status(500).json({
                        code: 4000,
                        message: 'Invalid Province Id',
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
            let whereClause = { isDeleted: false };
            if (req.params.provinceId) {
                whereClause.provinceId = req.params.provinceId;
            }
            let response = await crudService.get(CityModel, {
                where: whereClause,
                attributes: ['id', 'name', 'provinceId', 'countryId'],
                distinct: true,
            });
            return res.status(200).json({
                code: 2000,
                success: true,
                message: `${response.length} matching record(s) found for city.`,
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
        save,
        destroy,
        get
    };
};
module.exports = CityApi;
