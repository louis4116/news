const router = require("express").Router();
const authController = require("../../controller/authController");
const userContoller = require("../../controller/userContoller");

const {
  signUp,
  login,
  logout,
  forgetPassword,
  resetPassword,
  resolveToken,
  upadatedProfileImg,
  loginUserResetPassword,
} = authController;
const { getMe } = userContoller;

router.post("/register", signUp);
router.post("/login", login);

router.post("/forgetPassword", forgetPassword);
router.patch("/resetPassword/:id", resetPassword);

router.use(resolveToken);
router.patch("/loginUserReset/:id", loginUserResetPassword);
router.patch("/uploadImg/:id", upadatedProfileImg);
router.get("/logout", logout);
router.get("/me", getMe);

module.exports = router;
