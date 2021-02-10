const router = require("express").Router();
const servicetable = require("../models/servicetable");
let Servicetable = require("../models/servicetable");

//getting all servicetables

router.route("/").get((req, res) => {
  Servicetable.find()
    .then((servicetables) => res.json(servicetables))
    .catch((err) => res.status(400).json("Error :" + err));
});

//adding new servicetable

router.route("/add").post((req, res) => {
  const tablenumber = req.body.tablenumber;
  const servicetablestatus = req.body.servicetablestatus;

  const newServicetable = new Servicetable({
    tablenumber,
    servicetablestatus,
  });

  newServicetable
    .save()
    .then(() => res.json("Servicetable successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
});

// getting one Servicetable

router.route("/:id").get((req, res) => {
  servicetable
    .findById(req.params.id)
    .then((servicetable) => res.json(servicetable))
    .catch((err) => res.status(400).json("Error :" + err));
});

//deletting one servicetable

router.route("/delete/:id").delete((req, res) => {
  Servicetable.findByIdAndDelete(req.params.id)
    .then(() => res.json("servicetable successfully delted"))
    .catch((err) => res.status(400).json("Error :" + err));
});

//updating one servicetable

router.route("/update/:id").patch((req, res) => {
  Servicetable.findById(req.params.id)
    .then((serv) => {
      serv.servicetablestatus = req.body.servicetablestatus;

      serv
        .save()
        .then(() => res.json("servicetable successfully updated"))
        .catch((err) => res.status(400).json("Error :" + err));
    })
    .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;
