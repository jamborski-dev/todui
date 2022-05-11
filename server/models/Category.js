const mongoose = require("mongoose")

const schema = mongoose.Schema(
  {
    label: { type: String, required: true },
    color: { type: String, default: "#505f79" }
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
)

schema.virtual("count", {
  ref: "Todo",
  localField: "_id",
  foreignField: "category_id",
  count: true
})

module.exports = mongoose.model("Category", schema)
