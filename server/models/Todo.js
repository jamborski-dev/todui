const mongoose = require("mongoose")

const stepListSchema = new mongoose.Schema({
  label: String,
  step_no: Number,
  is_done: { type: Boolean, default: false }
})

const schema = mongoose.Schema(
  {
    title: { type: String, required: true },
    is_done: { type: Boolean, default: false },
    is_important: { type: Boolean, default: false },
    notes: String,
    reminder: Date,
    step_list: [stepListSchema],
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Todo", schema)
