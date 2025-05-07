const dictRouter = require("./dict.routes");
const categoryRouter = require("./category.routes");
const descRouter = require("./desc.routes");
const synonymsRouter = require("./synonyms.routes");
const router = require("express").Router();

router.use("/dict", dictRouter);
router.use("/category", categoryRouter);
router.use("/description", descRouter);
router.use("/synonyms", synonymsRouter);


module.exports = router;
