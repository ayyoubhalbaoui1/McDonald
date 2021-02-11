const router = require("express").Router();
const product = require("../models/product");

//get pro
router.route("/").get((req, res) => {
    product
        .find()
        .then((product) => res.json(product))
        .catch((err) => res.status(400).json("Error :" + err));
});

//add pro
router.route("/add").post((req, res) => {
    const id_sub_category = req.body.id_sub_category;
    const id_ingrediant = req.body.id_ingrediant;
    const productName = req.body.productName;
    const productPrice = req.body.productPrice;
    const newProduct = new product({
        id_sub_category,
        id_ingrediant,
        productName,
        productPrice,
    });

    newProduct
        .save()
        .then(() => res.json("product successfully added"))
        .catch((err) => res.status(400).json("Error :" + err));
});

// get 1 pro
router.route("/:id").get((req, res) => {
    product
        .findById(req.params.id)
        .then((product) => res.json(product))
        .catch((err) => res.status(400).json("Error :" + err));
});

//delete pro
router.route("/delete/:id").delete((req, res) => {
    product
        .findByIdAndDelete(req.params.id)
        .then(() => res.json("product successfully deleted"))
        .catch((err) => res.status(400).json("Error :" + err));
});

//update pro
router.route("/update/:id").put((req, res) => {
    product
        .findById(req.params.id)
        .then((product) => {
            product.id_sub_category = req.body.id_sub_category;
            product.id_ingrediant = req.body.id_ingrediant;
            product.productName = req.body.productName;
            product.productPrice = req.body.productPrice;

            product
                .save()
                .then(() => res.json("product successfully updated"))
                .catch((err) => res.status(400).json("Error :" + err));
        })
        .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;