const {
  create,
  getAll,
  getOne,
  remove,
  update,
} = require("../controllers/topic.controller.js");
const authorJwtGuard = require("../middlewares/guards/author-jwt.guard.js");

const router = require("express").Router();

router.post("/", create);
router.get("/", authorJwtGuard, getAll);
router.get("/:id", getOne);
router.delete("/:id", remove);
router.patch("/:id", update);

module.exports = router;
