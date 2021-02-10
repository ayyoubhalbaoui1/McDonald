const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// create Schema and model  

const ingredientSchema = new Schema({

    ingredientName: {
        type: String,
        required: true,
        minlenght: 45,
        unique: true,

    },

});

const ingredient = mongoose.model("ingredient", ingredientSchema);
module.exports = ingredient;