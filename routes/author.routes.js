const {
  create,
  getAll,
  getOne,
  remove,
  update,
} = require("../controllers/author.controller.js");

const router = require("express").Router();

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);
router.delete("/:id", remove);
router.patch("/:id", update);

module.exports = router;
