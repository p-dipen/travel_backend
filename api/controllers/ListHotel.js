const Joi = require("@hapi/joi");
const Sequelize = require("sequelize");
const Hotel = require("../models/HotelCategory/Hotel");
const Town = require("../models/Town");
const sequelize = require("../../config/database");
const AcceptRejectHotel = require("../models/HotelAdmin/AcceptRejectedHotel");
const axios = require("axios");
const fuzz = require("fuzzball");
const syncApi = require("../services/sync.service");
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
        select = `,arh.id as accept_reject_id,arh.accept_reject,arh.view_id as view_accept_reject_id`;
        outSelect = `,accept_reject_id,accept_reject,view_accept_reject_id `;
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
        select = `,arh.id as accept_reject_id,arh.accept_reject,arh.view_id as view_accept_reject_id`;
      }

      const data = await sequelize.query(
        `select hd.*,gc.name as city_name,gcc.name as country_name ${select} from dota.hoteldata as hd inner join dota.getserveringcities as gc on gc.code = hd."cityCode" inner join dota.getserveringcountries as gcc on gcc.code = hd."countryCode" left join accept_reject_hotel as arh on arh.hotel_system_id = hd.hotelid and lower(arh.travel_agent) ='dotw' where 1=1 ${where}
        `,
        { type: QueryTypes.SELECT, logging: console.log }
      );
      const maxHotel = await sequelize.query(
        `select hd."updatedAt" from dota.hoteldata as hd inner join dota.getserveringcities as gc on gc.code = hd."cityCode" inner join dota.getserveringcountries as gcc on gcc.code = hd."countryCode" left join accept_reject_hotel as arh on arh.hotel_system_id = hd.hotelid where 1=1 ${where} limit 1
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
        hotel_json: Joi.object(),
      });
      await schema.validateAsync(body);
      body.admin_id = 1;
      const resp = await AcceptRejectHotel.upsert(body, {
        updateOnDuplicate: ["travel_agent", "admin_id", "hotel_system_id"],
        returning: true,
      });
      console.log("entry in our system ", resp);
      if (body.accept_reject) {
        const url =
          "https://module-hotel-node-api.herokuapp.com/public/admin-hotel/property/save";
        const { hotel_json, travel_agent } = body;
        let obj = {
          name: "",
          addressLine1: "",
          country: 0,
          city: 0,
          province: 0,
          pincode: "0",
          timezone: 0,
          isContactDetail: false,
          isCorrespondanceDetail: false,
        };
        if (travel_agent == "DOTW") {
          obj.name = hotel_json.hotelname;
          obj.addressLine1 = hotel_json.address;
          let getCityCountryRes = await getCityCountry(
            hotel_json.city_name,
            hotel_json.country_name
          );
          obj.country = getCityCountryRes.country_code;
          obj.city = getCityCountryRes.city_code;
          obj.province = getCityCountryRes.province_code;
          obj.timezone = getCityCountryRes.timezone_code;
        } else {
          obj.name = hotel_json.name;
          obj.addressLine1 =
            hotel_json.town_name + ", " + hotel_json.state_name;
          let getCityCountryRes = await getCityCountry(
            hotel_json.town_name,
            hotel_json.state_name
          );
          obj.country = getCityCountryRes.country_code;
          obj.city = getCityCountryRes.city_code;
          obj.province = getCityCountryRes.province_code;
          obj.timezone = getCityCountryRes.timezone_code;
        }
        console.log("obj ", obj);
        const res = await syncApi().commoncallJson(url, obj, "POST");
        if (JSON.parse(res).success) {
          console.log("success to update the field");
          let viewId = { view_id: JSON.parse(res).data.id };
          console.log(viewId);
          const tt = await AcceptRejectHotel.update(viewId, {
            where: { id: resp[0].dataValues.id },
            logging: console.log,
          });
          console.log(tt);
        }
        console.log("insert hotel in admin panel ", res);
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
  const getCountHotel = async (req, res) => {
    try {
      let data = await sequelize.query(
        `select b.ta as travel_agent,count(case when accept_reject=true then hotel_system_id end) as accept_hotel,count(case when accept_reject=false then hotel_system_id end) as reject_hotel from accept_reject_hotel right join (select unnest(string_to_array('Sega,dotw', ',')) as ta ) as b on lower(b.ta)=lower(travel_agent) group by b.ta
  `,
        { type: QueryTypes.SELECT, logging: console.log }
      );

      return res
        .status(200)
        .json({ data, sync: { dotw: 0, sega: 0 }, msg: "Successfully data" });
    } catch (error) {
      return res.status(400).json({
        msg: error.message,
        error: error,
      });
    }
  };
  return { getHotelSega, acceptRejectHotel, getHotelDotw, getCountHotel };
};

module.exports = ListHotel;

const getCityCountry = async (city, country) => {
  let res = {
    city_code: 0,
    country_code: 0,
    province_code: 0,
    timezone_code: 0,
  };
  let getname = "city";
  let extra = "";
  let flag = true;
  do {
    let url = `https://module-hotel-node-api.herokuapp.com/public/${getname}/get${extra}`;
    const response = await axios.get(url);
    console.log("citycountry ", response);
    if (response.data && response.data.data.length > 0) {
      for (let i = 0; i < response.data.data.length; i++) {
        let element = response.data.data[i];
        console.log(element);
        let ratio = fuzz.ratio(
          getname == "city" ? city : country,
          element.name
        );
        console.log(ratio, getname == "city" ? city : country, element.name);
        if (ratio > 80) {
          if (getname == "city") {
            res.city_code = element.id;
            res.country_code = element.countryId;
            res.province_code = element.provinceId;
            getname = "country";
            break;
          } else if (getname == "country") {
            res.country_code = element.id;
            res.timezone_code = element.timezoneId;
            flag = false;
            break;
          } else if (getname == "province") {
            res.province_code = element.id;
            res.country_code = element.countryId;
            getname = "country";
            break;
          }
        }
      }
    }
    if (res.city_code == 0) {
      getname = "province";
    }
    if (res.province_code == 0 && getname == "province") {
      getname = "country";
    }
    if (getname == "country" && res.country_code == 0) {
      flag = false;
    }
  } while (flag);
  return res;
};
