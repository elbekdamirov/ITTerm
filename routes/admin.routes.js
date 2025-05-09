const {
  create,
  getAll,
  getOne,
  remove,
  update,
  login,
} = require("../controllers/admin.controller.js");

const router = require("express").Router();

router.post("/", create);
router.get("/", getAll);
router.post("/login", login);
router.get("/:id", getOne);
router.delete("/:id", remove);
router.patch("/:id", update);

module.exports = router;
