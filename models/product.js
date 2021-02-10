const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create Schema and model

const productSchema = new Schema({
  id_subcategory: {
    type: String,
    ref: "subcategory",
    required: true,
  },

  id_ingredient: {
    type: String,
    ref: "ingrediant",
  },

  productName: {
    type: String,
    required: true,
  },

  productPrice: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

const product = mongoose.model("product", productSchema);
module.exports = product;
