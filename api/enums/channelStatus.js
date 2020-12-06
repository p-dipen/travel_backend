
const ChannelStatus = Object.freeze({
  "integrateRequest": 0,
  "integrated": 1,
  "deleteRequest": 2,
})

const ChannelStatusTitle = Object.freeze({
  "integrateRequest": "Integration Requested",
  "integrated": "Integration Done",
  "deleteRequest": "Deletion Requested",
})

module.exports = {
  ChannelStatus,
  ChannelStatusTitle
}
