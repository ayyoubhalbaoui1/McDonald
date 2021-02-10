const router = require("express").Router();
const product = require("../models/product");
let Product = require("../models/product");

//getting all products

router.route("/").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error :" + err));
});

//adding new product*

router.route("/add").post((req, res) => {
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;
  const id_subcategory = req.body.id_subcategory;
  const id_ingredient = req.body.id_ingredient;
  const img = req.body.img;
  const newProduct = new Product({
    productName,
    productPrice,
    id_subcategory,
    id_ingredient,
    img,
  });

  newProduct
    .save()
    .then(() => res.json("product successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
});

// getting one product

router.route("/:id").get((req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error :" + err));
});

//deletting one product
router.route("/delete/:id").delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json("product successfully delted"))
    .catch((err) => res.status(400).json("Error :" + err));
});

// find product by subcat id
router.get("/findProdBySubId/:id_subcategory", async (req, res) => {
  try {
    const resultProduct = await Product.find({})
      .where("id_subcategory")
      .equals(req.params.id_subcategory);
    res.send(resultProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//updating one product

router.route("/update/:id").put((req, res) => {
  Product.findById(req.params.id)
    .then((pro) => {
      pro.productName = req.body.productName;
      pro.productPrice = req.body.productPrice;
      pro.id_subcategory = req.body.id_subcategory;
      pro.id_ingredient = req.body.id_ingredient;
      pro.img = req.body.img;

      pro
        .save()
        .then(() => res.json("product successfully updated"))
        .catch((err) => res.status(400).json("Error :" + err));
    })
    .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;
