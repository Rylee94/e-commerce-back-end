const express = require("express");
const router = express.Router();
const { Tag, Product, ProductTag } = require("../../models");

// GET route to find all tags
router.get("/", async (req, res) => {
  try {
    console.log("Get route");
    const allTags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    console.log("data", allTags);
    res.status(200).json(allTags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route to find a single tag by its `id`
router.get("/:id", async (req, res) => {
  try {
    const tagById = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });

    if (!tagById) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }

    res.status(200).json(tagById);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST route to create a new tag
router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Bad request" });
  }
});

// PUT route to update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updatedTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE route to delete a tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedTag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }

    res.status(200).json(deletedTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
