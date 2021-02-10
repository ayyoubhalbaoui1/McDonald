const router = require("express").Router();
const ingredient = require("../models/ingredient");
let Ingredient = require("../models/ingredient");

//getting all ingredients

router.route("/").get((req, res) => {
  Ingredient.find()
    .then((ingredients) => res.json(ingredients))
    .catch((err) => res.status(400).json("Error :" + err));
});

//adding new ingredients

router.route("/add").post((req, res) => {
  const ingredientName = req.body.ingredientName;

  const newIngredient = new Ingredient({
    ingredientName,
  });

  newIngredient
    .save()
    .then(() => res.json("ingredient successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
});

// getting one ingredient

router.route("/:id").get((req, res) => {
  ingredient
    .findById(req.params.id)
    .then((ingredient) => res.json(ingredient))
    .catch((err) => res.status(400).json("Error :" + err));
});

//deleting one ingredient

router.route("/delete/:id").delete((req, res) => {
  Ingredient.findByIdAndDelete(req.params.id)
    .then(() => res.json("ingredient successfully delted"))
    .catch((err) => res.status(400).json("Error :" + err));
});

//updating one ingredient

router.route("/update/:id").put((req, res) => {
  Ingredient.findById(req.params.id)
    .then((ing) => {
      ing.ingredientName = req.body.ingredientName;

      ing
        .save()
        .then(() => res.json("ingredient successfully updated"))
        .catch((err) => res.status(400).json("Error :" + err));
    })
    .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;
