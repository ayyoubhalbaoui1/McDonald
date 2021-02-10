const express = require("express");
const router = express.Router();
const cardfidele = require("../models/cardfidele");
const logs = require("../models/logs");
const log = require("../logs/logStore");
// const { saveLog, logging } = require("../logs/logStoreFile");
//all
router.get("/", async (req, res) => {
  try {
    const cardfideles = await cardfidele.find();
    res.json(cardfideles);
    log(
      {
        file: "crardfile.js",
        line: "11",
        info: "get all cards",
        type: "INFO",
      },
      logs
    );
    res.sendStatus(500);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//one promocode
router.get("/:id", getcardfidele, (req, res) => {
  res.json(res.cardfideles);
});
//creating product
router.post("/", async (req, res) => {
  const cardfideles = new cardfidele({
    pin: req.body.pin,
    points: req.body.points,
  });
  try {
    const newcardfidele = await cardfideles.save();
    res.status(201).json(newcardfidele);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//updating promocode
router.put("/:id", getcardfidele, async (req, res) => {
  cardfidele
    .findById(req.params.id)
    .then((serv) => {
      serv.pin = req.body.pin;
      serv.points = req.body.points;

      serv
        .save()
        .then(() => {
          res.json("servicetable successfully updated");
        })
        .catch((err) => {
          res.status(400).json("Error :" + err);
        });
    })
    .catch((err) => res.status(400).json("Error :" + err));
});
//Deleting product
router.delete("/:id", getcardfidele, async (req, res) => {
  try {
    await res.cardfideles.remove();
    res.json({ message: "Deleted Succesfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getcardfidele(req, res, next) {
  let cardfideles;

  try {
    cardfideles = await cardfidele.findById(req.params.id);
    if (cardfideles == null) {
      return res.status(404).json({ message: "Cannot find category" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.cardfideles = cardfideles;
  next();
}

module.exports = router;
