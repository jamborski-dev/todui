const mongoose = require("mongoose")

const schema = mongoose.Schema({
  content: { type: String, required: true },
  seenStatus: { type: Boolean, default: false }
})

module.exports = mongoose.model("Notification", schema)
