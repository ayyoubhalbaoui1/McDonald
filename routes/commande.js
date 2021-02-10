const express = require("express");
const router = express.Router();
const commande = require("../models/commande");

//all products
router.get("/", async (req, res) => {
  try {
    const commandes = await commande.find();
    res.json(commandes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//one product
router.get("/:id", getcommande, (req, res) => {
  res.json(res.commandes);
});
//creating product
router.post("/", async (req, res) => {
  const commandes = new commande({
    productid: req.body.productid,
    price: req.body.price,
    quantite: req.body.quantite,
    tableserv: req.body.tableserv,
    promocode: req.body.promocode,
    cardfidele: req.body.cardfidele,
    way: req.body.way,
  });
  try {
    const newcommande = await commandes.save();
    res.status(201).json(newcommande);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//updating product
router.patch("/:id", getcommande, async (req, res) => {
  if (req.body.productid != null) {
    res.produits.productid = req.body.productid;
  }

  if (req.body.price != null) {
    res.produits.price = req.body.price;
  }

  if (req.body.quantite != null) {
    res.produits.quantite = req.body.quantite;
  }

  if (req.body.tableserv != null) {
    res.produits.tableserv = req.body.tableserv;
  }

  if (req.body.promocode != null) {
    res.produits.promocode = req.body.promocode;
  }
  if (req.body.cardfidele != null) {
    res.produits.cardfidele = req.body.cardfidele;
  }
  if (req.body.way != null) {
    res.produits.way = req.body.way;
  }
  try {
    const updatedcommande = await res.commandes.save();
    res.json(updatedcommande);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Deleting product
router.delete("/:id", getcommande, async (req, res) => {
  try {
    await res.commandes.remove();
    res.json({ message: "Deleted Succesfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getcommande(req, res, next) {
  let commandes;

  try {
    commandes = await commande.findById(req.params.id);
    if (commandes == null) {
      return res.status(404).json({ message: "Cannot find category" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.commandes = commandes;
  next();
}

module.exports = router;
