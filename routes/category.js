const router = require("express").Router();
const category = require("../models/category");
let Category = require("../models/category");

//getting all categories 
router.route("/").get((req, res) => {
    Category.find()
        .then((categories) => res.json(categories))
        .catch((err) => res.status(400).json("Error :" + err));
});

//adding new category
router.route("/add").post((req, res) => {
    const categoryname = req.body.categoryname;
    const newCategory = new Category({
        categoryname
    });

    newCategory
        .save()
        .then(() => res.json("category successfully added"))
        .catch((err) => res.status(400).json("Error :" + err));
});

// getting one category
router.route("/:id").get((req, res) => {
    category.findById(req.params.id)
        .then((category) => res.json(category))
        .catch((err) => res.status(400).json("Error :" + err));
});

//deletting one category
router.route("/delete/:id").delete((req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then(() => res.json("category successfully delted"))
        .catch((err) => res.status(400).json("Error :" + err));
});

//updatting one category
router.route("/update/:id").put((req, res) => {
    Category.findById(req.params.id)
        .then((cat) => {
            cat.categoryname = req.body.categoryname;

            cat
                .save()
                .then(() => res.json("cat successfully updated"))
                .catch((err) => res.status(400).json("Error :" + err));
        })
        .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;