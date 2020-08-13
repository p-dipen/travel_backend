const syncApi = require("../services/sync.service");
const Cities = require("../models/Dota/getcities");
const Countries = require("../models/Dota/getcounties");
const CountriesServer = require("../models/Dota/getserveringcounties");
const CitiesServer = require("../models/Dota/getserveringcities");
const Currency = require("../models/Dota/getcurrency");
const Rating = require("../models/Dota/gethotelclassificationids");
const HotelData = require("../models/Dota/staticHotel");
const moment = require("moment");
const DOTAControl = () => {
  const migratedb = async (req, res) => {
    migrate =
      req.body.migrate ||
      "getallcities,getallcountries,getservingcountries,getservingcities,getcurrenciesids,gethotelclassificationids";
    migrat = migrate.split(",");
    console.log(migrat);
    response = "";
    for (let i = 0; i < migrat.length; i++) {
      let body = "";
      if (
        migrat[i] == "getallcities" ||
        migrat[i] == "getallcountries" ||
        migrat[i] == "getservingcountries" ||
        migrat[i] == "getcurrenciesids" ||
        migrat[i] == "gethotelclassificationids"
      ) {
        body =
          `<customer>
                <username>XML Praivit</username>
                <password>9b3c209e73f7c01c83dbb6f4203ec2ff</password>
                <id>262220</id>
                <source>1</source>
                <product></product>
                <request command="` +
          migrat[i] +
          `"></request>
                </customer>`;
      } else if (migrat[i] == "getservingcities") {
        body = `<customer>
                <username>XML Praivit</username>
                <password>9b3c209e73f7c01c83dbb6f4203ec2ff</password>
                <id>262220</id>
                <source>1</source>
                <product>hotel</product>
                <request command="getservingcities"><return><filters>
                 <topDeals>true</topDeals>
                <luxury>true</luxury>
                <specialDeals>true</specialDeals>
                </filters>
                <fields>  
                <field>countryName</field>  
                <field>countryCode</field>  
            </fields> 
                </return></request>
                </customer>`;
      }
      console.log(body);
      if (body != "" && body) {
        let data = await syncApi().callApiXml(body);
        response = data;
      }
      console.log(response);
      switch (migrat[i]) {
        case "getallcities":
          let city = response.cities[0].city;
          console.log(city);
          cities = [];
          if (city) {
            for (let i = 0; i < city.length; i++) {
              element = city[i];
              let tmpcities = {
                code: null,
                name: null,
                regionname: null,
                regioncode: null,
              };
              tmpcities.name = element.name[0];
              tmpcities.code = element.code[0];
              // tmpcities.countryname = element.countryname[0] || null;
              // tmpcities.countrycode = element.countrycode[0]|| null;
              cities.push(tmpcities);
              if (cities.length >= 499) {
                await Cities.bulkCreate(cities)
                  .then((result) => {
                    cities = [];
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }
            if (cities.length > 0) {
              await Cities.bulkCreate(cities)
                .then((result) => {
                  console.log("Cities");
                  cities = [];
                })
                .catch((err) => {
                  console.log(err);
                });
              console.log("data", cities.length);
            }
          }
          break;
        case "getallcountries":
          let country = response.countries[0].country;
          console.log(country);
          countires = [];
          if (country) {
            for (let i = 0; i < country.length; i++) {
              element = country[i];
              let tmpcounties = {
                code: null,
                name: null,
                countryname: null,
                countrycode: null,
              };
              tmpcounties.name = element.name[0];
              tmpcounties.code = element.code[0];
              // tmpcities.countryname = element.countryname[0] || null;
              // tmpcities.countrycode = element.countrycode[0]|| null;
              countires.push(tmpcounties);
              if (countires.length >= 499) {
                console.log(countires.length);
                await Countries.bulkCreate(countires)
                  .then((result) => {
                    console.log("countires");
                    countires = [];
                    console.log(countires.length);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                console.log("data", countires.length);
              }
            }
            if (countires.length > 0) {
              console.log(countires.length);
              await Countries.bulkCreate(countires)
                .then((result) => {
                  console.log("countires");
                  countires = [];
                  console.log(countires.length);
                })
                .catch((err) => {
                  console.log(err);
                });
              console.log("data", countires.length);
            }
          }
          break;
        case "getservingcountries":
          let countryS = response.countries[0].country;
          console.log(countryS);
          countires = [];
          if (countryS) {
            for (let i = 0; i < countryS.length; i++) {
              element = countryS[i];
              let tmpcounties = {
                code: null,
                name: null,
                countryname: null,
                countrycode: null,
              };
              tmpcounties.name = element.name[0];
              tmpcounties.code = element.code[0];
              // tmpcities.countryname = element.countryname[0] || null;
              // tmpcities.countrycode = element.countrycode[0]|| null;
              countires.push(tmpcounties);
              if (countires.length >= 499) {
                console.log(countires.length);
                await CountriesServer.bulkCreate(countires)
                  .then((result) => {
                    console.log("countires");
                    countires = [];
                    console.log(countires.length);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                console.log("data", countires.length);
              }
            }
            if (countires.length > 0) {
              console.log(countires.length);
              await CountriesServer.bulkCreate(countires)
                .then((result) => {
                  console.log("countires");
                  countires = [];
                  console.log(countires.length);
                })
                .catch((err) => {
                  console.log(err);
                });
              console.log("data", countires.length);
            }
          }
          break;
        case "getservingcities":
          let cityS = response.cities[0].city;
          console.log(cityS);
          cities = [];
          if (cityS) {
            for (let i = 0; i < cityS.length; i++) {
              element = cityS[i];
              let tmpcities = {
                code: null,
                name: null,
                countryname: null,
                countrycode: null,
              };
              tmpcities.name = element.name[0];
              tmpcities.code = element.code[0];
              tmpcities.countryname = element.countryName[0] || null;
              tmpcities.countrycode = element.countryCode[0] || null;
              cities.push(tmpcities);
              if (cities.length >= 499) {
                console.log(cities.length, i);
                await CitiesServer.bulkCreate(cities, {
                  updateOnDuplicate: ["code"],
                })
                  .then((result) => {
                    cities = [];
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }
            if (cities.length > 0) {
              await CitiesServer.bulkCreate(cities)
                .then((result) => {
                  console.log("Cities");
                  cities = [];
                })
                .catch((err) => {
                  console.log(err);
                });
              console.log("data", cities.length);
            }
          }
          break;
        case "getcurrenciesids":
          let currency = response.currency[0].option;
          console.log(currency);
          currenices = [];
          if (currency) {
            for (let i = 0; i < currency.length; i++) {
              element = currency[i];
              let tmpcurrency = {
                name: null,
                code: null,
                shortname: null,
              };
              tmpcurrency.name = element._;
              tmpcurrency.code = element.$.value;
              tmpcurrency.shortname = element.$.shortcut;
              currenices.push(tmpcurrency);
            }
            if (currenices.length > 0) {
              await Currency.bulkCreate(currenices)
                .then((result) => {
                  console.log("currenices");
                })
                .catch((err) => {
                  console.log(err);
                });
              console.log("data", currenices.length);
            }
          }
          break;
        case "gethotelclassificationids":
          let rating = response.classification[0].option;
          console.log(rating);
          ratines = [];
          if (rating) {
            for (let i = 0; i < rating.length; i++) {
              element = rating[i];
              let tmprating = {
                name: null,
                code: null,
              };
              tmprating.name = element._;
              tmprating.code = element.$.value;
              ratines.push(tmprating);
            }
            if (ratines.length > 0) {
              await Rating.bulkCreate(ratines)
                .then((result) => {
                  console.log("ratines");
                })
                .catch((err) => {
                  console.log(err);
                });
              console.log("data", ratines.length);
            }
          }
          break;
        case "getstatichoteldata":
          let countryServe = await CountriesServer.findAll({
            attributes: ["code"],
            where: { code: 175 },
            distinct: true,
            raw: true,
            limit: 10,
          });
          console.log(countryServe);
          countryServe.forEach(async (country) => {
            let requestBody =
              `<customer>
          <username>XML Praivit</username>
          <password>9b3c209e73f7c01c83dbb6f4203ec2ff</password>
          <id>262220</id>
          <source>1</source>
          <product>hotel</product>
          <request command="searchhotels">
              <bookingDetails>
                  <fromDate>` +
              moment().add(1, "days").format("YYYY-MM-DD") +
              `</fromDate>
                  <toDate>` +
              moment().add(2, "days").format("YYYY-MM-DD") +
              `</toDate>
                  <currency>413</currency>
                      <rooms no="1">
                          <room runno="0">
                              <adultsCode>1</adultsCode>
                              <children no="0">
                              </children>
                              <rateBasis>-1</rateBasis>
                              <passengerNationality>20</passengerNationality>
                              <passengerCountryOfResidence>20</passengerCountryOfResidence>
                          </room>
                      </rooms>
              </bookingDetails>
              <return>
              <getRooms>true</getRooms> 
                  <filters xmlns:a="http://us.dotwconnect.com/xsd/atomicCondition" xmlns:c="http://us.dotwconnect.com/xsd/complexCondition">
                <country>` +
              country.code +
              `</country>              
                      <noPrice>true</noPrice>
                  </filters>
              </return>
          </request>
        </customer>`;
            console.log(requestBody);
            let dataHotel = await syncApi().callApiXml(requestBody);
            let hotelarray = [];
            let ratingMap = new Map();
            let datarating = await Rating.findAll({
              attributes: ["code", "name"],
              raw: true,
            });
            console.log(datarating);
            for (let i = 0; i < datarating.length; i++) {
              let element = datarating[i];
              ratingMap.set(element.code, element.name);
            }
            response = JSON.stringify(dataHotel);
            dataHotel.hotels[0].hotel &&
              dataHotel.hotels[0].hotel.forEach((element) => {
                let hoteljson = {
                  address: "",
                  hotelname: "",
                  rating: "",
                  location: "",
                  hotelid: "",
                  countryCode: "",
                  cityCode: "",
                  roomtype: [],
                };
                hoteljson.hotelid = element.$.hotelid;
                hoteljson.address = element.address[0];
                hoteljson.hotelname = element.hotelName[0];
                hoteljson.rating = ratingMap.get(element.rating[0]);
                hoteljson.location = element.location[0];
                hoteljson.countryCode = element.countryCode[0];
                hoteljson.cityCode = element.cityCode[0];
                hoteljson.roomtype = (
                  (element.rooms[0] &&
                    element.rooms[0].room[0] &&
                    element.rooms[0].room[0].roomType) ||
                  []
                ).reduce((total, ele) => {
                  total.push(ele.name[0]);
                  return total;
                }, []);
                hotelarray.push(hoteljson);
              });
            await HotelData.bulkCreate(hotelarray, {
              updateOnDuplicate: ["hotelid"],
              logging: console.log,
            }).then((result) =>
              console.log("hoteldone for this country code ", country.code)
            );
          });
          break;
      }
    }
    return res.status(200).json({ success: true, response });
  };
  return { migratedb };
};

module.exports = DOTAControl;
