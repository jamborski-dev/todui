const mongoose = require("mongoose")

const schema = mongoose.Schema({
  content: { type: String, required: true },
  is_seen: { type: Boolean, default: false }
})

module.exports = mongoose.model("Notification", schema)
