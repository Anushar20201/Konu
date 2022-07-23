const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // finding all categories
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((data) => res.json(data))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

router.get("/:id", (req, res) => {
  // finding one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "Sorry, no category found" });
        return;
      }
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

router.post("/", (req, res) => {
  // creating a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then((data) => res.json(data))
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.put("/:id", (req, res) => {
  // updating a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data[0]) {
        res.status(404).json({ message: "Sorry, no category found" });
        return;
      }
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res) => {
  // deleting a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "Sorry, no category found" });
        return;
      }
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

module.exports = router;
