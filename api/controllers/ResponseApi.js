const Room = require('../models/HotelCategory/Room');
const Hotel = require('../models/HotelCategory/Hotel');
const Meal = require('../models/HotelCategory/Meal');
const State = require('../models/State');
const Town = require('../models/Town');
const ResponseApi = () => {
  const alldata = async (req, res) => {
    let response;
    try {
      const townArray = await Town.findAll({
        attributes: ['inc', 'name'],
        distinct: true,
      });
      const stateArray = await State.findAll({
        attributes: ['inc', 'name'],
        distinct: true,
      });
      const hotelArray = await Hotel.findAll({
        attributes: ['inc', 'name'],
        distinct: true,
      });
      const mealArray = await Meal.findAll({
        attributes: ['inc', 'name'],
        distinct: true,
      });
      const roomArray = await Room.findAll({
        attributes: ['inc', 'name'],
        distinct: true,
      });
      response = {
        town: townArray,
        hotel: hotelArray,
        meal: mealArray,
        room: roomArray,
        state: stateArray
      };
    } catch (error) {
      return res.status(500).json({
        code: 5000,
        message: 'Internal server error',
        erroror: error,
      });
    }
    return res.status(200).json({ success: true, data: response });
  };
  return {
    alldata,
  };
};
module.exports = ResponseApi;
