const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // finding all categories
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // finding one category by its `id` value
});

router.post('/', (req, res) => {
  // creating a new category
});

router.put('/:id', (req, res) => {
  // updating a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // deleting a category by its `id` value
});

module.exports = router;
