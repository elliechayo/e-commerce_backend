const router = require('express').Router();
const { Category, Product } = require('../../models');

// get all categories and their products and return the result
router.get("/", (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        as: "products",
      },
    ],
  })
    .then((result) => {
      if (!result) {
        res
          .status(404)
          .json({ success: false, message: "Categories Not Found" });
      } else {
        res.json(result);
      }
    })
    .catch((error) => res.status(500).json(error));
});

// get a single category and its products based on the id
router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        as: "products",
      },
    ],
  })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: "No category found with the provided ID",
        });
      } else {
        res.json(result);
      }
    })
    .catch((error) => res.status(500).json(error));
});


// create a new category
router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json(error));
});


// edit a category name
router.put("/:id", (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: "No Category found with the provided ID",
        });
      } else {
        res.json(result);
      }
    })
    .catch((error) => res.status(500).json(error));
});


// delete a category
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: "No Category found with the provided ID",
        });
      } else {
        res.json({ success: true, message: "Sucessfully Deleted" });
      }
    })
    .catch((error) => res.status(500).json(error));
});


module.exports = router;
