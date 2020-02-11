const Room = require('../models/HotelCategory/Room');
const Hotel = require('../models/HotelCategory/Hotel');
const Meal = require('../models/HotelCategory/Meal');
const Town = require('../models/Town');

const sequelize = require('../../config/database');

const Joi = require('@hapi/joi');

const ResponseApi = () => {
  const alldata = async (req, res) => {
    let response;
    try {
      const townArray = await Town.findAll({
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
      };
    } catch (err) {
      return res.status(500).json({
        msg: 'Internal server error',
        error: err,
      });
    }
    return res.status(200).json({ success: true, data: response });
  };
  const searchHotel = async (req, res) => {
    const { body } = req;
    const schema = Joi.object({
      town: Joi.number().required(),
      meal: Joi.number().required(),
      adult: Joi.number().required(),
      child: Joi.number().required(),
      room: Joi.number().required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
    });
    let data;
    try {
      await schema.validateAsync(body);
      data = await sequelize.query(`Select 
    xt.hotelid,json_build_object('hotel',row_to_json(hl.*)::jsonb  || json_build_object('room',json_agg(distinct rm.*),'meal',json_agg(distinct ml.*),'allocation',json_agg(distinct ht.*),'price',json_agg(distinct (json_build_object('roomid',roomid,'htplaceid',htplaceid,'mealid',mealid,'price',price,'spos',sposid,'spostype',spotype)::text)::jsonb))::jsonb) as hotels 
    from hotelsalepr as xt
    inner join (select hl.inc,hl.name,hl.lname,star.name as starname,town.name as townname,hl.town from  hotel as hl inner join star on star.inc=hl.star inner join town on town.inc = hl.town) hl on xt.hotelid = hl.inc
    inner join (select inc,name,lname from room) as rm on xt.roomid = rm.inc  
    left join (select inc,name,lname from meal) ml on xt.mealid = ml.inc 
    left join allocations ht on ht.inc =htplaceid 
    left join spos on spos.inc = xt.sposid  
    where hl.town = ${body.town} and  
    (to_char(datebeg,'YYYY-MM-DD')::Date <= '${body.startDate}'  and  to_char(dateend,'YYYY-MM-DD')::date >='${body.endDate}') 
    and (to_char(rqdatebeg,'YYYY-MM-DD')::Date <= '${body.startDate}'  and  to_char(rqdateend,'YYYY-MM-DD')::date >='${body.endDate}')
     and ml.inc=${body.meal} 
      and ht.adult =${body.adult} and ht.child = ${body.child === 0 ? null : body.child}  and ht.age1max=5.99
       and rm.inc = ${body.room}
    group by xt.hotelid,hl.*;`, { raw: true });
      console.log(data[0]);
    } catch (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({ success: true, data: data[0] });
  };
  return {
    alldata,
    searchHotel,
  };
};

module.exports = ResponseApi;
