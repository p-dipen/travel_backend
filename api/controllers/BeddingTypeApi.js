const BeddingTypeModel = require('../models/Master/BeddingType');
const crudService = require('../services/crud.service');

const BeddingTypeApi = () => {

    const create = async (req, res) => {
        try {
            let response = await crudService.insert(BeddingTypeModel, req.body);
            return res.status(200).json({
                code: 2000,
                success: true,
                message: `${response.name} bedding type created successfully.`,
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
                let response = await crudService.update(BeddingTypeModel, { id: req.params.id }, req.body);
                return res.status(200).json({
                    code: 2000,
                    success: true,
                    message: `${response} Record(s) of bedding type updated successfully.`,
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
                let response = await crudService.destroy(BeddingTypeModel, { id: req.params.id });
                return res.status(200).json({
                    code: 2000,
                    success: true,
                    message: `${response} Record(s) of bedding type deleted successfully.`,
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
            let response = await crudService.get(BeddingTypeModel, {
                where: { isDeleted: false },
                attributes: ['id', 'name', 'description'],
                distinct: true,
            });
            return res.status(200).json({
                code: 2000,
                success: true,
                message: `${response.length} matching record(s) found for bedding type.`,
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
module.exports = BeddingTypeApi;
