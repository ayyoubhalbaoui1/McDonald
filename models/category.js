const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create Schema and model

const categorySchema = new Schema({
  categoryname: {
    type: String,
    required: true,
    minlenght: 45,
    unique: true,
  },

  img: {
    type: String,
    required: true,
  },
});

const category = mongoose.model(" category", categorySchema);
module.exports = category;
