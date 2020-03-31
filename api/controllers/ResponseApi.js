const Room = require('../models/HotelCategory/Room');
const Hotel = require('../models/HotelCategory/Hotel');
const Meal = require('../models/HotelCategory/Meal');
const State = require('../models/State');
const Town = require('../models/Town');
const CitiesServer = require('../models/Dota/getserveringcities');
const CountriesServer = require('../models/Dota/getserveringcounties');
const Rating = require('../models/Dota/gethotelclassificationids');
const sequelize = require('../../config/database');
const syncApi = require('../services/sync.service');
const Joi = require('@hapi/joi');
const Sequelize = require('sequelize');
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
        msg: 'Internal server erroror',
        erroror: error,
      });
    }
    return res.status(200).json({ success: true, data: response });
  };
  const searchHotel = async (req, res) => {
    const { body } = req;
    const schema = Joi.object({
      state: Joi.number().integer().required().min(1),
      town: Joi.number().integer(),
      meal: Joi.number().integer(),
      adult: Joi.number().integer(),
      child: Joi.number().integer(),
      room: Joi.number().integer(),
      hotel: Joi.number().integer().when(Joi.ref('type'), {
        is: Joi.exist(),
        then: Joi.required()
      }),
      startDate: Joi.date().required(),
      endDate: Joi.date().required().greater(Joi.ref('startDate')),
      type: Joi.string().valid('sega', 'dota', '')
    });
    let data;
    try {
      await schema.validateAsync(body);
      let dotahotel;
      if (body.type != '' && body.hotel < 1) {
        return res.status(400).json({ success: false, error: 'hotelid is required to fetch rooms details.'});
 
      }
      if (body.type == '') {
        dotahotel = searchHotelDota(body)
      } else if (body.type == 'dota') {
        let fotahotel = await getHotelData(body)
        return res.status(200).json({ success: true, data: fotahotel });
      }
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
    xt.hotelid,json_build_object('hotel',row_to_json(hl.*)::jsonb  `+ (body.hotel > 0 ? `|| json_build_object('room',json_agg(distinct rm.*),'meal',json_agg(distinct ml.*),'allocation',json_agg(distinct ht.*),'price',json_agg(distinct 
    (json_build_object('roomid',roomid,'htplaceid',htplaceid,'mealid',mealid,'price',price,'spos',sposid,'spostype',spotype,'avaiable_room',rcount,'stopforsale',case when stop > 0 then true else false end,'stop',stop,'days','${body.endDate}'::date - '${body.startDate}'::date)::text)::jsonb))::jsonb` : '') + `) as hotels 
    from hotelsalepr as xt
    inner join (select hl.inc,hl.name,hl.lname,star.name as starname,town.name as townname,hl.town,hl.status,town.stateid as stateid from  hotel as hl inner join star on star.inc=hl.star inner join town on town.inc = hl.town) hl on xt.hotelid = hl.inc
    inner join (select inc,name,lname,status from room) as rm on xt.roomid = rm.inc  
    left join (select inc,name,lname,status from meal) ml on xt.mealid = ml.inc 
    left join allocations ht on ht.inc =htplaceid 
    left join spos on spos.inc = xt.sposid 
    left join lateral (select count(inc) as stop from stopsale where trim(status) != 'D' and hotelid = xt.hotelid and (roomid = xt.roomid or roomid= -2147483647)
                       and (mealid = xt.mealid or mealid= -2147483647)
                       and (htplaceid = xt.htplaceid or htplaceid= -2147483647) 
                      and  (to_char(datebeg,'YYYY-MM-DD')::Date <= '${body.startDate}'  and  to_char(dateend,'YYYY-MM-DD')::date >='${body.endDate}') ) as stopsale on true	 
    left join lateral (select rcount from reserve where hotelid =xt.hotelid and roomid = xt.roomid and trim(status) != 'D') as reserve on true
    where hl.stateid = ${body.state} and  trim(xt.status) != 'D' and  trim(hl.status) != 'D' and trim(rm.status) != 'D' and trim(ml.status) != 'D' and  trim(spos.status) != 'D' and 
     (to_char(datebeg,'YYYY-MM-DD')::Date <= '${body.startDate}'  and  to_char(dateend,'YYYY-MM-DD')::date >='${body.endDate}') 
    and (to_char(rqdatebeg,'YYYY-MM-DD')::Date <= '${body.startDate}'  and  to_char(rqdateend,'YYYY-MM-DD')::date >='${body.endDate}') ${where} and '${body.endDate}'::date - '${body.startDate}'::date between xt.nightsfrom and xt.nightstill
    group by xt.hotelid, hl.*; `, { raw: true });
      if (data[0]) {
        if (body.hotel > 0) {
          data[0].forEach((dat) => {
            dat.hotels.hotel.price.forEach((price) => {
              if (price.spostype === 1) {
                // eslint-disable-next-line no-param-reassign
                price.price *= price.days;
              }
            });
          });
        }
      }
      if (body.type != 'sega') {
        Promise.all([dotahotel]).then(value => {
          return res.status(200).json({ success: true, data: data[0], dotadaata: value[0] });
        })
      } else {
        return res.status(200).json({ success: true, data: data[0] });

      }
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  };
  return {
    alldata,
    searchHotel,
  };
};

const searchHotelDota = async (request) => {
  try {
    let statename = '';
    let counterOrCityid = '';
    city = false;
    country = false;

    await State.findOne({ where: { inc: request.state } }).then(note => {
      console.log(note.get({ plain: true }));
      statename = note.name;
    })
    await CountriesServer.findOne({ where: { name: { [Sequelize.Op.iLike]: '%' + statename + '%' } } }).then(note => {
      console.log(note.get({ plain: true }));
      counterOrCityid = note.code
      country = true;
      city = false;
    })
    if (counterOrCityid == '') {
      await CitiesServer.findOne({ where: { name: { [Sequelize.Op.iLike]: '%' + statename + '%' } } }).then(note => {
        console.log(note.get({ plain: true }));
        counterOrCityid = note.code
        city = true;
        country = false;
      })
    }
    let requestBody = `<customer>
  <username>XML Praivit</username>
  <password>9b3c209e73f7c01c83dbb6f4203ec2ff</password>
  <id>262220</id>
  <source>1</source>
  <product>hotel</product>
  <request command="searchhotels">
      <bookingDetails>
          <fromDate>`+ request.startDate + `</fromDate>
          <toDate>`+ request.endDate + `</toDate>
          <currency>413</currency>
              <rooms no="1">
                  <room runno="0">
                      <adultsCode>`+ (request.adult != 0 ? request.adult : 1) + `</adultsCode>
                      <children no="0">
                      </children>
                      <rateBasis>-1</rateBasis>
                      <passengerNationality>20</passengerNationality>
                      <passengerCountryOfResidence>20</passengerCountryOfResidence>
                  </room>
              </rooms>
      </bookingDetails>
      <return>
          <filters xmlns:a="http://us.dotwconnect.com/xsd/atomicCondition" xmlns:c="http://us.dotwconnect.com/xsd/complexCondition">
              `+ (city ? '<city>' + counterOrCityid + '</city>' : '') + `
              `+ (country ? '<country>' + counterOrCityid + '</country>' : '') + `
              <noPrice>true</noPrice>
          </filters>
      </return>
  </request>
</customer>`
    let data = await syncApi().callApiXml(requestBody)
    let hotelarray = [];
    let rating = new Map(); 
    let datarating = await Rating.findAll({
      attributes: ['code', 'name'],
      raw:true
    })
    for (let i=0;i< datarating.length;i++) {
      let element = datarating[i]
      rating.set(element.code,element.name);
    };
    data.hotels[0].hotel.forEach(element => {
      let hoteljson = {
        address: '',
        hotelname: '',
        rating: '',
        location: '',
        id: ''
      }
      hoteljson.id = element.$.hotelid
      hoteljson.address = element.address[0]
      hoteljson.hotelname = element.hotelName[0]
      hoteljson.rating = rating.get(element.rating[0])
      hoteljson.location = element.location[0]
      hotelarray.push(hoteljson)
    })
    return hotelarray
  } catch (erroror) {
    console.log("erroror in dota", erroror);
    return erroror.message
  }
}
const getHotelData = async (request) => {
  try {
    let requestBody = `<customer>
  <username>XML Praivit</username>
  <password>9b3c209e73f7c01c83dbb6f4203ec2ff</password>
  <id>262220</id>
  <source>1</source>
  <product>hotel</product>
  <request command="getrooms">
      <bookingDetails>
          <fromDate>`+ request.startDate + `</fromDate>
          <toDate>`+ request.endDate + `</toDate>
          <currency>413</currency>
              <rooms no="1">
                  <room runno="0">
                      <adultsCode>`+ (request.adult != 0 ? request.adult : 1) + `</adultsCode>
                      <children no="0">
                      </children>
                      <rateBasis>-1</rateBasis>
                      <passengerNationality>20</passengerNationality>
                      <passengerCountryOfResidence>20</passengerCountryOfResidence>
                  </room>
              </rooms>
              <productId>`+ request.hotel + `</productId>
      </bookingDetails>
  </request>
</customer>`
console.log(requestBody);
    let data = await syncApi().callApiXml(requestBody)
    return data
  } catch (erroror) {
    console.log("erroror in dota", erroror);
    return erroror.message
  }
}


module.exports = ResponseApi;
