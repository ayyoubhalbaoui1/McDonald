const router = require("express").Router();
const promo_code = require("../models/promo_code");

//get Code promo
router.route("/").get((req, res) => {
    promo_code
        .find()
        .then((promo_code) => res.json(promo_code))
        .catch((err) => res.status(400).json("Error :" + err));
});

//add Code promo
router.route("/add").post((req, res) => {
    const code = req.body.code;
    const codeStatus = req.body.codeStatus;
    const newPromoCode = new promo_code({
        code,
        codeStatus,
    });

    newPromoCode
        .save()
        .then(() => res.json("promo code successfully added"))
        .catch((err) => res.status(400).json("Error :" + err));
});

// get 1 Code promo
router.route("/:id").get((req, res) => {
    promo_code
        .findById(req.params.id)
        .then((promo_code) => res.json(promo_code))
        .catch((err) => res.status(400).json("Error :" + err));
});

//delete Code promo
router.route("/delete/:id").delete((req, res) => {
    promo_code
        .findByIdAndDelete(req.params.id)
        .then(() => res.json("prome code successfully deleted"))
        .catch((err) => res.status(400).json("Error :" + err));
});

//Code promo
router.route("/update/:id").put((req, res) => {
    promo_code
        .findById(req.params.id)
        .then((promoCode) => {
            promoCode.code = req.body.code;
            promoCode.codeStatus = req.body.codeStatus;

            promoCode
                .save()
                .then(() => res.json("promo code successfully updated"))
                .catch((err) => res.status(400).json("Error :" + err));
        })
        .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;