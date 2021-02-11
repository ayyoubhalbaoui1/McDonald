const router = require("express").Router();
const Category = require("../models/category");


//get cat
router.route("/").get((req, res) => {
    Category.find()
        .then((categories) => res.json(categories))
        .catch((err) => res.status(400).json("Error :" + err));
});

//add cat
router.route("/add").post((req, res, next) => {
    const categoryName = req.body.categoryName;
    const newCategory = new Category({
        categoryName,
    });

    newCategory
        .save()
        .then((data) => {
            console.log(data);
            res.json("category successfully added");
        })
        .catch((err) => res.status(400).json("Error :" + err));
});

// get cat 
router.route("/:id").get((req, res) => {
    Category.findById(req.params.id)
        .then((category) => res.json(category))
        .catch((err) => res.status(400).json("Error :" + err));
});

//delete cat
router.route("/delete/:id").delete((req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then(() => res.json("category successfully delted"))
        .catch((err) => res.status(400).json("Error :" + err));
});

//uupdate cat
router.route("/update/:id").put((req, res) => {
    Category.findById(req.params.id)
        .then((cat) => {
            cat.categoryName = req.body.categoryName;

            cat
                .save()
                .then(() => res.json("cat successfully updated"))
                .catch((err) => res.status(400).json("Error :" + err));
        })
        .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;