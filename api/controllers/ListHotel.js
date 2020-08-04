const Joi = require("@hapi/joi");
const Sequelize = require("sequelize");
const Hotel = require("../models/HotelCategory/Hotel");
const Town = require("../models/Town");
const sequelize = require("../../config/database");
const AcceptRejectHotel = require("../models/HotelAdmin/AcceptRejectedHotel");
const { Op, QueryTypes } = Sequelize;

const ListHotel = () => {
  const getHotelSega = async (req, res) => {
    const { query } = req;
    const schema = Joi.object({
      town_code: Joi.number().integer(),
      state_code: Joi.number().integer(),
      updated: Joi.date(),
      accept_reject: Joi.bool(),
    });
    try {
      await schema.validateAsync(query);
      const { town_code, state_code, updated, accept_reject } = query;
      let town = [];
      if (town_code) {
        town.push(town_code);
      }
      if (state_code) {
        const Tn = await Town.findAll({
          where: { stateid: state_code },
          attributes: ["inc"],
          distinct: true,
        });
        console.log(JSON.stringify(Tn));
        if (Tn) {
          Tn.forEach((value) => town.push(value.inc));
        }
      }
      let whereQ = {
        name: { [Op.not]: null, [Op.notILike]: "Unknown hotel" },
      };
      if (town.length > 0) {
        whereQ = Object.assign(whereQ, {
          town: {
            [Op.in]: town,
          },
        });
      }
      if (updated && accept_reject == undefined) {
        whereQ = Object.assign(whereQ, {
          updatedAt: {
            [Op.gt]: updated,
          },
        });
      }
      let where = ` hotel.name is not null and hotel.name not ilike 'Unknown hotel' `;
      let groupby = ``;
      let select = ``;
      let outSelect = ``;
      if (town.length > 0) {
        where = where + ` and hotel.town in (${town.join(",")})`;
      }
      if (accept_reject == undefined) {
        where = where + ` and arh.hotel_system_id is null `;
        if (updated) {
          where = where + ` and hotel."updatedAt" > '${updated}' `;
        }
      } else {
        where =
          where +
          ` and arh.hotel_system_id is not null and accept_reject=${accept_reject} `;
        groupby = `,arh.id,arh.accept_reject `;
        select = `,arh.id as accept_reject_id,arh.accept_reject`;
        outSelect = `,accept_reject_id,accept_reject `;
      }

      const data = await sequelize.query(
        `select name,inc as hotel_id,town_name,state_name,star,case when count(room) > 0 then json_agg(jsonb_build_object('room',room,'allocation',room_type)) else '[]' end as room_type ${outSelect} from (select distinct hotel.name,hotel.inc,tn.name as town_name,st.name as state_name,star.name as star,room.name as room,ARRAY_AGG(ht.name) as room_type ${select} from hotel inner join star on star.inc = hotel.star inner join town as tn on tn.inc = hotel.town inner join public."state" as st on st.inc = tn.stateid left join hotelsalepr as hs on hs.hotelid=hotel.inc left join room on hs.roomid=room.inc left join allocations ht on ht.inc = hs.htplaceid left join accept_reject_hotel as arh on arh.hotel_system_id = hotel.inc and lower(arh.travel_agent) ='sega' where ${where} group by hotel.name,hotel.inc,room.name,tn.name,st.name,star.name ${groupby}) as a group by a.name,a.inc,town_name,state_name,star ${outSelect}`,
        { type: QueryTypes.SELECT, logging: console.log }
      );
      // const data = await Hotel.findAll({
      //   where: where,
      //   attributes: ["inc", "name", "lname"],
      // });
      const maxHotel = await Hotel.max("updatedAt", { where: whereQ });
      return res
        .status(200)
        .json({ data, maxTime: maxHotel, msg: "Successfully data" });
    } catch (error) {
      return res.status(400).json({
        msg: error.message,
        error: error,
      });
    }
  };
  const getHotelDotw = async (req, res) => {
    const { query } = req;
    const schema = Joi.object({
      country_code: Joi.number().integer(),
      city_code: Joi.number().integer(),
      updated: Joi.date(),
      accept_reject: Joi.bool(),
    });
    try {
      await schema.validateAsync(query);
      const { country_code, city_code, updated, accept_reject } = query;
      let where = ``;
      let select = ``;
      if (country_code != 0 && country_code != undefined) {
        where = where + ` and hd."countryCode" = '${country_code}'`;
      }
      if (city_code != 0 && city_code != undefined) {
        where = where + ` and hd."cityCode" = '${city_code}'`;
      }
      if (accept_reject == undefined) {
        where = where + ` and arh.hotel_system_id is null `;
        if (updated) {
          where = where + ` and hotel."updatedAt" > '${updated}' `;
        }
      } else {
        where =
          where +
          ` and arh.hotel_system_id is not null and accept_reject=${accept_reject} `;
        select = `,arh.id as accept_reject_id,arh.accept_reject`;
      }

      const data = await sequelize.query(
        `select hd.*,gc.name as city_name,gcc.name as country_name ${select} from dota.hoteldata as hd inner join dota.getserveringcities as gc on gc.code = hd."cityCode" inner join dota.getserveringcountries as gcc on gcc.code = hd."countryCode" left join accept_reject_hotel as arh on arh.hotel_system_id = hd.hotelid and lower(arh.travel_agent) ='dotw' where 1=1 ${where}
        `,
        { type: QueryTypes.SELECT, logging: console.log }
      );
      const maxHotel = await sequelize.query(
        `select hd."updatedAt" from dota.hoteldata as hd inner join dota.getserveringcities as gc on gc.code = hd."cityCode" inner join dota.getserveringcountries as gcc on gcc.code = hd."countryCode" left join accept_reject_hotel as arh on arh.hotel_system_id = hd.hotelid where 1=1 ${where}
        `,
        { type: QueryTypes.SELECT, logging: console.log }
      );
      return res
        .status(200)
        .json({ data, maxTime: maxHotel, msg: "Successfully data" });
    } catch (error) {
      return res.status(400).json({
        msg: error.message,
        error: error,
      });
    }
  };
  const acceptRejectHotel = async (req, res) => {
    const { body } = req;
    try {
      const schema = Joi.object({
        hotel_system_id: Joi.number().required(),
        admin_id: Joi.number().required(),
        accept_reject: Joi.bool().required(),
        travel_agent: Joi.string().valid("SEGA", "DOTW").required(),
        id: Joi.number(),
      });
      await schema.validateAsync(body);
      body.admin_id = 1;
      const resp = await AcceptRejectHotel.upsert(body);
      if (body.accept_reject) {
      }
      return res.status(200).json({
        msg: body.accept_reject
          ? "Hotel Added Successfully"
          : "Hotel Removed Successfully",
      });
    } catch (error) {
      return res.status(400).json({
        msg: error.message,
        error: error,
      });
    }
  };
  return { getHotelSega, acceptRejectHotel, getHotelDotw };
};

module.exports = ListHotel;
