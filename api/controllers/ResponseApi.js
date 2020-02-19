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
      meal: Joi.number(),
      adult: Joi.number(),
      child: Joi.number(),
      room: Joi.number(),
      hotel: Joi.number(),
      startDate: Joi.date().required(),
      endDate: Joi.date().required().greater(Joi.ref('startDate')),
    });
    let data;
    try {
      await schema.validateAsync(body);
      console.log(body.hotel);
      let where = '';
      if (body.hotel !== 0) where += ` and xt.hotelid=${body.hotel}`;
      if (body.meal !== 0) where += ` and ml.inc=${body.meal}`;
      if (body.child !== 0) {
        where += ` and ht.child =${body.child} and  ht.age1max = 5.99  `;
      } else {
        where += ' and ht.child is null ';
      }
      if (body.room !== 0) where += ` and  rm.inc  =${body.room}`;
      if (body.adult !== 0) {
        where += ` and ht.adult=${body.adult}`;
      } else {
        where += ' and ht.adult=1';
      }
      data = await sequelize.query(`Select 
    xt.hotelid,json_build_object('hotel',row_to_json(hl.*)::jsonb  || json_build_object('room',json_agg(distinct rm.*),'meal',json_agg(distinct ml.*),'allocation',json_agg(distinct ht.*),'price',json_agg(distinct 
    (json_build_object('roomid',roomid,'htplaceid',htplaceid,'mealid',mealid,'price',price,'spos',sposid,'spostype',spotype,'avaiable_room',rcount,'stopforsale',case when stop > 0 then true else false end,'stop',stop,'days','${body.endDate}'::date - '${body.startDate}'::date)::text)::jsonb))::jsonb) as hotels 
    from hotelsalepr as xt
    inner join (select hl.inc,hl.name,hl.lname,star.name as starname,town.name as townname,hl.town,hl.status from  hotel as hl inner join star on star.inc=hl.star inner join town on town.inc = hl.town) hl on xt.hotelid = hl.inc
    inner join (select inc,name,lname,status from room) as rm on xt.roomid = rm.inc  
    left join (select inc,name,lname,status from meal) ml on xt.mealid = ml.inc 
    left join allocations ht on ht.inc =htplaceid 
    left join spos on spos.inc = xt.sposid 
    left join lateral (select count(inc) as stop from stopsale where trim(status) != 'D' and hotelid = xt.hotelid and (roomid = xt.roomid or roomid= -2147483647)
                       and (mealid = xt.mealid or mealid= -2147483647)
                       and (htplaceid = xt.htplaceid or htplaceid= -2147483647) 
                      and  (to_char(datebeg,'YYYY-MM-DD')::Date <= '${body.startDate}'  and  to_char(dateend,'YYYY-MM-DD')::date >='${body.endDate}') ) as stopsale on true	 
    left join lateral (select rcount from reserve where hotelid =xt.hotelid and roomid = xt.roomid and trim(status) != 'D') as reserve on true
    where hl.town = ${body.town} and  trim(xt.status) != 'D' and  trim(hl.status) != 'D' and trim(rm.status) != 'D' and trim(ml.status) != 'D' and  trim(spos.status) != 'D' and 
     (to_char(datebeg,'YYYY-MM-DD')::Date <= '${body.startDate}'  and  to_char(dateend,'YYYY-MM-DD')::date >='${body.endDate}') 
    and (to_char(rqdatebeg,'YYYY-MM-DD')::Date <= '${body.startDate}'  and  to_char(rqdateend,'YYYY-MM-DD')::date >='${body.endDate}') ${where} and '${body.endDate}'::date - '${body.startDate}'::date between xt.nightsfrom and xt.nightstill
    group by xt.hotelid, hl.*; `, { raw: true });
      if (data[0]) {
        console.log(data[0]);
        data[0].forEach((dat) => {
          dat.hotels.hotel.price.forEach((price) => {
            if (price.spostype === 1) {
              // eslint-disable-next-line no-param-reassign
              price.price *= price.days;
            }
          });
        });
      }
    } catch (err) {
      return res.status(400).json({ success: false, err: err.message });
    }
    return res.status(200).json({ success: true, data: data[0] });
  };
  return {
    alldata,
    searchHotel,
  };
};

module.exports = ResponseApi;
