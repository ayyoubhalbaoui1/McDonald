const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create Schema and model

const subcategorySchema = new Schema({
  id_category: {
    type: String,
    ref: "category",
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  subcategoryName: {
    type: String,
    required: true,
  },
});

const subcategory = mongoose.model("subcategory", subcategorySchema);
module.exports = subcategory;
