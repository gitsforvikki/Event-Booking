const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  name: { type: String, require: true },
  image: { type: String, require: true },
  date: { type: String, require: true },
  type: { type: String, require: true },
  price: { type: Number, require: true },
  info: { type: String, require: true },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", EventSchema);
