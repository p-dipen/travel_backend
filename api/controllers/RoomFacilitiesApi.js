const RoomFacilitiesModel = require('../models/Master/RoomFacilities');
const crudService = require('../services/crud.service');

const RoomFacilitiesApi = () => {

    const create = async (req, res) => {
        try {
            let response = await crudService.insert(RoomFacilitiesModel, req.body);
            return res.status(200).json({
                code: 2000,
                success: true,
                message: `${response.name} room facility created successfully.`,
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
                let response = await crudService.update(RoomFacilitiesModel, { id: req.params.id }, req.body);
                return res.status(200).json({
                    code: 2000,
                    success: true,
                    message: `${response} Record(s) of room facility updated successfully.`,
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
                let response = await crudService.destroy(RoomFacilitiesModel, { id: req.params.id });
                return res.status(200).json({
                    code: 2000,
                    success: true,
                    message: `${response} Record(s) of room facility deleted successfully.`,
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
            let response = await crudService.get(RoomFacilitiesModel, {
                where: { isDeleted: false },
                attributes: ['id', 'name', 'description'],
                distinct: true,
            });
            return res.status(200).json({
                code: 2000,
                success: true,
                message: `${response.length} matching record(s) found for room facility.`,
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
module.exports = RoomFacilitiesApi;
