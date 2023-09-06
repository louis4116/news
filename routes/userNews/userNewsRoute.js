const router = require("express").Router();
const newsController = require("../../controller/newsController");
const authController = require("../../controller/authController");

const { resolveToken } = authController;
const { storeNewsToUser, deleteNewsFromUser, createMemo, getUserNews } =
  newsController;

router.get(resolveToken);

router.get("/:id", getUserNews);
router.post("/:id", storeNewsToUser);
router.delete("/:id", deleteNewsFromUser);
router.patch("/:id", createMemo);
module.exports = router;
