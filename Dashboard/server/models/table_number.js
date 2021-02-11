const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const table_numberSchema = new Schema({
    table_number: {
        type: Number,
        required: true,
    },
    tableStatus: {
        type: Boolean,
        required: true,
    },
});

const table_number = mongoose.model("table_number", table_numberSchema);
module.exports = table_number;