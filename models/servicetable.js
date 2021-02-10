const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// create Schema and servicetable  

const servicetableSchema = new Schema({

    tablenumber: {
        type: Number,
        required: true,
        unique: true,

    },

    servicetablestatus: {

        type: Boolean,
        required: true,

    },

});

const servicetable = mongoose.model(" servicetable", servicetableSchema);
module.exports = servicetable;