const { createViewPage } = require("../helpers/create_view_page");
const topicsModel = require("../schemas/Topic");
const dictModel = require("../schemas/Dict");
const authorModel = require("../schemas/Author");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render(createViewPage("index"), {
    title: "Asosiy sahifa",
    isHome: true,
  });
});

router.get("/dictionary", async (req, res) => {
  let dicts = await dictModel.find().lean();

  res.render(createViewPage("dictionary"), {
    title: "Lug'atlar",
    isDict: true,
    dicts,
  });
});

router.get("/authors", async (req, res) => {
  let authors = await authorModel.find().lean();

  res.render(createViewPage("authors"), {
    title: "Mualliflar",
    isAuthor: true,
    authors,
  });
});

router.get("/topics", async (req, res) => {
  let topics = await topicsModel.find().lean();

  res.render(createViewPage("topics"), {
    title: "Maqolalar",
    isTopic: true,
    topics,
  });
});

router.get("/login", (req, res) => {
  res.render(createViewPage("login"), {
    title: "Login",
    isLogin: true,
  });
});

module.exports = router;
