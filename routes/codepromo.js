const router = require("express").Router();
const codepromo = require("../models/codepromo");
let Codepromo = require("../models/codepromo");

//getting all codepromos

router.route("/").get((req, res) => {

    Codepromo.find()
        .then((codepromos) => res.json(codepromos))
        .catch((err) => res.status(400).json("Error :" + err));
});

//adding new codepromo

router.route("/add").post((req, res) => {
    const code = req.body.code;
    const codestatus = req.body.codestatus;

    const newCodepromo = new Codepromo({
        code,
        codestatus
    });

    newCodepromo
        .save()
        .then(() => res.json("codepromo successfully added"))
        .catch((err) => res.status(400).json("Error :" + err));
});



// getting one codepromo

router.route("/:id").get((req, res) => {
    codepromo.findById(req.params.id)
        .then((codepromo) => res.json(codepromo))
        .catch((err) => res.status(400).json("Error :" + err));
});

//deletting one codepromo

router.route("/delete/:id").delete((req, res) => {
    Codepromo.findByIdAndDelete(req.params.id)
        .then(() => res.json("codepromo successfully delted"))
        .catch((err) => res.status(400).json("Error :" + err));
});

//updating one codepromo

router.route("/update/:id").put((req, res) => {

    Codepromo.findById(req.params.id)
        .then((cod) => {
            cod.code = req.body.code;
            cod.codestatus = req.body.codestatus;

            cod
                .save()
                .then(() => res.json("codepromo successfully updated"))
                .catch((err) => res.status(400).json("Error :" + err));
        })
        .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;