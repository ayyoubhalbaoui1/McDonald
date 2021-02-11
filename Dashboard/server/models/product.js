const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  id_sub_category: {
    type: String,
    ref: 'sub_category',
    required: true,
  },
  id_ingrediant: {
    type: String,
    ref:'ingrediant',
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
});

const product = mongoose.model("product", productSchema);
module.exports = product;
