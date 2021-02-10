const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// create Schema and model

const codepromoSchema = new Schema({

    code: {
        type: String,
        required: true,
        unique: true,

    },
    codestatus: {

        type: Boolean,
        required: true,

    },
    redu:{
        type:Number,
        required: true,
        
    }

});

const codepromo = mongoose.model(" codepromo", codepromoSchema);
module.exports = codepromo;