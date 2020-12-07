
const channelSchemas = {
  saveChannel: {
    validator: {
      'channelName': 'required|string',
      "contactName": "required|string",
      "apiInfo": "required|string",
      "contactEmail": "email",
      "contactSkypeId": "required|string",
      "contactPhoneNumber": "required|string"
    }
  },


}

module.exports = channelSchemas;
