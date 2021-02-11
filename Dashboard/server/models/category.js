const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    minlenght: 45,
  },
});

const category = mongoose.model("category", categorySchema);
module.exports = category;
