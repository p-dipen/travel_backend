const CountryModel = require('../models/Master/Country');
const crudService = require('../services/crud.service');
const { CountrySchemas } = require('../schemas/Master');

const CountryApi = () => {

    const save = (req, res) => {
        crudService.validate(req.body, CountrySchemas.save).then(async (reqData) => {
            try {
                let response;
                if (req.params.id) {
                    response = await crudService.update(CountryModel, { id: req.params.id }, reqData);
                    response = { id: req.params.id };
                } else {
                    response = await crudService.insert(CountryModel, reqData);
                    response = { id: response.id };
                }
                return res.status(200).json({
                    code: 2000,
                    success: true,
                    message: `${reqData.name} country saved successfully.`,
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

    const destroy = async (req, res) => {
        try {
            if (req.params.id) {
                let response = await crudService.destroy(CountryModel, { id: req.params.id });
                return res.status(200).json({
                    code: 2000,
                    success: true,
                    message: `${response} Record(s) of country deleted successfully.`,
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
            let response = await crudService.get(CountryModel, {
                where: { isDeleted: false },
                attributes: ['id', 'name'],
                distinct: true,
            });
            return res.status(200).json({
                code: 2000,
                success: true,
                message: `${response.length} matching record(s) found for country.`,
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
module.exports = CountryApi;
