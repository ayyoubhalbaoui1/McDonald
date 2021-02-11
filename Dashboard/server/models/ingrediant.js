const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ingrediantSchema = new Schema({
  ingrediant: {
    type: String,
    required: true,
  },
});

const ingrediant = mongoose.model(" ingrediant", ingrediantSchema);
module.exports = ingrediant;
