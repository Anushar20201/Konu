const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // finding all tags
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
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
        res.status(404).json({ message: "Sorry, no tag found" });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // creating a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((data) => res.json(data))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

router.put("/:id", (req, res) => {
  // updating a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data[0]) {
        res.status(404).json({ message: "Sorry, no tag found" });
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
  // deleting on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "Sorry, no tag found" });
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
