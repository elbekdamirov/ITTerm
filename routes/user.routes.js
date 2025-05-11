const {
  create,
  getAll,
  getOne,
  remove,
  update,
  login,
} = require("../controllers/user.controller.js");
const userJwtGuard = require("../middlewares/guards/user-jwt.guard.js");

const router = require("express").Router();

router.post("/", create);
router.get("/", userJwtGuard, getAll);
router.post("/login", login);
router.get("/:id", userJwtGuard, getOne);
router.delete("/:id", remove);
router.patch("/:id", update);

module.exports = router;
