const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const { v4: uuidV4 } = require("uuid");
const Channels = require("../models/HotelAdmin/Channel");
const schema = require('../schemas/Channel');
const crudService = require('../services/crud.service');
const channelStatus = require('../enums/channelStatus');

const getFileExtension = (filename) => {
  const a = filename.split(".");
  if (a.length === 1 || (a[0] === "" && a.length === 2)) {
    return "";
  }
  return `.${a.pop()}`;
};

const Channel = () => {
  // const createChannel = async (request, response) => {
  //   const form = formidable({ multiples: true });
  //   const fileId = uuidV4();
  //   let fileLocation = "";
  //   let body = {};
  //   form.parse(request, (err, fields, files) => {
  //     if (err) {
  //       return response.status(500).send();
  //     }
  //     const fileInfos = Object.entries(files);
  //     // Allow only one file in a request (API Documentation)
  //     if (fileInfos.length !== 1) {
  //       return response.status(400).send();
  //     }
  //     fileInfos.forEach(([, file]) => {
  //       fileLocation = `uploads/${fileId}${getFileExtension(file.name)}`;
  //       const readStream = fs.createReadStream(file.path);
  //       const writeStream = fs.createWriteStream(
  //         path.join(__dirname, "../public/") + fileLocation
  //       );
  //       readStream.pipe(writeStream);
  //     });

  //     body = { ...fields };
  //     return Channels.create({
  //       ...body,
  //       apiDocLink: fileLocation,
  //     })
  //       .then((channel) => {
  //         response.status(200).send(channel);
  //       })
  //       .catch(() => response.status(500).send());
  //   });
  // };



  const createChannel = (req, res) => {

    console.log('[Create Channel called]', req.body);
    crudService.validate(req.body, schema.saveChannel).then(async (reqData) => {
      try {
        console.log('[data Validated]');
        let response = {};
        reqData.status = channelStatus.ChannelStatus.integrateRequest;
        let dbResponse = await crudService.insert(Channels, reqData);
        return res.status(200).json({
          code: 2000,
          success: true,
          message: `${dbResponse.channelName} channel integration request sent successfully.`,
          data: response || {}
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          code: 5000,
          message: 'Internal server error',
          error: error,
        });
      }
    }).catch(err => {
      return res.status(200).json({
        code: 4002,
        success: false,
        message: 'Validation Failed',
        error: err,
      });
    });

  };
  const getChannel = async (request, response) => {
    try {
      const { id } = request.params;
      const channel = await Channels.findOne({
        where: { id, isDeleted: false },
      });
      if (channel) {
        return response.status(200).send(channel.toJSON());
      }
      return response.status(404).send();
    } catch (e) {
      return response.status(500).send();
    }
  };
  // const editChannel = async (request, response) => {
  //   try {
  //     const { id } = request.params;
  //     const channel = await Channels.findOne({
  //       where: { id, isDeleted: false },
  //     });
  //     if (channel) {
  //       const form = formidable({ multiples: true });
  //       const newFileId = uuidV4();
  //       let fileLocation = channel.apiDocLink;
  //       return form.parse(request, (err, fields, files) => {
  //         if (err) {
  //           return response.status(500).send();
  //         }
  //         const fileInfos = Object.entries(files);
  //         // Allow only one file in a request (API Documentation)
  //         if (fileInfos.length > 1) {
  //           return response.status(400).send();
  //         }

  //         // If file is present, update its path
  //         if (fileInfos.length === 1) {
  //           fileInfos.forEach(([, file]) => {
  //             fileLocation = `uploads/${newFileId}${getFileExtension(
  //               file.name
  //             )}`;
  //             const readStream = fs.createReadStream(file.path);
  //             const writeStream = fs.createWriteStream(
  //               path.join(__dirname, "../public/") + fileLocation
  //             );
  //             readStream.pipe(writeStream);
  //           });
  //         }

  //         // Update the fields
  //         Object.entries(fields).forEach(([key, value]) => {
  //           if (channel[key]) {
  //             channel[key] = value;
  //           }
  //         });

  //         channel.apiDocLink = fileLocation;
  //         return channel
  //           .save()
  //           .then((c) => response.json(c))

  //           .catch(() => response.status(500).send());
  //       });
  //     }
  //     return response.status(404).send();
  //   } catch (e) {
  //     return response.status(500).send();
  //   }
  // };

  const editChannel = (req, res) => {

    console.log('[edit Channel called]', req.body);
    crudService.validate(req.body, schema.saveChannel).then(async (reqData) => {
      try {
        console.log('[data Validated]');
        await crudService.update(Channels, { id: req.params.id }, reqData);
        return res.status(200).json({
          code: 2000,
          success: true,
          message: `${reqData.channelName} channel info updated successfully.`,
          data: reqData || {}
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          code: 5000,
          message: 'Internal server error',
          error: error,
        });
      }
    }).catch(err => {
      return res.status(200).json({
        code: 4002,
        success: false,
        message: 'Validation Failed',
        error: err,
      });
    });

  };

  const deleteChannel = async (request, response) => {
    try {
      const { id } = request.params;
      const channel = await Channels.findOne({
        where: { id, isDeleted: false },
      });
      if (channel) {
        channel.status = channelStatus.ChannelStatus.deleteRequest;

        await channel.save();

        let res = await crudService.getOne(Channels, {
          where: { id, isDeleted: false },
          distinct: true,
        });

        res.statusTitle = channelStatus.ChannelStatusTitle.deleteRequest;
        console.log('[res]', res);
        return response.status(200).json({
          code: 2000,
          success: true,
          message: `Delete request sent.`,
          data: res
        });
      }
      return response.status(404).send();
    } catch (e) {
      return response.status(500).send();
    }
  };

  const getAllChannels = async (req, res) => {
    try {
      let response = await crudService.get(Channels, {
        where: { isDeleted: false },
        distinct: true,
      });

      response.map((item) => {
        switch (item.status) {
          case channelStatus.ChannelStatus.integrateRequest:
            item.statusTitle = channelStatus.ChannelStatusTitle.integrateRequest;
            break;

          case channelStatus.ChannelStatus.integrated:
            item.statusTitle = channelStatus.ChannelStatusTitle.integrated;
            break;

          case channelStatus.ChannelStatus.deleteRequest:
            item.statusTitle = channelStatus.ChannelStatusTitle.deleteRequest;
            break;
        }
      })

      console.log('[response]', response);

      return res.status(200).json({
        code: 2000,
        success: true,
        message: `${response.length} matching record(s) found for channels.`,
        data: response || []
      });
    } catch (error) {
      return res.status(500).json({
        code: 5000,
        message: 'Internal server error',
        error: error,
      });
    }
  };


  return {
    createChannel,
    getChannel,
    editChannel,
    deleteChannel,
    getAllChannels,
  };
};

module.exports = Channel;
