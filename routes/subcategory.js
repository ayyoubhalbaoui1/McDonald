const router = require("express").Router();
const subcategory = require("../models/subcategory");
let Subcategory = require("../models/subcategory");

//getting all subcategories
router.route("/").get((req, res) => {
  Subcategory.find()
    .then((subcategories) => res.json(subcategories))
    .catch((err) => res.status(400).json("Error :" + err));
});

//adding new subcategory
router.route("/add").post((req, res) => {
  const subcategoryName = req.body.subcategoryName;
  const img = req.body.img;
  const id_category = req.body.id_category;

  const newSubcategory = new Subcategory({
    subcategoryName,
    img,
    id_category,
  });

  newSubcategory
    .save()
    .then(() => res.json("subcategory successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
});

//search subCategory By category id

router.get("/findsubCatByCatId/:id_category", async (req, res) => {
  try {
    const subcategories = await subcategory
      .find({})
      .where("id_category")
      .equals(req.params.id_category);
    res.send(subcategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// getting one subcategory

router.route("/:id").get((req, res) => {
  subcategory
    .findById(req.params.id)
    .then((subcategory) => res.json(subcategory))
    .catch((err) => res.status(400).json("Error :" + err));
});

//deleting one subcategory

router.route("/delete/:id").delete((req, res) => {
  Subcategory.findByIdAndDelete(req.params.id)
    .then(() => res.json("subcategory successfully delted"))
    .catch((err) => res.status(400).json("Error :" + err));
});

//updating one subcategory

router.route("/update/:id").put((req, res) => {
  Category.findById(req.params.id)
    .then((subcat) => {
      subcat.subcategoryname = req.body.subcategoryname;
      subcat.id_category = req.body.id_category;
      subcat.img = req.body.img;

      subcat
        .save()
        .then(() => res.json("subcat successfully updated"))
        .catch((err) => res.status(400).json("Error :" + err));
    })
    .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;
