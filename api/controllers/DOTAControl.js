const syncApi = require('../services/sync.service');
const Cities = require('../models/Dota/getcities');
const Countries = require('../models/Dota/getcounties');
const CountriesServer = require('../models/Dota/getserveringcounties');
const CitiesServer = require('../models/Dota/getserveringcities');
const Currency = require('../models/Dota/getcurrency');

const DOTAControl = () => {
    const migratedb = async (req, res) => {
        migrate = req.body.migrate || 'getallcities,getallcountries,getservingcountries,getservingcities,getcurrenciesids';
        migrat = migrate.split(",");
        console.log(migrat);
        response = "";
        for (let i = 0; i < migrat.length; i++) {
            let body = '';
            if (migrat[i] == "getallcities" || migrat[i] == "getallcountries" || migrat[i] == "getservingcountries" || migrat[i]=="getcurrenciesids") {
                body = `<customer>
                <username>XML Praivit</username>
                <password>9b3c209e73f7c01c83dbb6f4203ec2ff</password>
                <id>262220</id>
                <source>1</source>
                <product></product>
                <request command="`+ migrat[i] + `"></request>
                </customer>`
            } else if (migrat[i]=="getservingcities") {
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
                </return></request>
                </customer>`
            }
            console.log(body)
            let data = await syncApi().callApiXml(body)
            response = data;
            console.log(response)
            switch (migrat[i]) {
                case "getallcities":
                    let city = response.cities[0].city
                    console.log(city)
                    cities = [];
                    if (city) {
                        for (let i = 0; i < city.length; i++) {
                            element = city[i];
                            let tmpcities = {
                                code: null,
                                name: null,
                                regionname: null,
                                regioncode: null
                            }
                            tmpcities.name = element.name[0];
                            tmpcities.code = element.code[0];
                            // tmpcities.countryname = element.countryname[0] || null;
                            // tmpcities.countrycode = element.countrycode[0]|| null;
                            cities.push(tmpcities)
                            if (cities.length >= 499) {
                                await Cities.bulkCreate(cities).then((result) => {
                                    cities = []
                                }).catch((err) => {
                                    console.log(err)
                                })
                            }
                        };
                        if (cities.length > 0) {
                            await Cities.bulkCreate(cities).then((result) => {
                                console.log('Cities');
                                cities = []
                            }).catch((err) => {
                                console.log(err)
                            })
                            console.log("data", cities.length);
                        }
                    }
                    break;
                case "getallcountries":
                    let country = response.countries[0].country
                    console.log(country)
                    countires = [];
                    if (country) {
                        for (let i = 0; i < country.length; i++) {
                            element = country[i];
                            let tmpcounties = {
                                code: null,
                                name: null,
                                countryname: null,
                                countrycode: null
                            }
                            tmpcounties.name = element.name[0];
                            tmpcounties.code = element.code[0];
                            // tmpcities.countryname = element.countryname[0] || null;
                            // tmpcities.countrycode = element.countrycode[0]|| null;
                            countires.push(tmpcounties)
                            if (countires.length >= 499) {
                                console.log(countires.length)
                                await Countries.bulkCreate(countires).then((result) => {
                                    console.log('countires');
                                    countires = []
                                    console.log(countires.length)
                                }).catch((err) => {
                                    console.log(err)
                                })
                                console.log("data", countires.length);
                            }
                        };
                        if (countires.length > 0) {
                            console.log(countires.length)
                            await Countries.bulkCreate(countires).then((result) => {
                                console.log('countires');
                                countires = []
                                console.log(countires.length)
                            }).catch((err) => {
                                console.log(err)
                            })
                            console.log("data", countires.length);
                        }
                    }
                    break;
                case "getservingcountries":
                    let countryS = response.countries[0].country
                    console.log(countryS)
                    countires = [];
                    if (countryS) {
                        for (let i = 0; i < countryS.length; i++) {
                            element = countryS[i];
                            let tmpcounties = {
                                code: null,
                                name: null,
                                countryname: null,
                                countrycode: null
                            }
                            tmpcounties.name = element.name[0];
                            tmpcounties.code = element.code[0];
                            // tmpcities.countryname = element.countryname[0] || null;
                            // tmpcities.countrycode = element.countrycode[0]|| null;
                            countires.push(tmpcounties)
                            if (countires.length >= 499) {
                                console.log(countires.length)
                                await CountriesServer.bulkCreate(countires).then((result) => {
                                    console.log('countires');
                                    countires = []
                                    console.log(countires.length)
                                }).catch((err) => {
                                    console.log(err)
                                })
                                console.log("data", countires.length);
                            }
                        };
                        if (countires.length > 0) {
                            console.log(countires.length)
                            await CountriesServer.bulkCreate(countires).then((result) => {
                                console.log('countires');
                                countires = []
                                console.log(countires.length)
                            }).catch((err) => {
                                console.log(err)
                            })
                            console.log("data", countires.length);
                        }
                    }
                    break;
                case "getservingcities":
                    let cityS = response.cities[0].city
                    console.log(cityS)
                    cities = [];
                    if (cityS) {
                        for (let i = 0; i < cityS.length; i++) {
                            element = cityS[i];
                            let tmpcities = {
                                code: null,
                                name: null,
                                regionname: null,
                                regioncode: null
                            }
                            tmpcities.name = element.name[0];
                            tmpcities.code = element.code[0];
                            // tmpcities.countryname = element.countryname[0] || null;
                            // tmpcities.countrycode = element.countrycode[0]|| null;
                            cities.push(tmpcities)
                            if (cities.length >= 499) {
                                await CitiesServer.bulkCreate(cities).then((result) => {
                                    cities = []
                                }).catch((err) => {
                                    console.log(err)
                                })
                            }
                        };
                        if (cities.length > 0) {
                            await CitiesServer.bulkCreate(cities).then((result) => {
                                console.log('Cities');
                                cities = []
                            }).catch((err) => {
                                console.log(err)
                            })
                            console.log("data", cities.length);
                        }
                    }
                    break;
                case "getcurrenciesids":
                    let currency = response.currency[0].option
                    console.log(currency);
                    currenices = [];
                    if (currency) {
                        for (let i=0;i<currency.length;i++) {
                            element = currency[i]
                            let tmpcurrency = {
                                name:null,
                                code:null,
                                shortname:null
                            }
                            tmpcurrency.name = element._
                            tmpcurrency.code = element.$.value
                            tmpcurrency.shortname = element.$.shortcut
                            currenices.push(tmpcurrency);
                        };
                        if (currenices.length > 0 ) {
                            await Currency.bulkCreate(currenices).then((result) => {
                                console.log('currenices');
                            }).catch((err) => {
                                console.log(err)
                            })
                            console.log("data", currenices.length);
                        }
                    }
                    break;
            }
        }
        return res.status(200).json({ success: true, response });
    }
    return { migratedb }
}

module.exports = DOTAControl;