/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* eslint-disable prefer-template */
const fetch = require("node-fetch");

const xml2js = require("xml2js");

const qs = require("qs");

const parse = new xml2js.Parser();

const ApiUrl =
  "http://segatours.toursupport.ru/xmlgate/export/default.php?samo_action=reference&form=http://samo.travel";
const ApiUrl2 =
  "http://segatours.toursupport.ru/xmlgate/export/default.php?samo_action=reference&form=http://samo.ru";
const DOTAURL = "http://xmldev.dotwconnect.com/gatewayV4.dotw";
const syncApi = () => {
  const callApi = async (type, laststamp, delstamp, token) => {
    let resdata = "";
    try {
      let api =
        ApiUrl2 + `&type=${type}&laststamp=${laststamp}&delstamp=${delstamp}`;
      if (token) {
        api += `&partner_token=${token}`;
      }
      console.log(api);
      const response = await fetch(api).then((res) => res.text());
      parse.parseString(response, (err, data) => {
        if (err) console.log(err);
        resdata = data.Response.Data[0];
      });
    } catch (err) {
      console.log("error----", err);
    }
    return resdata;
  };
  const callApiXml = async (body) => {
    let resdata = "";
    try {
      let api = DOTAURL;
      console.log(api);
      const response = await fetch(api, {
        method: "POST",
        body: body,
        headers: { "Content-Type": "text/xml;" },
      }).then((res) => res.text());
      parse.parseString(response, (err, data) => {
        if (err) console.log(err);
        console.log(data);
        resdata = data.result;
      });
    } catch (err) {
      console.log("error----", err);
    }
    return resdata;
  };
  const currentTimeStamp = async (type) => {
    let resdata = "";
    try {
      const api = ApiUrl + `&type=${type}`;
      const response = await fetch(api).then((res) => res.text());
      parse.parseString(response, (err, data) => {
        resdata = data.Response.Data[0].currentstamp[0].$.stamp;
      });
    } catch (err) {
      console.log("error----", err);
    }
    return resdata;
  };
  const commoncall = async (api, body) => {
    let resdata = "";
    try {
      const response = await fetch(api, {
        method: "POST",
        body: qs.stringify(body),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      }).then((res) => res.text());
      parse.parseString(response, (err, data) => {
        resdata = data.Response.Data[0];
      });
    } catch (err) {
      console.log("error----", err);
    }
    return resdata;
  };
  const commoncallJson = async (api, body, method) => {
    let resdata = "";
    try {
      console.log(api, body);
      const response = await fetch(api, {
        method: method || "POST",
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      resdata = response.text();
    } catch (err) {
      console.log("error----", err);
    }
    return resdata;
  };
  return {
    callApi,
    currentTimeStamp,
    commoncall,
    callApiXml,
    commoncallJson,
  };
};

module.exports = syncApi;
