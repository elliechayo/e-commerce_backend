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


router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
