/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const State = require('../models/State');
const Region = require('../models/Region');
const Town = require('../models/Town');
const Star = require('../models/HotelCategory/Star');
const Hotel = require('../models/HotelCategory/Hotel');
const Room = require('../models/HotelCategory/Room');
const Allocation = require('../models/HotelCategory/Allocation');
const Meal = require('../models/HotelCategory/Meal');
const Tour = require('../models/HotelCategory/Tour');
const Port = require('../models/HotelCategory/Port');
const Freight = require('../models/HotelCategory/Freight');
const Class = require('../models/HotelCategory/Class');
const Stopsale = require('../models/HotelCategory/Stopsale');
const Release = require('../models/HotelCategory/Release');
const Servtype = require('../models/HotelCategory/Servtype');
const Service = require('../models/HotelCategory/Service');
const Spos = require('../models/HotelCategory/Spos');
const Currency = require('../models/HotelCategory/Currency');
const Hotelsalepr = require('../models/HotelCategory/Hotelsalepr');
const Servicesalepr = require('../models/HotelCategory/Servicesalepr');
const Reserve = require('../models/HotelCategory/Reserve');
const Alloctype = require('../models/HotelCategory/Alloctype');
const Sposcombine = require('../models/HotelCategory/Sposcombine');

const Sequelize = require('sequelize');

// eslint-disable-next-line prefer-destructuring
const Op = Sequelize.Op;

const syncApi = require('../services/sync.service');


const StateController = () => {
  const register = async (req, res) => {
    // const { body } = req;
    try {
      const currentStampdata = await syncApi().currentTimeStamp('currentstamp');
      const token = await syncApi().commoncall('http://segatours.toursupport.ru/xmlgate/export/default.php?samo_action=auth', { login: 'PraivitXML', passwordDigest: 'BHHwlT8jhS6n%2bsCzjJePrY7HZj%2fOJg35i6ky926jX8x8UEa%2fpRhKJucastwpDuCU' });
      const tokenUsed = token.Result[0].$.partner_token;
      let stamp;
      let stateSchema = [];
      do {
        stamp = '';
        stamp = await State.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const state = await syncApi().callApi('state', stamp, currentStampdata);
        stateSchema = [];
        if (state.state) {
          state.state.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.status = element.$.status.trim();
            stateSchema.push(element.$);
          });
          await State.bulkCreate(stateSchema, { updateOnDuplicate: ['status', 'name', 'lname', 'alias', 'stamp'] }).then(() => {
            console.log('state sucessful');
          });
        }
      } while (stateSchema.length >= 500);
      // if (false) {

      // region
      let regionSchema = [];
      do {
        stamp = '';
        stamp = await Region.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const region = await syncApi().callApi('region', stamp, currentStampdata);
        regionSchema = [];
        if (region.region) {
          region.region.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.stateid = parseInt(element.$.state, 10) || null;
            element.$.status = element.$.status.trim();
            regionSchema.push(element.$);
          });
          await Region.bulkCreate(regionSchema, { updateOnDuplicate: ['stateid', 'lname', 'name', 'status', 'stamp'] }).then(() => {
            console.log('region sucessful');
          });
        }
      } while (regionSchema.length >= 500);

      // town
      let townSchema = [];
      do {
        stamp = '';
        stamp = await Town.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        console.log(stamp);
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const town = await syncApi().callApi('town', stamp, currentStampdata);
        townSchema = [];
        if (town.town) {
          town.town.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.stateid = parseInt(element.$.state, 10) || null;
            element.$.regionid = parseInt(element.$.region, 10) || null;
            element.$.status = element.$.status.trim();
            townSchema.push(element.$);
          });
          await Town.bulkCreate(townSchema, { updateOnDuplicate: ['name', 'stateid', 'lname', 'regionid', 'stamp', 'status'] }).then(() => {
            console.log('town successfully');
          });
        }
      } while (townSchema.length >= 500);

      // star
      let starSchema = [];
      do {
        stamp = '';
        stamp = await Star.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const star = await syncApi().callApi('star', stamp, currentStampdata);
        starSchema = [];
        if (star.star) {
          star.star.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.status = element.$.status.trim();
            starSchema.push(element.$);
          });
          await Star.bulkCreate(starSchema, { updateOnDuplicate: ['stamp', 'lname', 'name', 'status'] }).then(() => {
            console.log('Star successfully');
          });
        }
      } while (starSchema.length >= 500);
      // hotel
      let hotelSchema = [];
      do {
        stamp = '';
        stamp = await Hotel.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const hotel = await syncApi().callApi('hotel', stamp, currentStampdata);
        hotelSchema = [];
        if (hotel.hotel) {
          hotel.hotel.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.townid = parseInt(element.$.town, 10) || null;
            element.$.status = element.$.status.trim();
            hotelSchema.push(element.$);
          });
          await Hotel.bulkCreate(hotelSchema, { updateOnDuplicate: ['status', 'name', 'lname', 'stamp', 'star', 'town'] }).then(() => {
            console.log('Hotel successfully');
          });
        }
      } while (hotelSchema.length >= 500);

      // room
      let roomSchema = [];
      do {
        stamp = '';
        stamp = await Room.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const room = await syncApi().callApi('room', stamp, currentStampdata);
        roomSchema = [];
        if (room.room) {
          room.room.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.status = element.$.status.trim();
            roomSchema.push(element.$);
          });
          await Room.bulkCreate(roomSchema, { updateOnDuplicate: ['lname', 'name', 'status', 'stamp'] }).then(() => {
            console.log('Room successfully');
          });
        }
      } while (roomSchema.length >= 500);

      // allocation
      let allocationSchema = [];
      do {
        stamp = '';
        stamp = await Allocation.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const allocation = await syncApi().callApi('htplace', stamp, currentStampdata);
        allocationSchema = [];
        if (allocation.htplace) {
          allocation.htplace.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.pcount = parseInt(element.$.pcount, 10) || null;
            element.$.adult = parseInt(element.$.adult, 10) || null;
            element.$.child = parseInt(element.$.child, 10) || null;
            element.$.infant = parseInt(element.$.infant, 10) || null;
            element.$.age1min = parseFloat(element.$.age1min) || null;
            element.$.age1max = parseFloat(element.$.age1max) || null;
            element.$.age2min = parseFloat(element.$.age2min) || null;
            element.$.age2max = parseFloat(element.$.age2max) || null;
            element.$.age3min = parseFloat(element.$.age3min) || null;
            element.$.age3max = parseFloat(element.$.age3max) || null;
            element.$.status = element.$.status.trim();
            allocationSchema.push(element.$);
          });
          await Allocation.bulkCreate(allocationSchema, { updateOnDuplicate: ['stamp', 'lname', 'name', 'age2max', 'age2min', 'age1max', 'status', 'age3max', 'age3min', 'age1min', 'infant', 'child', 'adult', 'pcount'] }).then(() => {
            console.log('Allocation successfully');
          });
        }
      } while (allocationSchema.length >= 500);

      // Meal
      let mealSchema = [];
      do {
        stamp = '';
        stamp = await Meal.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const meal = await syncApi().callApi('meal', stamp, currentStampdata);
        mealSchema = [];
        if (meal.meal) {
          meal.meal.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.status = element.$.status.trim();
            mealSchema.push(element.$);
          });
          await Meal.bulkCreate(mealSchema, { updateOnDuplicate: ['status', 'name', 'lname', 'stamp'] }).then(() => {
            console.log('Meal successfully');
          });
        }
      } while (mealSchema.length >= 500);

      // tour
      let tourSchema = [];
      do {
        stamp = '';
        stamp = await Tour.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const tour = await syncApi().callApi('tour', stamp, currentStampdata);
        tourSchema = [];
        if (tour.tour) {
          tour.tour.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.status = element.$.status.trim();
            tourSchema.push(element.$);
          });
          await Tour.bulkCreate(tourSchema, { updateOnDuplicate: ['stamp', 'status', 'name', 'lname'] }).then(() => {
            console.log('tour successfully');
          });
        }
      } while (tourSchema.length >= 500);

      // port
      let portSchema = [];
      do {
        stamp = '';
        stamp = await Port.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const port = await syncApi().callApi('port', stamp, currentStampdata);
        portSchema = [];
        if (port.port) {
          port.port.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.townid = parseInt(element.$.town, 10) || null;
            element.$.status = element.$.status.trim();
            portSchema.push(element.$);
          });
          await Port.bulkCreate(portSchema, { updateOnDuplicate: ['townid', 'stamp', 'status', 'name', 'lname'] }).then(() => {
            console.log('port successfully');
          });
        }
      } while (portSchema.length >= 500);

      // freight
      let freightSchema = [];
      do {
        stamp = '';
        stamp = await Freight.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const freight = await syncApi().callApi('freight', stamp, currentStampdata);
        freightSchema = [];
        if (freight.freight) {
          freight.freight.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.trantypeid = parseInt(element.$.trantype, 10) || null;
            element.$.sourceid = parseInt(element.$.source, 10) || null;
            element.$.srcportid = parseInt(element.$.srcport, 10) || null;
            element.$.targetid = parseInt(element.$.target, 10) || null;
            element.$.trgportid = parseInt(element.$.trgport, 10) || null;
            element.$.status = element.$.status.trim();
            freightSchema.push(element.$);
          });
          await Freight.bulkCreate(freightSchema, { updateOnDuplicate: ['trgportid', 'srcportid', 'targetid', 'status', 'name', 'lname', 'stamp', 'trantypeid', 'sourceid'] }).then(() => {
            console.log('Freight successfully');
          });
        }
      } while (freightSchema.length >= 500);

      // class
      let classSchema = [];
      do {
        stamp = '';
        stamp = await Class.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const classC = await syncApi().callApi('class', stamp, currentStampdata);
        classSchema = [];
        if (classC.class) {
          classC.class.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.status = element.$.status.trim();
            classSchema.push(element.$);
          });
          await Class.bulkCreate(classSchema, { updateOnDuplicate: ['stamp', 'lname', 'name', 'status'] }).then(() => {
            console.log('Class successfully');
          });
        }
      } while (classSchema.length >= 500);

      // Stopsale
      let stopsaleSchema = [];
      do {
        stamp = '';
        stamp = await Stopsale.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const stopsale = await syncApi().callApi('stopsale', stamp, currentStampdata, tokenUsed);
        stopsaleSchema = [];
        // console.log(stopsale);
        if (stopsale.stopsale) {
          stopsale.stopsale.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.hotelid = parseInt(element.$.hotel, 10) || null;
            element.$.roomid = parseInt(element.$.room, 10) || null;
            element.$.htplaceid = parseInt(element.$.htplace, 10) || null;
            element.$.mealid = parseInt(element.$.meal, 10) || null;
            element.$.status = element.$.status.trim();
            element.$.checkin = Boolean(element.$.checkin) || null;
            stopsaleSchema.push(element.$);
          });
          await Stopsale.bulkCreate(stopsaleSchema, { updateOnDuplicate: ['htplaceid', 'hotelid', 'dateeng', 'datebeg', 'stamp', 'status', 'note', 'rqdateeng', 'rqdatebeg', 'issue', 'checkin', 'mealid', 'roomid'] }).then(() => {
            console.log('Stopsale successfully');
          });
        }
      } while (stopsaleSchema.length >= 500);

      // release
      let releaseSchema = [];
      do {
        stamp = '';
        stamp = await Release.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const release = await syncApi().callApi('release', stamp, currentStampdata, tokenUsed);
        releaseSchema = [];
        // console.log(release);
        if (release.release) {
          release.release.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.hotelid = parseInt(element.$.hotel, 10) || null;
            element.$.days = parseInt(element.$.days, 10) || null;
            element.$.status = element.$.status.trim();
            releaseSchema.push(element.$);
          });
          await Release.bulkCreate(releaseSchema, { updateOnDuplicate: ['hotelid', 'dateeng', 'datebeg', 'stamp', 'status', 'days'] }).then(() => {
            console.log('Release successfully');
          });
        }
      } while (releaseSchema.length >= 500);

      // servtype
      let servtypeSchema = [];
      do {
        stamp = '';
        stamp = await Servtype.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const servtype = await syncApi().callApi('servtype', stamp, currentStampdata, tokenUsed);
        servtypeSchema = [];
        // console.log(servtype);
        if (servtype.servtype) {
          servtype.servtype.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.status = element.$.status.trim();
            servtypeSchema.push(element.$);
          });
          await Servtype.bulkCreate(servtypeSchema, { updateOnDuplicate: ['name', 'lname', 'stamp', 'status'] }).then(() => {
            console.log('Servtype successfully');
          });
        }
      } while (servtypeSchema.length >= 500);

      // service
      let serviceSchema = [];
      do {
        stamp = '';
        stamp = await Service.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const service = await syncApi().callApi('service', stamp, currentStampdata, tokenUsed);
        serviceSchema = [];
        // console.log(service);
        if (service.service) {
          service.service.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.servtypeid = parseInt(element.$.servtype, 10) || null;
            element.$.status = element.$.status.trim();
            serviceSchema.push(element.$);
          });
          await Service.bulkCreate(serviceSchema, { updateOnDuplicate: ['name', 'lname', 'servtypeid', 'status', 'stamp'] }).then(() => {
            console.log('Service successfully');
          });
        }
      } while (serviceSchema.length >= 500);
      // spos
      let sposSchema = [];
      do {
        stamp = '';
        stamp = await Spos.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const spos = await syncApi().callApi('spos', stamp, currentStampdata, tokenUsed);
        sposSchema = [];
        // console.log(spos);
        if (spos.spos) {
          spos.spos.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.usecontract = parseInt(element.$.usecontract, 10) || null;
            element.$.mixed = parseInt(element.$.mixed, 10) || null;
            element.$.ebooking = parseInt(element.$.ebooking, 10) || null;
            element.$.usesaleprice = parseInt(element.$.usesaleprice, 10) || null;
            element.$.status = element.$.status.trim();
            sposSchema.push(element.$);
          });
          console.log(sposSchema);
          await Spos.bulkCreate(sposSchema, {
            updateOnDuplicate: ['ebooking', 'status', 'name', 'lname', 'stamp', 'spodate', 'mixed', 'usecontract', 'Canceldate', 'note', 'usesaleprice'],
          }).then(() => {
            console.log('Spos successfully');
          });
        }
      } while (sposSchema.length >= 500);
      // currency
      let currencySchema = [];
      do {
        stamp = '';
        stamp = await Currency.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const currency = await syncApi().callApi('currency', stamp, currentStampdata, tokenUsed);
        currencySchema = [];
        // console.log(currency);
        if (currency.currency) {
          currency.currency.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.status = element.$.status.trim();
            currencySchema.push(element.$);
          });
          await Currency.bulkCreate(currencySchema, { updateOnDuplicate: ['alias', 'name', 'status', 'lname', 'stamp'] }).then(() => {
            console.log('Currency successfully');
          });
        }
      } while (currencySchema.length >= 500);
      // hotelsalepr
      let hotelsaleprSchema = [];
      do {
        stamp = '';
        stamp = await Hotelsalepr.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const hotelsalepr = await syncApi().callApi('hotelsalepr', stamp, currentStampdata, tokenUsed);
        hotelsaleprSchema = [];
        console.log(hotelsalepr.hprice.length);
        if (hotelsalepr.hprice) {
          hotelsalepr.hprice.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.hotelid = parseInt(element.$.hotel, 10) || null;
            element.$.roomid = parseInt(element.$.room, 10) || null;
            element.$.htplaceid = parseInt(element.$.htplace, 10) || null;
            element.$.mealid = parseInt(element.$.meal, 10) || null;
            element.$.nights = parseInt(element.$.nights, 10) || null;
            element.$.sposid = parseInt(element.$.spos, 10) || null;
            element.$.spotype = parseInt(element.$.spotype, 10) || null;
            element.$.sposubtype = parseInt(element.$.sposubtype, 10) || null;
            element.$.rroom = parseInt(element.$.rroom, 10) || null;
            element.$.rhtplace = parseInt(element.$.rhtplace, 10) || null;
            element.$.rmeal = parseInt(element.$.rmeal, 10) || null;
            element.$.rnights = parseInt(element.$.rnights, 10) || null;
            element.$.price = parseFloat(element.$.price) || null;
            element.$.currencyid = parseInt(element.$.currency, 10) || null;
            element.$.discount = parseFloat(element.$.discount) || null;
            element.$.discountmoney = parseFloat(element.$.discountmoney) || null;
            element.$.useascheckin = parseInt(element.$.useascheckin, 10) || null;
            element.$.rqdaysfrom = parseInt(element.$.rqdaysfrom, 10) || null;
            element.$.rqdaysstill = parseInt(element.$.rqdaysstill, 10) || null;
            element.$.nightsfrom = parseInt(element.$.nightsfrom, 10) || null;
            element.$.nightstill = parseInt(element.$.nightstill, 10) || null;
            element.$.oncheckin = parseInt(element.$.oncheckin, 10) || null;
            element.$.adult = parseFloat(element.$.adult) || null;
            element.$.child = parseFloat(element.$.child) || null;
            element.$.nobedchild = parseFloat(element.$.nobedchild) || null;
            element.$.suptotal = parseFloat(element.$.suptotal) || null;
            element.$.rnights_from = parseInt(element.$.rnights_from, 10) || null;
            element.$.rnights_till = parseInt(element.$.rnights_till, 10) || null;
            element.$.rnights_free = parseInt(element.$.rnights_free, 10) || null;
            element.$.status = element.$.status.trim();
            if (element.$.rnights_form != null) {
              console.log(element);
            }
            hotelsaleprSchema.push(element.$);
          });
          await Hotelsalepr.bulkCreate(hotelsaleprSchema, { updateOnDuplicate: ['useascheckin', 'discountmoney', 'discount', 'dateouttill', 'dateintill', 'dateoutfrom', 'dateinfrom', 'currencyid', 'rroom', 'sposubtype', 'spotype', 'sposid', 'nights', 'rqdateend', 'rqdatebeg', 'dateend', 'datebeg', 'mealid', 'htplaceid', 'roomid', 'hotelid', 'stamp', 'status', 'adult', 'child', 'nobedchild', 'suptotal', 'days', 'rnights_form', 'rnights_till', 'rnights_free', 'rqdaysfrom', 'rqdaysstill', 'nightsfrom', 'nightstill', 'oncheckin', 'price', 'rnights', 'rmeal', 'rhtplace'] }).then(() => {
            console.log('Hotelsalepr successfully');
          });
        }
      } while (hotelsaleprSchema.length >= 500);
      // servicesalepr
      let servicesaleprSchema = [];
      do {
        stamp = '';
        stamp = await Servicesalepr.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const servicesalepr = await syncApi().callApi('servicesalepr', stamp, currentStampdata, tokenUsed);
        servicesaleprSchema = [];
        // console.log(servicesalepr);
        if (servicesalepr.sprice) {
          servicesalepr.sprice.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.hotelid = parseInt(element.$.hotel, 10) || null;
            element.$.serviceid = parseInt(element.$.service, 10) || null;
            element.$.grouphotelid = parseInt(element.$.grouphotel, 10) || null;
            element.$.townfromid = parseInt(element.$.townfrom, 10) || null;
            element.$.towntoid = parseInt(element.$.townto, 10) || null;
            element.$.paxfrom = parseInt(element.$.paxfrom, 10) || null;
            element.$.paxtill = parseInt(element.$.paxtill, 10) || null;
            element.$.nights = parseInt(element.$.nights, 10) || null;
            element.$.pernight = parseInt(element.$.pernight, 10) || null;
            element.$.price = parseFloat(element.$.price) || null;
            element.$.adultpr = parseFloat(element.$.adultpr) || null;
            element.$.child1pr = parseFloat(element.$.child1pr) || null;
            element.$.age1min = parseFloat(element.$.age1min) || null;
            element.$.age1max = parseFloat(element.$.age1max) || null;
            element.$.child2pr = parseFloat(element.$.child2pr) || null;
            element.$.age2min = parseFloat(element.$.age2min) || null;
            element.$.age2max = parseFloat(element.$.age2max) || null;
            element.$.currencyid = parseInt(element.$.currency, 10) || null;
            element.$.spotype = parseInt(element.$.spotype, 10) || null;
            element.$.status = element.$.status.trim();
            servicesaleprSchema.push(element.$);
          });
          await Servicesalepr.bulkCreate(servicesaleprSchema, { updateOnDuplicate: ['hotelid', 'status', 'stamp', 'serviceid', 'grouphotelid', 'townfromid', 'towntoid', 'datebeg', 'dateend', 'paxfrom', 'paxtill', 'nights', 'pernight', 'price', 'adultpr', 'child1pr', 'age1min', 'age1max', 'child2pr', 'age2min', 'age2max', 'currencyid', 'rdatebeg', 'rdateend', 'spotype'] }).then(() => {
            console.log('Servicesalepr successfully');
          });
        }
      } while (servicesaleprSchema.length >= 500);

      // reserve
      let reserveSchema = [];
      do {
        stamp = '';
        stamp = await Reserve.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const reserve = await syncApi().callApi('reserve', stamp, currentStampdata, tokenUsed);
        reserveSchema = [];
        // console.log(reserve);
        if (reserve.reserve) {
          reserve.reserve.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.hotelid = parseInt(element.$.hotel, 10) || null;
            element.$.roomid = parseInt(element.$.room, 10) || null;
            element.$.rcount = parseInt(element.$.rcount, 10) || null;
            element.$.alloctype = parseInt(element.$.alloctype, 10) || null;
            element.$.commitmentpart = parseInt(element.$.commitmentpart, 10) || null;
            element.$.releasedays = parseInt(element.$.releasedays, 10) || null;
            element.$.status = element.$.status.trim();
            reserveSchema.push(element.$);
          });
          await Reserve.bulkCreate(reserveSchema, { updateOnDuplicate: ['datebeg', 'stamp', 'releasedays', 'commitmentpart', 'alloctype', 'rcount', 'status', 'hotelid', 'roomid', 'dateend'] }).then(() => {
            console.log('Reserve successfully');
          });
        }
      } while (reserveSchema.length >= 500);
      // alloctype
      let alloctypeSchema = [];
      do {
        stamp = '';
        stamp = await Alloctype.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const alloctype = await syncApi().callApi('alloctype', stamp, currentStampdata, tokenUsed);
        alloctypeSchema = [];
        // console.log(alloctype);
        if (alloctype.alloctype) {
          alloctype.alloctype.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.stopsale = parseInt(element.$.stopsale, 10) || null;
            element.$.release = parseInt(element.$.release, 10) || null;
            element.$.autoconfirm = parseInt(element.$.autoconfirm, 10) || null;
            element.$.resorder = parseInt(element.$.resorder, 10) || null;
            element.$.status = element.$.status.trim();
            alloctypeSchema.push(element.$);
          });
          await Alloctype.bulkCreate(alloctypeSchema, { updateOnDuplicate: ['status', 'lname', 'stamp', 'stopsale', 'resorder', 'autoconfirm', 'release', 'name'] }).then(() => {
            console.log('alloctype successfully');
          });
        }
      } while (alloctypeSchema.length >= 500);
      // sposcombine
      let sposcombineSchema = [];
      do {
        stamp = '';
        stamp = await Sposcombine.max('stamp', { where: { status: { [Op.or]: ['', ' ', null] } } });
        if (stamp === null || stamp === 0) {
          stamp = '0x0000000000000000';
        }
        const sposcombine = await syncApi().callApi('sposcombine', stamp, currentStampdata, tokenUsed);
        sposcombineSchema = [];
        // console.log(sposcombine);
        if (sposcombine.sposcombine) {
          sposcombine.sposcombine.forEach((element) => {
            element.$.inc = parseInt(element.$.inc, 10);
            element.$.spos1 = parseInt(element.$.spos1, 10) || null;
            element.$.spos2 = parseInt(element.$.spos2, 10) || null;
            element.$.mixed = parseInt(element.$.mixed, 10) || null;
            element.$.status = element.$.status.trim();
            sposcombineSchema.push(element.$);
          });
          Sposcombine.bulkCreate(sposcombineSchema, { updateOnDuplicate: ['mixed', 'status', 'spos1', 'spos2', 'stamp'] }).then(() => {
            console.log('Sposcombine successfully');
          });
        }
      } while (sposcombineSchema.length >= 500);
      // }
      console.log('Success Complete=========================================');
      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        msg: 'Internal server error',
      });
    }
  };
  return {
    register,
  };
};

module.exports = StateController;
