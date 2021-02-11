const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sub_categorySchema = new Schema({
  id_category: {
    type: String,
    ref: "category",
    required: true,
  },
  sub_categoryName: {
    type: String,
    required: true,
  },
});

const sub_category = mongoose.model("sub_category", sub_categorySchema);
module.exports = sub_category;



