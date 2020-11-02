const TimezoneModel = require('../models/Master/Timezone');
const crudService = require('../services/crud.service');
const { TimezoneSchemas } = require('../schemas/Master');

const TimezoneApi = () => {

    const save = (req, res) => {
        crudService.validate(req.body, TimezoneSchemas.save).then(async (reqData) => {
            try {
                let response;
                reqData.countryId = req.params.countryId;
                if (req.params.id) {
                    response = await crudService.update(TimezoneModel, { id: req.params.id }, reqData);
                    response = { id: req.params.id };
                } else {
                    response = await crudService.insert(TimezoneModel, reqData);
                    response = { id: response.id };
                }
                return res.status(200).json({
                    code: 2000,
                    success: true,
                    message: `${reqData.timezone} timezone saved successfully.`,
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
            if (req.params.countryId && req.params.id) {
                let response = await crudService.destroy(TimezoneModel, { countryId: req.params.countryId, id: req.params.id });
                return res.status(200).json({
                    code: 2000,
                    success: true,
                    message: `${response} Record(s) of timezone deleted successfully.`,
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
            let whereClause = { isDeleted: false };
            if (req.params.countryId) {
                whereClause.countryId = req.params.countryId;
            }
            let response = await crudService.get(TimezoneModel, {
                where: whereClause,
                attributes: ['id', 'timezone', 'countryId'],
                distinct: true,
            });
            return res.status(200).json({
                code: 2000,
                success: true,
                message: `${response.length} matching record(s) found for timezone.`,
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
module.exports = TimezoneApi;
