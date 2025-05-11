const {
  create,
  getAll,
  getOne,
  remove,
  update,
  login,
} = require("../controllers/admin.controller.js");
const adminJwtGuard = require("../middlewares/guards/admin-jwt.guard.js");

const router = require("express").Router();

router.post("/", create);
router.get("/", adminJwtGuard, getAll);
router.post("/login", login);
router.get("/:id", adminJwtGuard, getOne);
router.delete("/:id", remove);
router.patch("/:id", update);

module.exports = router;
