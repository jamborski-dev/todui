const mongoose = require("mongoose")

const stepListSchema = new mongoose.Schema({
  label: String,
  step_no: Number,
  is_done: { type: Boolean, default: false }
})

const schema = mongoose.Schema(
  {
    title: { type: String, required: true },
    is_done: Boolean,
    is_important: Boolean,
    notes: String,
    reminder: Date,
    step_list: [stepListSchema]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Todo", schema)
