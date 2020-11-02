const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const { v4: uuidV4 } = require("uuid");
const Channels = require("../models/HotelAdmin/Channel");

const getFileExtension = (filename) => {
  const a = filename.split(".");
  if (a.length === 1 || (a[0] === "" && a.length === 2)) {
    return "";
  }
  return `.${a.pop()}`;
};

const Channel = () => {
  const createChannel = async (request, response) => {
    const form = formidable({ multiples: true });
    const fileId = uuidV4();
    let fileLocation = "";
    let body = {};
    form.parse(request, (err, fields, files) => {
      if (err) {
        return response.status(500).send();
      }
      const fileInfos = Object.entries(files);
      // Allow only one file in a request (API Documentation)
      if (fileInfos.length !== 1) {
        return response.status(400).send();
      }
      fileInfos.forEach(([, file]) => {
        fileLocation = `uploads/${fileId}${getFileExtension(file.name)}`;
        const readStream = fs.createReadStream(file.path);
        const writeStream = fs.createWriteStream(
          path.join(__dirname, "../public/") + fileLocation
        );
        readStream.pipe(writeStream);
      });

      body = { ...fields };
      return Channels.create({
        ...body,
        apiDocLink: fileLocation,
      })
        .then((channel) => {
          response.status(200).send(channel);
        })
        .catch(() => response.status(500).send());
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
  const editChannel = async (request, response) => {
    try {
      const { id } = request.params;
      const channel = await Channels.findOne({
        where: { id, isDeleted: false },
      });
      if (channel) {
        const form = formidable({ multiples: true });
        const newFileId = uuidV4();
        let fileLocation = channel.apiDocLink;
        return form.parse(request, (err, fields, files) => {
          if (err) {
            return response.status(500).send();
          }
          const fileInfos = Object.entries(files);
          // Allow only one file in a request (API Documentation)
          if (fileInfos.length > 1) {
            return response.status(400).send();
          }

          // If file is present, update its path
          if (fileInfos.length === 1) {
            fileInfos.forEach(([, file]) => {
              fileLocation = `uploads/${newFileId}${getFileExtension(
                file.name
              )}`;
              const readStream = fs.createReadStream(file.path);
              const writeStream = fs.createWriteStream(
                path.join(__dirname, "../public/") + fileLocation
              );
              readStream.pipe(writeStream);
            });
          }

          // Update the fields
          Object.entries(fields).forEach(([key, value]) => {
            if (channel[key]) {
              channel[key] = value;
            }
          });

          channel.apiDocLink = fileLocation;
          return channel
            .save()
            .then((c) => response.json(c))

            .catch(() => response.status(500).send());
        });
      }
      return response.status(404).send();
    } catch (e) {
      return response.status(500).send();
    }
  };

  const deleteChannel = async (request, response) => {
    try {
      const { id } = request.params;
      const channel = await Channels.findOne({
        where: { id, isDeleted: false },
      });
      if (channel) {
        channel.isDeleted = true;
        await channel.save();
        return response.status(200).send();
      }
      return response.status(404).send();
    } catch (e) {
      return response.status(500).send();
    }
  };
  const getAllChannels = async (request, response) => {
    try {
      const channels = (
        await Channels.findAll({
          where: {
            isDeleted: false,
          },
        })
      ).map((channel) => channel.toJSON());
      return response.status(200).send(channels);
    } catch (e) {
      return response.status(500).send();
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
