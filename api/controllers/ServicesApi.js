const ServicesModel = require('../models/Master/Services');
const crudService = require('../services/crud.service');

const ServicesApi = () => {

    const create = async (req, res) => {
        try {
            let response = await crudService.insert(ServicesModel, req.body);
            return res.status(200).json({
                code: 2000,
                success: true,
                message: `${response.name} service created successfully.`,
                data: {}
            });
        } catch (error) {
            return res.status(500).json({
                code: 5000,
                message: 'Internal server error',
                error: error,
            });
        }
    };

    const update = async (req, res) => {
        try {
            if (req.params.id) {
                let response = await crudService.update(ServicesModel, { id: req.params.id }, req.body);
                return res.status(200).json({
                    code: 2000,
                    success: true,
                    message: `${response} Record(s) of service updated successfully.`,
                    data: {}
                });
            } else {
                return res.status(200).json({
                    code: 4000,
                    success: false,
                    message: `Incomplete Data`,
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

    const destroy = async (req, res) => {
        try {
            if (req.params.id) {
                let response = await crudService.destroy(ServicesModel, { id: req.params.id });
                return res.status(200).json({
                    code: 2000,
                    success: true,
                    message: `${response} Record(s) of service deleted successfully.`,
                    data: {}
                });
            } else {
                return res.status(200).json({ success: false, data: 'Incomplete data' });
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
            let response = await crudService.get(ServicesModel, {
                where: { isDeleted: false },
                attributes: ['id', 'name', 'description'],
                distinct: true,
            });
            return res.status(200).json({
                code: 2000,
                success: true,
                message: `${response.length} matching record(s) found for service.`,
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
module.exports = ServicesApi;
