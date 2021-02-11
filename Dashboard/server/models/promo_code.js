const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const promo_codeSchema = new Schema({
  code: {
    type: Number,
    required: true,
    unique: true,
  },
  codeStatus: {
    type: Boolean,
    required: true,
  },
});

const promo_code = mongoose.model("promo_code", promo_codeSchema);
module.exports = promo_code;
