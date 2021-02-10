const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema({
  productid: {
    type: String,
    reference: "produits",
  },

  price: {
    type: String,
    required: true,
  },

  quantite: {
    type: Number,
    required: true,
  },

  tableserv: {
    type: String,
    reference: "servicetables",
  },

  promocode: {
    type: String,
    reference: "codepromos",
  },

  cardfidele: {
    type: String,
    reference: "cardfideles",
  },
  way: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("commande", commandeSchema);
