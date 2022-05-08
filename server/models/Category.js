const mongoose = require("mongoose")

const schema = mongoose.Schema({
  label: { type: String, required: true },
  color: { type: String, default: "#505f79" }
})

module.exports = mongoose.model("Category", schema)
