const mongoose = require("mongoose");

const cardfideleSchema = new mongoose.Schema({
  pin: {
    type: String,
    required: true,
  },

  points: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("cardfidele", cardfideleSchema);
